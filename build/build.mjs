// Gemini Force · Guia — build do SRD.
//
// Lê srd/*.md (fonte única do SRD) e gera:
//   data/srd-player.json  conteúdo visível para jogadores
//   data/srd-gm.json      conteúdo completo, com blocos e capítulos de Mestre
//   data/effects.json     Efeitos Especiais do cap. 8.5, para o Escudo do Mestre
//
// Sem dependências: `node build/build.mjs` a partir da pasta do módulo.
// O Markdown aceito é o subconjunto usado no SRD (veja README.md).

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRD_DIR = join(ROOT, "srd");
const OUT_DIR = join(ROOT, "data");
const manifest = JSON.parse(readFileSync(join(ROOT, "module.json"), "utf8"));

const warnings = [];
const warn = message => warnings.push(message);

// ---------------------------------------------------------------- helpers

const escapeHtml = text => String(text).replace(/[&<>"']/g, ch => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[ch]);

const plain = text => String(text)
  .replace(/\*\*([^*]+)\*\*/g, "$1")
  .replace(/\*([^*]+)\*/g, "$1")
  .replace(/`([^`]+)`/g, "$1")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/\s+/g, " ")
  .trim();

/** Inline Markdown: escapes HTML first, so the source can never inject markup. */
function inline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Links internos: [texto](#capitulo.secao) abre o guia na seção.
  html = html.replace(/\[([^\]]+)\]\(#([a-z0-9.-]+)\)/g, '<a class="gf-g-xref" data-srd="$2">$1</a>');
  html = html.replace(/⚠/g, '<span class="gf-g-flag" title="Pendente">⚠</span>');
  return html;
}

function parseFrontMatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file}: falta o cabeçalho --- ... ---`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^(\w+):\s*(.*)$/);
    if (pair) meta[pair[1]] = pair[2].replace(/^"(.*)"$/, "$1");
  }
  for (const key of ["id", "number", "title", "icon", "kicker", "description", "visibility"]) {
    if (!meta[key]) throw new Error(`${file}: falta "${key}" no cabeçalho`);
  }
  return { meta, body: source.slice(match[0].length) };
}

// ---------------------------------------------------------------- block parser

/**
 * Converts one section of Markdown into HTML and collects searchable entries.
 * `ctx` carries the anchor prefix and the entry list for this section.
 */
function renderBlocks(markdown, ctx) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) { flushParagraph(); i++; continue; }

    // Bloco de Mestre: <!-- gm --> ... <!-- /gm -->
    if (/^<!--\s*gm\s*-->$/.test(line.trim())) {
      flushParagraph();
      const start = ++i;
      while (i < lines.length && !/^<!--\s*\/gm\s*-->$/.test(lines[i].trim())) i++;
      if (i >= lines.length) warn(`${ctx.anchor}: bloco gm sem <!-- /gm -->`);
      const inner = renderBlocks(lines.slice(start, i).join("\n"), { ...ctx, gm: true });
      out.push(`<div class="gf-g-gm" data-gm><span class="gf-g-gm-tag"><i class="fa-solid fa-user-shield"></i> Só Mestres</span>${inner}</div>`);
      i++;
      continue;
    }

    // Other HTML comments are ignored (notes for editors).
    if (/^<!--.*-->$/.test(line.trim())) { flushParagraph(); i++; continue; }

    // Subheading ### (dentro de uma seção)
    const sub = line.match(/^###\s+(.+?)\s*$/);
    if (sub) {
      flushParagraph();
      const id = `${ctx.anchor}~h${ctx.counter.h++}`;
      out.push(`<h4 id="${escapeHtml(id)}">${inline(sub[1])}</h4>`);
      ctx.entries.push({ kind: "sub", title: plain(sub[1]), text: plain(sub[1]), target: id, gm: ctx.gm });
      i++;
      continue;
    }

    // Callout: > [!regra] / > [!aviso] / > texto
    if (line.startsWith(">")) {
      flushParagraph();
      const quote = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      let kind = "regra";
      const tag = quote[0].match(/^\[!(regra|aviso|nota)\]\s*/i);
      if (tag) { kind = tag[1].toLowerCase(); quote[0] = quote[0].slice(tag[0].length); }
      const cls = kind === "aviso" ? "gf-s-danger" : "gf-s-callout";
      const ico = kind === "aviso" ? "fa-triangle-exclamation" : kind === "nota" ? "fa-note-sticky" : "fa-scroll";
      out.push(`<div class="${cls} gf-g-callout"><span><i class="fa-solid ${ico}"></i></span><div>${renderBlocks(quote.join("\n"), ctx)}</div></div>`);
      continue;
    }

    // Code fence
    if (line.startsWith("```")) {
      flushParagraph();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(`<pre class="gf-g-code">${escapeHtml(code.join("\n"))}</pre>`);
      continue;
    }

    // Table
    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      flushParagraph();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++]);
      out.push(renderTable(rows, ctx));
      continue;
    }

    // List
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        items.push(lines[i++]);
      }
      out.push(renderList(items, ctx));
      continue;
    }

    // Horizontal rule
    if (/^-{3,}$/.test(line.trim())) { flushParagraph(); out.push("<hr>"); i++; continue; }

    paragraph.push(line.trim());
    i++;
  }
  flushParagraph();
  return out.join("\n");
}

