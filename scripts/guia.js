// Gemini Force · Guia — integração com o Foundry VTT v14.
//
// - Janela ApplicationV2 com o SRD (scripts/guia-view.js).
// - Botão nos controles de cena e atalho Shift+G.
// - Links @SRD[capitulo.secao]{Texto} em fichas, itens, Journals e chat.
// - Comando de chat /srd <busca>.
// - API: game.modules.get("gemini-guia").api.open("combate.efeitos-especiais")

import { GuiaView } from "./guia-view.js";

const MODULE_ID = "gemini-guia";
const SRD_LINK = /@SRD\[([a-z0-9._~-]+)\](?:\{([^}]+)\})?/gi;
let app = null;
let dataPromise = null;

function reportError(error) {
  console.error(`[${MODULE_ID}]`, error);
  ui.notifications?.error(`Guia: ${error.message || error}`);
}

/** Jogadores baixam só srd-player.json; o conteúdo de Mestre fica em srd-gm.json. */
function loadData() {
  if (!dataPromise) {
    const file = game.user.isGM ? "srd-gm.json" : "srd-player.json";
    const version = game.modules.get(MODULE_ID)?.version ?? "0";
    const path = `modules/${MODULE_ID}/data/${file}?v=${encodeURIComponent(version)}`;
    const url = foundry.utils.getRoute ? foundry.utils.getRoute(path) : `/${path}`;
    dataPromise = fetch(url).then(response => {
      if (!response.ok) throw new Error(`não foi possível carregar ${file} (${response.status})`);
      return response.json();
    }).catch(error => { dataPromise = null; throw error; });
  }
  return dataPromise;
}

class GeminiGuia extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    id: MODULE_ID,
    classes: ["gemini-guia"],
    window: { title: "Guia · Gemini Force", icon: "fa-solid fa-book-atlas", resizable: true },
    position: { width: 1210, height: 790 }
  };

  constructor(options = {}) {
    super(options);
    this.pending = { target: options.target ?? null, search: options.search ?? null };
  }

  async _renderHTML() {
    this.data = await loadData();
    const root = document.createElement("div");
    root.className = "gf-shield-host";
    return root;
  }

  _replaceHTML(result, content) {
    this.view?.destroy();
    this.view = null;
    content.replaceChildren(result);
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const root = this.element.querySelector(".gf-shield-host");
    this.view = new GuiaView(root, {
      data: this.data,
      isGM: game.user.isGM,
      storageKey: `${MODULE_ID}:${game.world.id}:${game.user.id}:last`,
      copy: text => game.clipboard?.copyPlainText ? game.clipboard.copyPlainText(text) : navigator.clipboard.writeText(text),
      notify: message => ui.notifications.info(message)
    });
    this.applyPending();
  }

  applyPending() {
    if (!this.view) return;
    const { target, search } = this.pending;
    this.pending = { target: null, search: null };
    this.view.go(target || "home", { remember: Boolean(target) });
    if (search) this.view.focusSearch(search);
  }

  async _onClose(options) {
    this.view?.destroy();
    this.view = null;
    await super._onClose(options);
  }
}

/**
 * Abre o guia. `target` aceita "home", um capítulo ("combate") ou uma seção
 * ("combate.efeitos-especiais"); `search` abre com a busca preenchida.
 */
async function open(target = null, search = null) {
  if (app?.rendered) {
    app.pending = { target, search };
    if (target || search) app.applyPending();
    app.bringToFront();
    return app;
  }
  app = new GeminiGuia({ target, search });
  await app.render({ force: true });
  return app;
}

// ------------------------------------------------------------ hooks

Hooks.once("init", () => {
  // @SRD[combate.efeitos-especiais]{Efeitos Especiais}
  CONFIG.TextEditor ??= {};
  CONFIG.TextEditor.enrichers ??= [];
  CONFIG.TextEditor.enrichers.push({
    id: `${MODULE_ID}.srd`,
    pattern: SRD_LINK,
    enricher: async match => {
      const link = document.createElement("a");
      link.className = "content-link gf-srd-link";
      link.dataset.srd = match[1];
      link.dataset.tooltip = "Abrir no Guia do SRD";
      link.innerHTML = '<i class="fa-solid fa-book-atlas"></i>';
      link.append(match[2] || match[1]);
      return link;
    }
  });

  game.keybindings.register(MODULE_ID, "open", {
    name: "Abrir o Guia do SRD",
    editable: [{ key: "KeyG", modifiers: ["Shift"] }],
    onDown: () => { void open().catch(reportError); return true; }
  });
});

// Links @SRD funcionam em qualquer lugar (fichas, Journals, chat): um único ouvinte no documento.
document.addEventListener("click", event => {
  const link = event.target.closest?.("a.gf-srd-link[data-srd]");
  if (!link) return;
  event.preventDefault();
  event.stopPropagation();
  void open(link.dataset.srd).catch(reportError);
}, true);

Hooks.on("getSceneControlButtons", controls => {
  controls.geminiGuia = {
    name: "geminiGuia",
    title: "Guia do SRD",
    icon: "fa-solid fa-book-atlas",
    order: 77,
    visible: true,
    onChange: (_event, active) => { if (active) void open().catch(reportError); },
    tools: {
      openGuia: {
        name: "openGuia",
        title: "Abrir Guia do SRD",
        icon: "fa-solid fa-book-atlas",
        order: 0,
        button: true,
        visible: true,
        onChange: () => void open().catch(reportError)
      }
    }
  };
});

// /srd concentração  → abre o guia com a busca preenchida
Hooks.on("chatMessage", (_chatLog, message) => {
  const command = String(message).match(/^\/(?:srd|guia)\b\s*(.*)$/i);
  if (!command) return;
  const term = command[1].trim();
  const anchor = term.match(/^[a-z0-9-]+\.[a-z0-9-]+$/) ? term : null;
  void open(anchor, anchor ? null : term || null).catch(reportError);
  return false;
});

Hooks.once("ready", () => {
  game.modules.get(MODULE_ID).api = Object.freeze({
    open,
    /** Texto do link para colar em descrições: link("combate.efeitos-especiais", "Efeitos") */
    link: (anchor, label) => `@SRD[${anchor}]${label ? `{${label}}` : ""}`,
    data: loadData
  });
});
