export interface PromptConfig {
  content: string;
  role?: string;
  context?: string;
  instruction?: string;
}

const MAX_CONTENT_LENGTH = 12000;
const DEFAULT_INSTRUCTION = "Help me with the above content.";

function cleanContent(raw: string): string {
  let text = raw.trim().replace(/\n{3,}/g, "\n\n");
  if (text.length > MAX_CONTENT_LENGTH) {
    text =
      text.substring(0, MAX_CONTENT_LENGTH) +
      "\n[Content truncated for length...]";
  }
  return text;
}

export function buildPrompt(config: PromptConfig): string {
  const parts: string[] = [];

  if (config.role) parts.push(config.role);
  if (config.context) parts.push(config.context);

  const content = cleanContent(config.content);
  parts.push(`---\nHere is the content:\n\n${content}\n\n---`);

  parts.push(config.instruction || DEFAULT_INSTRUCTION);

  return parts.join("\n\n");
}