function splitRow(row) {
  return row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(cell => cell.trim());
}

function renderTable(rows, ctx) {
  const head = splitRow(rows[0]);
  const body = rows.slice(2).map(splitRow);
  const tableIndex = ctx.counter.t++;
  ctx.tables.push({ head: head.map(plain), rows: body.map(r => r.map(plain)) });
  const html = [`<div class="gf-s-table-wrap"><table class="gf-s-table gf-g-table">`,
    `<thead><tr>${head.map(cell => `<th scope="col">${inline(cell)}</th>`).join("")}</tr></thead><tbody>`];
  body.forEach((cells, index) => {
    const id = `${ctx.anchor}~t${tableIndex}r${index}`;
    html.push(`<tr id="${escapeHtml(id)}">${cells.map((cell, col) =>
      `<td${col === 0 ? ' class="gf-s-first"' : ""}>${inline(cell)}</td>`).join("")}</tr>`);
    const title = plain(cells[0]);
    // Rows whose first cell is a name (not a long sentence) become search entries.
    if (title && title.length <= 70) {
      const detail = cells.slice(1).map(plain).filter(Boolean).join(" · ");
      ctx.entries.push({ kind: "linha", title, text: `${title} ${detail}`, detail, target: id, gm: ctx.gm });
    }
  });
  html.push("</tbody></table></div>");
  return html.join("");
}

function renderList(lines, ctx) {
  // Build a tree from indentation (2+ spaces = one nesting level).
  const root = { children: [], ordered: false };
  const stack = [{ indent: -1, node: root }];
  let last = null;
  for (const raw of lines) {
    const match = raw.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (!match) { if (last) last.text += ` ${raw.trim()}`; continue; }
    const indent = match[1].replace(/\t/g, "    ").length;
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    if (!parent.children.length) parent.ordered = /\d/.test(match[2]);
    const item = { text: match[3], children: [], ordered: false };
    parent.children.push(item);
    stack.push({ indent, node: item });
    last = item;
  }
  const render = node => {
    if (!node.children.length) return "";
    const tag = node.ordered ? "ol" : "ul";
    const hasTasks = node.children.some(child => /^\[[ xX]\]\s/.test(child.text));
    return `<${tag} class="gf-g-list${hasTasks ? " gf-g-tasks" : ""}">${node.children.map(child => {
      let text = child.text;
      let box = "";
      const task = text.match(/^\[([ xX])\]\s+(.*)$/);
      if (task) {
        box = `<i class="fa-${task[1].trim() ? "solid fa-square-check" : "regular fa-square"} gf-g-task"></i> `;
        text = task[2];
      }
      const id = `${ctx.anchor}~i${ctx.counter.i++}`;
      // "**Nome:** descrição" → entrada de busca própria (Aprimoramentos, Tags, Efeitos...)
      const lead = text.match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/) || text.match(/^\*([^*]+?):?\*:?\s*(.*)$/);
      if (lead) {
        const title = plain(lead[1]).replace(/:$/, "");
        ctx.entries.push({ kind: "item", title, text: `${title} ${plain(lead[2])}`, detail: plain(lead[2]), target: id, gm: ctx.gm });
      }
      return `<li id="${escapeHtml(id)}">${box}${inline(text)}${render(child)}</li>`;
    }).join("")}</${tag}>`;
  };
  return render(root);
}

