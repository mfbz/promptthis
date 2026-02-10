import {
  buildPrompt,
  defaultProviders,
  getProviderUrl,
  canUseDeepLink,
  copyToClipboard,
  extractContent,
  type Provider,
} from "@promptthis/core";

// Sparkle SVG icon
const SPARKLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>`;

// Clipboard SVG icon
const CLIPBOARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;

const STYLES = `
[data-promptthis-target] { position: relative; }

[data-promptthis-trigger] {
  position: absolute; top: 8px; right: 8px;
  display: inline-flex; align-items: center; gap: 4px;
  padding: 5px 10px;
  font-family: inherit; font-size: 13px; font-weight: 500; line-height: 1;
  color: var(--promptthis-text, inherit);
  background: var(--promptthis-bg, #fff);
  border: 1px solid var(--promptthis-border, #e5e7eb);
  border-radius: var(--promptthis-radius, 999px);
  cursor: pointer; white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity .15s ease, transform .1s ease;
  box-shadow: var(--promptthis-shadow, 0 2px 8px rgba(0,0,0,0.06));
  z-index: 1;
}
[data-promptthis-trigger] svg { width: 14px; height: 14px; flex-shrink: 0; }
[data-promptthis-target]:hover > [data-promptthis-trigger],
[data-promptthis-trigger]:focus-visible {
  opacity: 0.7; pointer-events: auto;
}
[data-promptthis-trigger]:hover { opacity: 1 !important; transform: scale(1.03); }
[data-promptthis-trigger]:active { transform: scale(0.97); }
@media (max-width: 640px) {
  [data-promptthis-trigger] { opacity: 0.7; pointer-events: auto; }
}

[data-promptthis-popover] {
  position: absolute; top: calc(100% + 4px); right: 0;
  min-width: 180px; padding: 4px 0;
  background: var(--promptthis-bg, #fff);
  border: 1px solid var(--promptthis-border, rgba(128,128,128,0.15));
  border-radius: var(--promptthis-popover-radius, 12px);
  box-shadow: var(--promptthis-shadow, 0 4px 16px rgba(0,0,0,0.08));
  font-family: inherit;
  z-index: 10000;
  animation: promptthis-fade-in .12s ease;
}
@keyframes promptthis-fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

[data-promptthis-item] {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 10px 14px;
  font-family: inherit; font-size: 14px;
  color: var(--promptthis-text, #1f2937);
  background: transparent; border: none;
  cursor: pointer; text-align: left;
  transition: background .1s ease;
}
[data-promptthis-item]:hover,
[data-promptthis-item]:focus-visible {
  background: rgba(128,128,128,0.08);
}
[data-promptthis-item]:focus-visible { outline: none; background: rgba(128,128,128,0.12); }
[data-promptthis-item-icon] {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; font-size: 15px; flex-shrink: 0;
}

[data-promptthis-backdrop] {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 9999;
  animation: promptthis-fade-in .15s ease;
}

[data-promptthis-toast] {
  position: fixed; bottom: 24px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #1f2937; color: #f9fafb;
  padding: 10px 20px; border-radius: 8px;
  font-family: inherit; font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10001; opacity: 0;
  transition: opacity .2s ease, transform .2s ease;
  pointer-events: none;
}
[data-promptthis-toast].visible {
  opacity: 1; transform: translateX(-50%) translateY(0);
}

@media (max-width: 640px) {
  [data-promptthis-popover] {
    position: fixed; bottom: 0; left: 0; right: 0; top: auto;
    width: 100%; border-radius: 16px 16px 0 0;
    padding-bottom: env(safe-area-inset-bottom, 8px);
    animation: promptthis-slide-up .2s ease;
  }
  @keyframes promptthis-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
}

@media (prefers-color-scheme: dark) {
  [data-promptthis-trigger] {
    --promptthis-bg: #1f2937;
    --promptthis-text: #f9fafb;
    --promptthis-border: #374151;
  }
  [data-promptthis-popover] {
    --promptthis-bg: #1f2937;
    --promptthis-text: #f9fafb;
    --promptthis-border: rgba(255,255,255,0.1);
    --promptthis-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }
  [data-promptthis-item] { color: #f9fafb; }
  [data-promptthis-item]:hover,
  [data-promptthis-item]:focus-visible { background: rgba(255,255,255,0.08); }
  [data-promptthis-toast] { background: #f9fafb; color: #1f2937; }
}

@media (prefers-reduced-motion: reduce) {
  [data-promptthis-trigger],
  [data-promptthis-popover],
  [data-promptthis-item],
  [data-promptthis-toast] {
    transition: none !important;
    animation: none !important;
  }
}

.promptthis-sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
`;

const DARK_OVERRIDES = `
[data-promptthis-trigger] {
  --promptthis-bg: #1f2937; --promptthis-text: #f9fafb; --promptthis-border: #374151;
}
[data-promptthis-popover] {
  --promptthis-bg: #1f2937; --promptthis-text: #f9fafb;
  --promptthis-border: rgba(255,255,255,0.1);
  --promptthis-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
[data-promptthis-item] { color: #f9fafb; }
[data-promptthis-item]:hover, [data-promptthis-item]:focus-visible { background: rgba(255,255,255,0.08); }
[data-promptthis-toast] { background: #f9fafb; color: #1f2937; }
`;

const LIGHT_OVERRIDES = `
[data-promptthis-trigger] {
  --promptthis-bg: #fff; --promptthis-text: inherit; --promptthis-border: #e5e7eb;
}
[data-promptthis-popover] {
  --promptthis-bg: #fff; --promptthis-text: #1f2937;
  --promptthis-border: rgba(128,128,128,0.15);
  --promptthis-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
[data-promptthis-item] { color: #1f2937; }
[data-promptthis-item]:hover, [data-promptthis-item]:focus-visible { background: rgba(128,128,128,0.08); }
[data-promptthis-toast] { background: #1f2937; color: #f9fafb; }
`;

interface PromptThisConfig {
  openIn?: string[];
  theme?: "light" | "dark";
  label?: string;
  defaultRole?: string;
  defaultContext?: string;
  customProviders?: Provider[];
}

declare global {
  interface Window {
    PromptThisConfig?: PromptThisConfig;
    PromptThis?: typeof api;
  }
}

let styleEl: HTMLStyleElement | null = null;
let liveRegion: HTMLDivElement | null = null;
let toastEl: HTMLDivElement | null = null;
let toastTimer: ReturnType<typeof setTimeout> | null = null;
let activePopover: {
  popover: HTMLElement;
  trigger: HTMLButtonElement;
  backdrop?: HTMLElement;
  cleanup: () => void;
} | null = null;
const instances: Array<{
  el: HTMLElement;
  btn: HTMLButtonElement;
  cleanup: () => void;
}> = [];

function getConfig(): PromptThisConfig {
  return (window as Window).PromptThisConfig || {};
}

function injectStyles() {
  if (styleEl) return;
  styleEl = document.createElement("style");
  styleEl.textContent = STYLES;
  const config = getConfig();
  if (config.theme === "dark") {
    styleEl.textContent += DARK_OVERRIDES;
  } else if (config.theme === "light") {
    styleEl.textContent += LIGHT_OVERRIDES;
  }
  document.head.appendChild(styleEl);
}

function ensureLiveRegion() {
  if (liveRegion) return;
  liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "promptthis-sr-only";
  document.body.appendChild(liveRegion);
}

function ensureToast() {
  if (toastEl) return;
  toastEl = document.createElement("div");
  toastEl.setAttribute("data-promptthis-toast", "");
  document.body.appendChild(toastEl);
}

function showToast(message: string, duration = 2500) {
  ensureToast();
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl?.classList.remove("visible");
  }, duration);
}

function announce(message: string) {
  ensureLiveRegion();
  if (liveRegion) liveRegion.textContent = message;
}

function closeActivePopover() {
  if (!activePopover) return;
  activePopover.cleanup();
  activePopover.popover.remove();
  activePopover.backdrop?.remove();
  activePopover = null;
}

function isMobile() {
  return window.innerWidth < 640;
}

function createPopover(
  btn: HTMLButtonElement,
  el: HTMLElement,
  prompt: string,
  providersToShow: Provider[],
  copyOnly: boolean
) {
  closeActivePopover();

  const config = getConfig();
  const popover = document.createElement("div");
  popover.setAttribute("data-promptthis-popover", "");
  popover.setAttribute("role", "menu");

  let backdrop: HTMLElement | undefined;

  // Copy button
  const copyBtn = document.createElement("button");
  copyBtn.setAttribute("data-promptthis-item", "");
  copyBtn.setAttribute("role", "menuitem");
  copyBtn.tabIndex = 0;

  const copyIconSpan = document.createElement("span");
  copyIconSpan.setAttribute("data-promptthis-item-icon", "");
  copyIconSpan.innerHTML = CLIPBOARD_SVG;
  const copyLabelSpan = document.createElement("span");
  copyLabelSpan.textContent = "Copy prompt";
  copyBtn.appendChild(copyIconSpan);
  copyBtn.appendChild(copyLabelSpan);

  copyBtn.addEventListener("click", async () => {
    await copyToClipboard(prompt);
    copyLabelSpan.textContent = "\u2713 Copied!";
    announce("Prompt copied to clipboard");
    setTimeout(() => closeActivePopover(), 500);
  });
  popover.appendChild(copyBtn);

  if (!copyOnly) {
    providersToShow.forEach((p) => {
      const item = document.createElement("button");
      item.setAttribute("data-promptthis-item", "");
      item.setAttribute("role", "menuitem");
      item.tabIndex = -1;

      const iconSpan = document.createElement("span");
      iconSpan.setAttribute("data-promptthis-item-icon", "");
      iconSpan.textContent = p.icon;
      const nameSpan = document.createElement("span");
      nameSpan.textContent = p.name;
      item.appendChild(iconSpan);
      item.appendChild(nameSpan);

      item.addEventListener("click", () => {
        if (canUseDeepLink(prompt)) {
          const url = getProviderUrl(p.id, prompt, config.customProviders);
          if (url) window.open(url, "_blank");
        } else {
          copyToClipboard(prompt).then(() => {
            const url = getProviderUrl(p.id, "", config.customProviders);
            if (url) window.open(url, "_blank");
            showToast("Prompt copied \u2014 paste it in the chat");
          });
        }
        closeActivePopover();
      });
      popover.appendChild(item);
    });
  }

  // Position
  if (isMobile()) {
    backdrop = document.createElement("div");
    backdrop.setAttribute("data-promptthis-backdrop", "");
    backdrop.addEventListener("click", closeActivePopover);
    document.body.appendChild(backdrop);
    document.body.appendChild(popover);
  } else {
    btn.parentElement?.appendChild(popover);
  }

  // Keyboard
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeActivePopover();
      btn.focus();
      return;
    }
    if (e.key === "Tab" || e.key === "ArrowDown" || e.key === "ArrowUp") {
      const items = Array.from(
        popover.querySelectorAll<HTMLElement>('[role="menuitem"]')
      );
      if (!items.length) return;
      e.preventDefault();
      const idx = items.indexOf(document.activeElement as HTMLElement);
      const next =
        e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)
          ? idx <= 0
            ? items.length - 1
            : idx - 1
          : idx >= items.length - 1
            ? 0
            : idx + 1;
      items[next].focus();
    }
  };
  document.addEventListener("keydown", handleKeyDown, true);

  // Click outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !popover.contains(e.target as Node) &&
      !btn.contains(e.target as Node)
    ) {
      closeActivePopover();
    }
  };
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, 0);

  const cleanup = () => {
    document.removeEventListener("keydown", handleKeyDown, true);
    document.removeEventListener("click", handleClickOutside, true);
  };

  activePopover = { popover, trigger: btn, backdrop, cleanup };

  // Focus first item
  requestAnimationFrame(() => {
    const first = popover.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  });
}

function initElement(el: HTMLElement) {
  const config = getConfig();

  el.setAttribute("data-promptthis-target", "");

  const btn = document.createElement("button");
  btn.setAttribute("data-promptthis-trigger", "");
  btn.setAttribute("type", "button");
  const label =
    el.getAttribute("data-prompt-action") || config.label || "Prompt";
  btn.setAttribute("aria-label", `${label} \u2014 send to AI`);

  const svgContainer = document.createElement("span");
  svgContainer.innerHTML = SPARKLE_SVG;
  const svgEl = svgContainer.firstElementChild;
  if (svgEl) btn.appendChild(svgEl);
  const labelSpan = document.createElement("span");
  labelSpan.textContent = label;
  btn.appendChild(labelSpan);

  btn.addEventListener("click", () => {
    const instruction = el.getAttribute("data-prompt") || undefined;
    const role =
      el.getAttribute("data-prompt-role") || config.defaultRole || undefined;
    const context =
      el.getAttribute("data-prompt-context") ||
      config.defaultContext ||
      undefined;
    const content = extractContent(el);
    const prompt = buildPrompt({ content, role, context, instruction });

    const copyOnly = el.hasAttribute("data-prompt-copy-only");
    const openInAttr = el.getAttribute("data-prompt-open-in");
    const openInList = openInAttr
      ? openInAttr.split(",").map((s) => s.trim())
      : config.openIn;

    const allProviders = [
      ...defaultProviders,
      ...(config.customProviders || []),
    ];
    const providersToShow = openInList
      ? openInList
          .map((id) => allProviders.find((p) => p.id === id))
          .filter((p): p is Provider => !!p)
      : allProviders;

    createPopover(btn, el, prompt, providersToShow, copyOnly);
  });

  el.appendChild(btn);

  const cleanup = () => {
    btn.remove();
    el.removeAttribute("data-promptthis-target");
  };

  instances.push({ el, btn, cleanup });
}

function init(container?: HTMLElement) {
  const root = container || document;
  injectStyles();
  root.querySelectorAll<HTMLElement>("[data-prompt]").forEach((el) => {
    // Skip if already initialized
    if (el.hasAttribute("data-promptthis-target")) return;
    initElement(el);
  });
}

function destroy() {
  closeActivePopover();
  instances.forEach((i) => i.cleanup());
  instances.length = 0;
  styleEl?.remove();
  styleEl = null;
  liveRegion?.remove();
  liveRegion = null;
  toastEl?.remove();
  toastEl = null;
}

const api = { init, destroy };

// Auto-init
if (typeof window !== "undefined") {
  window.PromptThis = api;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }
}

export { init, destroy };
