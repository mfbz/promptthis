import type { PromptConfig } from "./prompt";

export interface Provider {
  id: string;
  name: string;
  icon: string;
  url: (prompt: string) => string;
  formatPrompt?: (config: PromptConfig) => string;
}

export interface CreateProviderOptions {
  id: string;
  name: string;
  icon?: string;
  url: string | ((prompt: string) => string);
  formatPrompt?: (config: PromptConfig) => string;
}

export function createProvider(options: CreateProviderOptions): Provider {
  const { id, name, icon = "⬡", url, formatPrompt } = options;
  const urlFn =
    typeof url === "string"
      ? (prompt: string) => url.replace("{prompt}", encodeURIComponent(prompt))
      : url;
  return { id, name, icon, url: urlFn, ...(formatPrompt && { formatPrompt }) };
}

export const defaultProviders: Provider[] = [
  {
    id: "claude",
    name: "Claude",
    icon: "✦",
    url: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "◆",
    url: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: "▲",
    url: (prompt) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: "◈",
    url: (prompt) =>
      `https://www.perplexity.ai/search/?q=${encodeURIComponent(prompt)}`,
  },
];

export function mergeProviders(customProviders?: Provider[]): Provider[] {
  const all = [...(customProviders || []), ...defaultProviders];
  return all.filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
}

const providerMap = new Map(defaultProviders.map((p) => [p.id, p]));

export function getProviderUrl(
  providerId: string,
  prompt: string,
  customProviders?: Provider[]
): string | null {
  const custom = customProviders?.find((p) => p.id === providerId);
  const provider = custom || providerMap.get(providerId);
  return provider ? provider.url(prompt) : null;
}

// Max encoded prompt length for URL deep links.
// Modern browsers support long URLs (Chrome ~2MB, Firefox ~65K, Safari ~80K).
// We use 16000 to stay safely below server/proxy limits.
const DEFAULT_MAX_ENCODED_LENGTH = 16000;

export function canUseDeepLink(
  prompt: string,
  maxEncodedLength = DEFAULT_MAX_ENCODED_LENGTH
): boolean {
  return encodeURIComponent(prompt).length <= maxEncodedLength;
}
