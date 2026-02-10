export interface Provider {
  id: string;
  name: string;
  icon: string;
  url: (prompt: string) => string;
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

const DEFAULT_MAX_ENCODED_LENGTH = 1800;

export function canUseDeepLink(
  prompt: string,
  maxEncodedLength = DEFAULT_MAX_ENCODED_LENGTH
): boolean {
  return encodeURIComponent(prompt).length <= maxEncodedLength;
}
