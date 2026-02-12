import type { ComponentType, SVGProps } from "react";
import { ClaudeIcon } from "./claude";
import { OpenAIIcon } from "./openai";
import { PerplexityIcon } from "./perplexity";

export { ClaudeIcon } from "./claude";
export { OpenAIIcon } from "./openai";
export { PerplexityIcon } from "./perplexity";
export { ClipboardIcon } from "./clipboard";

export const providerIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  claude: ClaudeIcon,
  chatgpt: OpenAIIcon,
  perplexity: PerplexityIcon,
};