// ---------------------------------------------------------------- chapters

function buildChapter(file) {
  const source = readFileSync(join(SRD_DIR, file), "utf8").replace(/\r\n/g, "\n");
  const { meta, body } = parseFrontMatter(source, file);
  const chapterGm = meta.visibility === "gm";
  const parts = body.split(/^(?=## )/m);
  const ledeSource = parts[0].startsWith("## ") ? "" : parts.shift();
  const sections = [];
  const tables = {};
  const seen = new Set();

  const ledeCtx = { anchor: `${meta.id}._lede`, entries: [], tables: [], counter: { h: 0, t: 0, i: 0 }, gm: chapterGm };
  const lede = ledeSource.trim() ? renderBlocks(ledeSource.trim(), ledeCtx) : "";

  for (const part of parts) {
    const [headingLine, ...rest] = part.split("\n");
    const heading = headingLine.match(/^##\s+(.+?)\s*(?:\{#([a-z0-9-]+)\})?\s*$/);
    if (!heading) throw new Error(`${file}: título inválido: ${headingLine}`);
    const title = heading[1].trim();
    const sid = heading[2];
    if (!sid) warn(`${file}: "${title}" não tem {#id}; links @SRD para ela não serão estáveis.`);
    const id = sid || title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (seen.has(id)) throw new Error(`${file}: id repetido "${id}"`);
    seen.add(id);
    const anchor = `${meta.id}.${id}`;
    const ctx = { anchor, entries: [], tables: [], counter: { h: 0, t: 0, i: 0 }, gm: chapterGm };
    const markdown = rest.join("\n").trim();
    const html = renderBlocks(markdown, ctx);
    const number = title.match(/^(\d+(?:\.\d+)*)\s+/)?.[1] || "";
    sections.push({
      id, anchor, number,
      title: number ? title.slice(number.length).trim() : title,
      html,
      text: plain(markdown.replace(/<!--[\s\S]*?-->/g, "").replace(/[|#>-]/g, " ")),
      entries: ctx.entries
    });
    tables[anchor] = ctx.tables;
  }

  return { meta, chapterGm, lede, sections, tables };
}

// Strip GM blocks from player HTML. The build controls the markup, so a regex on the
// known wrapper is safe: <div class="gf-g-gm" data-gm> ... </div> never nests.
function stripGm(html) {
  let output = html;
  for (;;) {
    const start = output.indexOf('<div class="gf-g-gm" data-gm>');
    if (start < 0) return output;
    let depth = 0;
    let pos = start;
    const re = /<div\b|<\/div>/g;
    re.lastIndex = start;
    let match;
    while ((match = re.exec(output))) {
      depth += match[0] === "</div>" ? -1 : 1;
      if (depth === 0) { pos = re.lastIndex; break; }
    }
    output = output.slice(0, start) + output.slice(pos);
  }
}

// ---------------------------------------------------------------- effects for the Escudo

function extractEffects(chapters) {
  const combat = chapters.find(ch => ch.meta.id === "combate");
  const tables = combat?.tables["combate.efeitos-especiais"];
  if (!tables?.length) { warn("Não encontrei as tabelas de 8.5 Efeitos Especiais."); return []; }
  const effects = [];
  for (const table of tables) {
    const critical = /quando/i.test(table.head[1] || "");
    for (const [name, use, rule] of table.rows) {
      effects.push({
        name,
        offense: critical ? /atacante/i.test(use) : /of\./i.test(use),
        defense: critical ? /defensor|oponente/i.test(use) : /def\./i.test(use),
        critical,
        when: critical ? use : "",
        description: rule,
        srd: "combate.efeitos-especiais"
      });
    }
  }
  return effects;
}

// ---------------------------------------------------------------- main

const files = readdirSync(SRD_DIR).filter(name => /^\d\d-.+\.md$/.test(name) && name !== "00-intro.md").sort();
const intro = renderBlocks(readFileSync(join(SRD_DIR, "00-intro.md"), "utf8").trim(),
  { anchor: "intro", entries: [], tables: [], counter: { h: 0, t: 0, i: 0 }, gm: false });
const chapters = files.map(buildChapter);

// Internal links must point to sections that exist.
const anchors = new Set(chapters.flatMap(ch => [ch.meta.id, ...ch.sections.map(s => s.anchor)]));
for (const ch of chapters) for (const s of ch.sections) {
  for (const [, ref] of s.html.matchAll(/data-srd="([^"]+)"/g)) {
    if (!anchors.has(ref)) warn(`${s.anchor}: link para "${ref}", que não existe.`);
  }
}

function output(audience) {
  const gm = audience === "gm";
  const visible = chapters.filter(ch => gm || !ch.chapterGm);
  const index = [];
  const data = visible.map(ch => ({
    id: ch.meta.id,
    number: ch.meta.number,
    title: ch.meta.title,
    icon: ch.meta.icon,
    kicker: ch.meta.kicker,
    description: ch.meta.description,
    gm: ch.chapterGm,
    lede: gm ? ch.lede : stripGm(ch.lede),
    sections: ch.sections.map(section => {
      const html = gm ? section.html : stripGm(section.html);
      index.push({ kind: "secao", chapter: ch.meta.id, anchor: section.anchor, target: section.anchor,
        title: `${section.number ? `${section.number} ` : ""}${section.title}`, text: section.text });
      for (const entry of section.entries) {
        if (entry.gm && !gm) continue;
        index.push({ kind: entry.kind, chapter: ch.meta.id, anchor: section.anchor, target: entry.target,
          title: entry.title, text: entry.text, detail: entry.detail || "" });
      }
      return { id: section.id, anchor: section.anchor, number: section.number, title: section.title, html };
    })
  }));
  return {
    module: manifest.id,
    version: manifest.version,
    srdVersion: manifest.flags?.srdVersion || manifest.version,
    audience,
    generatedAt: new Date().toISOString(),
    intro,
    chapters: data,
    index
  };
}

mkdirSync(OUT_DIR, { recursive: true });
const player = output("player");
const gm = output("gm");
writeFileSync(join(OUT_DIR, "srd-player.json"), JSON.stringify(player));
writeFileSync(join(OUT_DIR, "srd-gm.json"), JSON.stringify(gm));
const effects = extractEffects(chapters);
writeFileSync(join(OUT_DIR, "effects.json"), JSON.stringify(effects, null, 2));

if (player.index.some(entry => /Só Mestres/.test(entry.text))) warn("Texto de Mestre vazou para o índice de jogadores.");
if (JSON.stringify(player).includes("data-gm")) warn("Bloco de Mestre vazou para srd-player.json.");

const kb = name => (readFileSync(join(OUT_DIR, name)).length / 1024).toFixed(0);
console.log(`SRD ${player.srdVersion}: ${chapters.length} capítulos, ${chapters.reduce((n, c) => n + c.sections.length, 0)} seções.`);
console.log(`  srd-player.json ${kb("srd-player.json")} KB, ${player.index.length} entradas de busca`);
console.log(`  srd-gm.json     ${kb("srd-gm.json")} KB, ${gm.index.length} entradas de busca`);
console.log(`  effects.json    ${effects.length} Efeitos Especiais`);
for (const message of warnings) console.warn(`  aviso: ${message}`);
if (warnings.some(message => /vazou/.test(message))) process.exit(1);
