// Gemini Force · Guia — interface do SRD.
// Independente do Foundry: recebe os dados prontos e um conjunto de callbacks,
// o que permite testar a tela fora da mesa.

const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[ch]);
const fold = value => String(value ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase("pt-BR");
const icon = (name, extra = "") => `<i class="fa-solid ${name} ${extra}" aria-hidden="true"></i>`;
const pad = number => /^\d+$/.test(number) ? number.padStart(2, "0") : number;

const KIND_LABEL = { secao: "Seção", sub: "Tópico", linha: "Tabela", item: "Regra" };
const KIND_ORDER = { secao: 0, item: 1, sub: 2, linha: 3 };

export class GuiaView {
  /**
   * @param {HTMLElement} root
   * @param {object} options
   * @param {object} options.data          conteúdo de srd-player.json ou srd-gm.json
   * @param {boolean} [options.isGM]
   * @param {string} [options.storageKey]  chave do localStorage para lembrar a última leitura
   * @param {(text:string)=>Promise<void>} [options.copy]  copia um texto (link @SRD)
   * @param {(message:string)=>void} [options.notify]
   */
  constructor(root, { data, isGM = false, storageKey = "gemini-guia:last", copy, notify } = {}) {
    this.root = root;
    this.data = data;
    this.isGM = isGM;
    this.storageKey = storageKey;
    this.copy = copy || (text => navigator.clipboard.writeText(text));
    this.notify = notify || (() => {});
    this.chapters = new Map(data.chapters.map(chapter => [chapter.id, chapter]));
    this.sections = new Map(data.chapters.flatMap(chapter => chapter.sections.map(section => [section.anchor, { chapter, section }])));
    this.index = data.index.map(entry => ({ ...entry, foldTitle: fold(entry.title), foldText: fold(entry.text) }));
    this.view = null;
    this.results = [];
    this.searchPosition = 0;

    this.keyHandler = event => {
      if (!this.root.isConnected || !this.isActive()) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        event.stopPropagation();
        this.focusSearch();
      }
    };
    this.clickHandler = event => this.onClick(event);
    this.inputHandler = event => {
      if (event.target.matches(".gf-s-search-input")) this.renderSearch(event.target.value);
    };
    this.keydownHandler = event => this.onKeydown(event);
    document.addEventListener("keydown", this.keyHandler, true);
    this.mount();
  }

  destroy() {
    document.removeEventListener("keydown", this.keyHandler, true);
    this.root.removeEventListener("click", this.clickHandler);
    this.root.removeEventListener("input", this.inputHandler);
    this.root.removeEventListener("keydown", this.keydownHandler);
  }

  /** True when this window has focus or the pointer is over it. */
  isActive() {
    const host = this.root.closest(".application") || this.root;
    return host.matches(":focus-within") || host.matches(":hover");
  }

  // ------------------------------------------------------------ layout

  mount() {
    // O host é o container das @container queries; o layout fica num elemento interno,
    // porque um elemento não consegue consultar o próprio tamanho.
    const shell = document.createElement("div");
    shell.className = "gf-shield gf-guia";
    this.root.replaceChildren(shell);
    const audience = this.isGM ? "VISÃO DO MESTRE" : "VISÃO DO JOGADOR";
    shell.innerHTML = `<aside class="gf-s-side">
        <div class="gf-s-brand"><div class="gf-s-mark">${icon("fa-book-atlas")}</div><div><strong>GEMINI <span>FORCE</span></strong><small>GUIA DE REGRAS / SRD</small></div></div>
        <div class="gf-s-side-label">CAPÍTULOS</div>
        <nav class="gf-s-nav" aria-label="Capítulos do SRD">
          <button type="button" class="gf-s-nav-item" data-go="home" title="Visão geral">${icon("fa-layer-group")}<span>Visão geral</span></button>
          ${this.data.chapters.map(chapter => `<button type="button" class="gf-s-nav-item${chapter.gm ? " is-gm" : ""}" data-go="${esc(chapter.id)}" title="${esc(chapter.title)}">${icon(chapter.icon)}<span>${esc(chapter.title)}</span><small>${esc(pad(chapter.number))}</small></button>`).join("")}
        </nav>
        <div class="gf-s-side-foot"><div class="gf-s-online-dot"></div><div>SRD ${esc(this.data.srdVersion)}<small>${audience}</small></div></div>
      </aside>
      <section class="gf-s-workspace">
        <header class="gf-s-topbar">
          <div class="gf-s-breadcrumb">GUIA <span>/</span> <strong class="gf-g-crumb">VISÃO GERAL</strong></div>
          <div class="gf-s-top-actions">
            <label class="gf-s-search">${icon("fa-magnifying-glass")}<input class="gf-s-search-input" type="search" aria-label="Buscar no SRD" placeholder="Buscar regra, efeito, origem..." autocomplete="off"><kbd>Ctrl K</kbd></label>
            <div class="gf-s-search-results" hidden></div>
          </div>
        </header>
        <div class="gf-s-scroll"><main class="gf-s-main"><div class="gf-g-page"></div>
          <footer class="gf-s-footer">GEMINI FORCE UNIVERSE <span>✦</span> SRD ${esc(this.data.srdVersion)} <span>✦</span> GERADO EM ${esc(new Date(this.data.generatedAt).toLocaleDateString("pt-BR"))}</footer>
        </main></div>
      </section>`;
    this.root.addEventListener("click", this.clickHandler);
    this.root.addEventListener("input", this.inputHandler);
    this.root.addEventListener("keydown", this.keydownHandler);
  }

  /**
   * Opens the guide at a chapter, a section or an inner target.
   * Accepts "home", "combate", "combate.efeitos-especiais" or a row/item id.
   */
  go(target = "home", { remember = true } = {}) {
    const [anchor] = String(target || "home").split("~");
    let chapterId = "home";
    if (this.chapters.has(anchor)) chapterId = anchor;
    else if (this.sections.has(anchor)) chapterId = this.sections.get(anchor).chapter.id;
    else if (anchor !== "home") {
      // Link quebrado: avisa e mantém a página atual.
      this.notify(`Regra "${target}" não encontrada no SRD.`);
      if (this.view) return;
    }
    if (chapterId !== this.view) {
      this.view = chapterId;
      this.renderPage();
    }
    if (remember) this.remember(target);
    const scrollTarget = chapterId === "home" || target === chapterId ? null : target;
    requestAnimationFrame(() => this.scrollTo(scrollTarget));
  }

  remember(target) {
    try { localStorage.setItem(this.storageKey, target); } catch { /* sem armazenamento */ }
  }

  lastVisited() {
    try { return localStorage.getItem(this.storageKey); } catch { return null; }
  }

  scrollTo(target) {
    const scroller = this.root.querySelector(".gf-s-scroll");
    if (!target) { scroller.scrollTop = 0; return; }
    const element = this.root.querySelector(`[id="${CSS.escape(target)}"]`);
    if (!element) { scroller.scrollTop = 0; return; }
    const top = element.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 18;
    scroller.scrollTo({ top, behavior: "smooth" });
    element.classList.remove("gf-g-flash");
    void element.offsetWidth;
    element.classList.add("gf-g-flash");
  }

  renderPage() {
    for (const item of this.root.querySelectorAll(".gf-s-nav-item")) {
      item.classList.toggle("is-active", item.dataset.go === this.view);
    }
    const page = this.root.querySelector(".gf-g-page");
    const crumb = this.root.querySelector(".gf-g-crumb");
    if (this.view === "home") {
      crumb.textContent = "VISÃO GERAL";
      page.innerHTML = this.renderHome();
    } else {
      const chapter = this.chapters.get(this.view);
      crumb.innerHTML = `CAP. ${esc(pad(chapter.number))} <span>/</span> ${esc(chapter.title.toUpperCase())}`;
      page.innerHTML = this.renderChapter(chapter);
    }
  }

  renderHome() {
    const last = this.lastVisited();
    const lastInfo = last && last !== "home" ? this.describe(last) : null;
    const sections = this.data.chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
    return `<div class="gf-s-page-intro"><div><span class="gf-s-eyebrow">SRD ${esc(this.data.srdVersion)} <span class="gf-s-spark">✦</span> REFERÊNCIA OFICIAL</span><h1>Guia do Gemini Force</h1><p>${this.data.chapters.length} capítulos e ${sections} seções, com busca em todas as tabelas.</p></div><div class="gf-s-intro-label">GF <span>/</span> SRD</div></div>
      <section class="gf-s-hero gf-s-glass"><div class="gf-s-hero-copy"><span class="gf-s-eyebrow">GEMINI FORCE UNIVERSE</span><h2>Todas as regras,<br><em>em um só lugar.</em></h2><div class="gf-g-intro">${this.data.intro}</div>
        <div class="gf-s-hero-actions"><button type="button" class="gf-s-button primary" data-go="${esc(lastInfo ? last : this.data.chapters[0].id)}">${lastInfo ? `Continuar: ${esc(lastInfo)}` : "Começar pelos Fundamentos"} ${icon("fa-arrow-right")}</button><button type="button" class="gf-s-button subtle" data-focus-search>${icon("fa-magnifying-glass")} Buscar regra</button></div></div>
        <div class="gf-s-hero-art" aria-hidden="true"><div class="gf-s-orbit"></div><div class="gf-s-orbit two"></div><div class="gf-s-orbit three"></div><div class="gf-s-hero-glyph">${icon("fa-book-atlas")}</div><span class="gf-s-orbit-node a"></span><span class="gf-s-orbit-node b"></span></div></section>
      <div class="gf-s-section-heading"><div><span class="gf-s-eyebrow">NAVEGUE POR CAPÍTULO</span><h2>Capítulos</h2></div></div>
      <div class="gf-g-chapter-grid">${this.data.chapters.map(chapter => `<button type="button" class="gf-s-shortcut gf-s-glass gf-g-chapter-card${chapter.gm ? " is-gm" : ""}" data-go="${esc(chapter.id)}">
        <span class="gf-g-card-top">${icon(chapter.icon)}<span class="gf-g-card-number">${esc(pad(chapter.number))}</span></span>
        <strong>${esc(chapter.title)}</strong><small>${esc(chapter.description)}</small>
        <span class="gf-g-card-meta">${chapter.sections.length} seções${chapter.gm ? " · só Mestres" : ""}</span>${icon("fa-arrow-right")}</button>`).join("")}</div>`;
  }

  renderChapter(chapter) {
    const position = this.data.chapters.indexOf(chapter);
    const previous = this.data.chapters[position - 1];
    const next = this.data.chapters[position + 1];
    return `<div class="gf-s-page-intro"><div><span class="gf-s-eyebrow">${esc(chapter.kicker)} <span class="gf-s-spark">✦</span> CAPÍTULO ${esc(pad(chapter.number))}</span><h1>${esc(chapter.title)}</h1><p>${esc(chapter.description)}</p></div><div class="gf-s-intro-label">GF <span>/</span> ${esc(pad(chapter.number))}</div></div>
      <nav class="gf-g-toc gf-s-glass" aria-label="Seções do capítulo">${chapter.sections.map(section => `<button type="button" data-go="${esc(section.anchor)}"><span>${esc(section.number || "•")}</span>${esc(section.title)}</button>`).join("")}</nav>
      ${chapter.lede ? `<div class="gf-g-lede gf-g-prose">${chapter.lede}</div>` : ""}
      ${chapter.sections.map(section => `<section class="gf-s-panel gf-g-section" id="${esc(section.anchor)}">
        <div class="gf-s-panel-head"><h3>${section.number ? `<span class="gf-g-num">${esc(section.number)}</span>` : ""}${esc(section.title)}</h3>
        <button type="button" class="gf-g-copy" data-copy="${esc(section.anchor)}" title="Copiar link @SRD para usar em fichas, itens e Journals">${icon("fa-link")}<span>@SRD</span></button></div>
        <div class="gf-g-prose">${section.html}</div></section>`).join("")}
      <div class="gf-g-pager">${previous ? `<button type="button" class="gf-s-button subtle" data-go="${esc(previous.id)}">${icon("fa-arrow-left")} ${esc(pad(previous.number))} · ${esc(previous.title)}</button>` : "<span></span>"}
      ${next ? `<button type="button" class="gf-s-button subtle" data-go="${esc(next.id)}">${esc(pad(next.number))} · ${esc(next.title)} ${icon("fa-arrow-right")}</button>` : ""}</div>`;
  }

  /** Short human label for a target, e.g. "8.5 Efeitos Especiais". */
  describe(target) {
    const [anchor] = String(target).split("~");
    if (this.chapters.has(anchor)) return this.chapters.get(anchor).title;
    const found = this.sections.get(anchor);
    if (!found) return null;
    return `${found.section.number ? `${found.section.number} ` : ""}${found.section.title}`;
  }

  // ------------------------------------------------------------ search

  focusSearch(term) {
    const input = this.root.querySelector(".gf-s-search-input");
    input.focus();
    if (typeof term === "string") {
      input.value = term;
      this.renderSearch(term);
    } else input.select();
  }

  search(term) {
    const words = fold(term).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    const phrase = words.join(" ");
    const scored = [];
    for (const entry of this.index) {
      if (!words.every(word => entry.foldText.includes(word) || entry.foldTitle.includes(word))) continue;
      let score = KIND_ORDER[entry.kind] ?? 4;
      if (entry.foldTitle === phrase) score -= 30;
      else if (entry.foldTitle.startsWith(phrase)) score -= 20;
      else if (entry.foldTitle.includes(phrase)) score -= 12;
      else if (words.every(word => entry.foldTitle.includes(word))) score -= 8;
      // Seções onde o termo aparece muitas vezes sobem na lista.
      if (entry.kind === "secao") {
        const hits = words.reduce((total, word) => total + entry.foldText.split(word).length - 1, 0);
        score -= Math.min(hits, 16) / 2;
      }
      scored.push({ entry, score });
    }
    scored.sort((a, b) => a.score - b.score || a.entry.title.length - b.entry.title.length);
    return scored.slice(0, 40).map(item => item.entry);
  }

  snippet(entry, term) {
    const source = entry.detail || entry.text || "";
    const words = fold(term).split(/\s+/).filter(Boolean);
    const folded = fold(source);
    let at = -1;
    for (const word of words) { at = folded.indexOf(word); if (at >= 0) break; }
    const start = Math.max(0, at - 50);
    const text = (start > 0 ? "…" : "") + source.slice(start, start + 150) + (source.length > start + 150 ? "…" : "");
    return esc(text);
  }

  renderSearch(term) {
    const box = this.root.querySelector(".gf-s-search-results");
    if (!term.trim()) { box.hidden = true; this.results = []; return; }
    this.results = this.search(term);
    this.searchPosition = 0;
    box.hidden = false;
    box.innerHTML = `<div class="gf-s-search-head">${this.results.length ? `${this.results.length}${this.results.length === 40 ? "+" : ""} RESULTADO(S)` : "NENHUM RESULTADO"} <kbd>ENTER</kbd></div>
      ${this.results.map((entry, index) => {
        const chapter = this.chapters.get(entry.chapter);
        const where = entry.kind === "secao" ? `Cap. ${pad(chapter.number)} · ${chapter.title}` : `${this.describe(entry.anchor)} · ${KIND_LABEL[entry.kind]}`;
        return `<button type="button" class="gf-s-search-hit ${index === 0 ? "is-focused" : ""}" data-hit="${index}"><span>${esc(where)}</span><strong>${esc(entry.title)}</strong><small>${this.snippet(entry, term)}</small></button>`;
      }).join("")}
      ${this.results.length ? "" : '<div class="gf-s-search-none">Tente o nome de uma regra, Origem, Efeito ou perícia.</div>'}`;
  }

  hideSearch() {
    const box = this.root.querySelector(".gf-s-search-results");
    if (box) box.hidden = true;
  }

  openResult(index) {
    const entry = this.results[index];
    if (!entry) return;
    this.hideSearch();
    this.go(entry.target);
  }

  // ------------------------------------------------------------ events

  onKeydown(event) {
    if (!event.target.matches(".gf-s-search-input")) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!this.results.length) return;
      this.searchPosition = Math.max(0, Math.min(this.results.length - 1, this.searchPosition + (event.key === "ArrowDown" ? 1 : -1)));
      const hits = this.root.querySelectorAll(".gf-s-search-hit");
      hits.forEach((hit, index) => hit.classList.toggle("is-focused", index === this.searchPosition));
      hits[this.searchPosition]?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      this.openResult(this.searchPosition);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      event.target.value = "";
      this.hideSearch();
    }
  }

  async onClick(event) {
    const hit = event.target.closest("[data-hit]");
    if (hit) { this.openResult(Number(hit.dataset.hit)); return; }
    if (!event.target.closest(".gf-s-search, .gf-s-search-results")) this.hideSearch();

    const go = event.target.closest("[data-go]");
    if (go) { this.go(go.dataset.go); return; }

    const xref = event.target.closest(".gf-g-xref[data-srd]");
    if (xref) { event.preventDefault(); this.go(xref.dataset.srd); return; }

    if (event.target.closest("[data-focus-search]")) { this.focusSearch(); return; }

    const copy = event.target.closest("[data-copy]");
    if (copy) {
      const label = this.describe(copy.dataset.copy);
      const link = `@SRD[${copy.dataset.copy}]{${label}}`;
      try {
        await this.copy(link);
        this.notify(`Copiado: ${link}`);
      } catch {
        this.notify(`Não foi possível copiar. Use: ${link}`);
      }
    }
  }
}
