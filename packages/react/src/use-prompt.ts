import { useMemo, useCallback, type RefObject } from "react";
import {
  buildPrompt,
  defaultProviders,
  copyToClipboard,
  canUseDeepLink,
  getProviderUrl,
  extractContent,
  type Provider,
} from "@promptthis/core";

export interface UsePromptOptions {
  content: string | RefObject<HTMLElement | null>;
  role?: string;
  context?: string;
  instruction?: string;
  openIn?: string[];
  customProviders?: Provider[];
}

function resolveContent(
  content: string | RefObject<HTMLElement | null>
): string {
  if (typeof content === "string") return content;
  if (content?.current) return extractContent(content.current);
  return "";
}

export function usePrompt(options: UsePromptOptions) {
  const { content, role, context, instruction, openIn, customProviders } =
    options;

  const prompt = useMemo(() => {
    const text = resolveContent(content);
    return buildPrompt({ content: text, role, context, instruction });
  }, [content, role, context, instruction]);

  const providers = useMemo(() => {
    const all = [...defaultProviders, ...(customProviders || [])];
    if (!openIn) return all;
    return openIn
      .map((id) => all.find((p) => p.id === id))
      .filter((p): p is Provider => p !== undefined);
  }, [openIn, customProviders]);

  const getPrompt = useCallback(() => {
    const text = resolveContent(content);
    return buildPrompt({ content: text, role, context, instruction });
  }, [content, role, context, instruction]);

  const copy = useCallback(() => copyToClipboard(getPrompt()), [getPrompt]);

  const openInProvider = useCallback(
    (providerId: string) => {
      const currentPrompt = getPrompt();
      if (canUseDeepLink(currentPrompt)) {
        const url = getProviderUrl(providerId, currentPrompt, customProviders);
        if (url) window.open(url, "_blank");
      } else {
        copyToClipboard(currentPrompt).then(() => {
          const url = getProviderUrl(providerId, "", customProviders);
          if (url) window.open(url, "_blank");
        });
      }
    },
    [getPrompt, customProviders]
  );

  return { prompt, copy, openIn: openInProvider, providers };
}
