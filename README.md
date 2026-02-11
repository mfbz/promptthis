# PromptThis

> The share button, but for AI.

The share button, but for AI. You embed a button, craft the prompt, and your visitors copy it or open it directly in Claude, ChatGPT, Gemini, or Perplexity. One click.

Under 8KB minified + gzipped. Zero dependencies.

## How it's different

Every "Ask AI" widget puts a chatbot **on** your site. PromptThis does the opposite, it sends your content **to** the user's own AI provider, with author-crafted prompts that make the AI actually useful. No API keys, no backend, no cost per query. The user gets their preferred tool with their own conversation history.

## Quick Start: React

```bash
npm install @promptthis/react
```

```tsx
import { PromptButton } from "@promptthis/react";
import "@promptthis/react/styles.css"; // optional default styles

function Docs({ content }) {
  return (
    <article>
      {content}
      <PromptButton
        content={content}
        role="You are a helpful coding assistant."
        openIn={["claude", "chatgpt"]}
      />
    </article>
  );
}
```

## Quick Start: HTML

```html
<script src="https://unpkg.com/@promptthis/vanilla@latest/dist/promptthis.global.js"></script>

<div data-prompt="Help me understand this code.">
  <h2>Getting Started</h2>
  <p>Install the package with npm install acme-sdk...</p>
</div>
```

A button appears on hover. Click it. Pick an AI provider. Done.

## React API

### `<PromptButton>`

| Prop               | Type                               | Default       | Description                                                                             |
| ------------------ | ---------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| `content`          | `string \| RefObject<HTMLElement>` | required      | Text or ref to DOM element to extract content from                                      |
| `role`             | `string`                           | -             | System role preamble (e.g. "You are a senior developer.")                               |
| `context`          | `string`                           | -             | Additional context prepended before content                                             |
| `instruction`      | `string`                           | -             | Instruction appended after content                                                      |
| `openIn`           | `string[]`                         | all providers | Filter which AI providers to show (`'claude'`, `'chatgpt'`, `'gemini'`, `'perplexity'`) |
| `label`            | `string \| null`                   | `'Prompt'`    | Button label. Pass `null` or `""` for icon-only                                         |
| `icon`             | `ReactNode`                        | sparkle icon  | Custom icon element                                                                     |
| `className`        | `string`                           | -             | Class for the trigger button                                                            |
| `popoverClassName` | `string`                           | -             | Class for the popover menu                                                              |
| `style`            | `CSSProperties`                    | -             | Inline styles for the trigger button (use for CSS variable overrides)                   |
| `popoverStyle`     | `CSSProperties`                    | -             | Inline styles for the popover menu (use for CSS variable overrides)                     |
| `copyLabel`        | `string`                           | `'Copy'`      | Label for the copy button in the popover                                                |
| `onCopy`           | `(prompt: string) => void`         | -             | Callback when prompt is copied                                                          |
| `onOpen`           | `(providerId: string) => void`     | -             | Callback when an AI provider is opened                                                  |

### `usePrompt` Hook

Build your own UI with full control.

```tsx
import { usePrompt } from "@promptthis/react";

const { prompt, copy, openIn, providers } = usePrompt({
  content: "Your text here",
  role: "You are a helpful assistant.",
  openIn: ["claude", "chatgpt"],
});
```

Returns:

- `prompt` - The assembled prompt string
- `copy()` - Copy prompt to clipboard
- `openIn(providerId)` - Open prompt in an AI provider
- `providers` - Array of `{ id, name, icon }` for the filtered providers

### `<PromptProvider>`

Set defaults for all `PromptButton` and `usePrompt` instances below it.

```tsx
import { PromptProvider, PromptButton } from "@promptthis/react";

<PromptProvider
  defaultRole="You are a helpful assistant."
  openIn={["claude", "chatgpt", "gemini"]}
>
  <App />
</PromptProvider>;
```

Props: `openIn`, `defaultRole`, `defaultContext`, `defaultInstruction`, `customProviders`, `copyLabel`.

## HTML API

### Data Attributes

| Attribute               | Required | Description                                                                  |
| ----------------------- | -------- | ---------------------------------------------------------------------------- |
| `data-prompt`           | Yes      | Marks element as promptable. Value becomes the instruction (empty = default) |
| `data-prompt-role`      | No       | System role preamble                                                         |
| `data-prompt-context`   | No       | Additional context before content                                            |
| `data-prompt-action`    | No       | Button label (default: "Prompt"). Set to `""` for icon-only                  |
| `data-prompt-open-in`   | No       | Comma-separated provider IDs                                                 |
| `data-prompt-copy-only` | No       | Only show "Copy" (no AI provider links)                                      |

### Configuration

```html
<script>
  window.PromptThisConfig = {
    openIn: ["claude", "chatgpt"],
    theme: "dark", // 'light' | 'dark' (default: auto)
    label: "Ask AI", // global button label
    defaultRole: "You are a helpful assistant.",
    defaultContext: "",
    defaultInstruction: "", // default instruction for all elements
    copyLabel: "Copy", // localize the copy button text
    customProviders: [
      {
        id: "myai",
        name: "My AI",
        icon: "🤖",
        url: (prompt) =>
          `https://myai.com/chat?q=${encodeURIComponent(prompt)}`,
      },
    ],
  };
</script>
<script src="https://unpkg.com/@promptthis/vanilla@latest/dist/promptthis.global.js"></script>
```

### JS API

```js
// Re-scan after dynamic content loads
PromptThis.init(document.querySelector("#new-content"));

// Clean up
PromptThis.destroy();
```

## Styling

### React

The React package ships **zero CSS by default**. Two options:

1. **Import default styles:** `import '@promptthis/react/styles.css'`
2. **Style with className:** `<PromptButton className="my-btn" popoverClassName="my-menu" />`

Default styles live in `@layer promptthis`, so any Tailwind class or custom CSS overrides them naturally — no `!important` needed. You can also override with CSS custom properties:

```tsx
<PromptButton
  content="..."
  style={
    {
      "--promptthis-bg": "black",
      "--promptthis-text": "white",
      "--promptthis-radius": "0px",
      "--promptthis-hover-bg": "white",
      "--promptthis-hover-text": "black",
    } as React.CSSProperties
  }
  popoverStyle={
    {
      "--promptthis-popover-bg": "black",
      "--promptthis-item-text": "white",
      "--promptthis-item-hover-bg": "rgba(255,255,255,0.1)",
    } as React.CSSProperties
  }
/>
```

Or set variables on any ancestor element:

```css
.my-theme {
  --promptthis-bg: black;
  --promptthis-text: white;
}
```

### CSS Custom Properties

**Trigger button:**
`--promptthis-bg`, `--promptthis-text`, `--promptthis-border`, `--promptthis-radius`, `--promptthis-padding-x`, `--promptthis-padding-y`, `--promptthis-gap`, `--promptthis-font-size`, `--promptthis-opacity`, `--promptthis-shadow`, `--promptthis-hover-bg`, `--promptthis-hover-text`

**Popover:**
`--promptthis-popover-bg`, `--promptthis-popover-border`, `--promptthis-popover-radius`, `--promptthis-popover-shadow`

**Items:**
`--promptthis-item-text`, `--promptthis-item-hover-bg`

### Dark Mode

Dark mode activates automatically via `prefers-color-scheme: dark`, or manually with a `data-theme="dark"` attribute on any ancestor:

```html
<div data-theme="dark">
  <PromptButton content="..." />
</div>
```

### Vanilla / HTML

CSS is embedded automatically. Override with CSS custom properties:

```css
:root {
  --promptthis-bg: #f5f5f5;
  --promptthis-text: inherit;
  --promptthis-border: rgba(0, 0, 0, 0.08);
  --promptthis-radius: 8px;
  --promptthis-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
```

## Custom Providers

Add your own AI provider. Use the `createProvider` helper for a simpler syntax:

```tsx
import { createProvider } from "@promptthis/core";

const myProvider = createProvider({
  id: "myai",
  name: "My AI",
  icon: "🤖",
  url: "https://myai.com/chat?q={prompt}", // template string — {prompt} is auto-encoded
});

// Or with a function URL
const myProvider2 = createProvider({
  id: "myai",
  name: "My AI",
  url: (prompt) => `https://myai.com/chat?q=${encodeURIComponent(prompt)}`,
});

// Optional: custom prompt formatting for this provider
const myProvider3 = createProvider({
  id: "myai",
  name: "My AI",
  url: "https://myai.com/chat?q={prompt}",
  formatPrompt: (config) => `[${config.content}]\n\nPlease help.`,
});
```

Pass custom providers to `PromptProvider` or `PromptButton`:

```tsx
<PromptProvider customProviders={[myProvider]}>
  <App />
</PromptProvider>
```

Custom providers with the same `id` as a default provider will override it.

```html
<!-- Vanilla -->
<script>
  window.PromptThisConfig = {
    customProviders: [
      {
        id: "myai",
        name: "My AI",
        icon: "🤖",
        url: (prompt) =>
          `https://myai.com/chat?q=${encodeURIComponent(prompt)}`,
      },
    ],
  };
</script>
```

## FAQ

**Why not just let AI providers browse the page?**
They can. But an author-crafted prompt will always be better than what an AI extracts on its own. You know the pitfalls, the prerequisites, the ideal way to guide someone. PromptThis lets you encode that knowledge.

**How is this different from chatbot widgets?**
Chatbot widgets run AI on your site. PromptThis sends content to the user's own AI provider. No API keys, no backend, no cost per query. And the user gets to use their preferred tool with their own conversation history.

**File size?**
Under 8KB minified + gzipped. Zero dependencies.

**Does this work on mobile?**
Yes. Bottom sheet on small screens, popover on desktop.

**Can I add my own AI provider?**
Yes. Pass a `customProviders` array with `id`, `name`, `icon`, and `url` function. See "Custom Providers" above.

## Packages

| Package             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `@promptthis/core`  | Pure TypeScript logic: prompt assembly, providers, clipboard |
| `@promptthis/react` | React components: PromptButton, usePrompt, PromptProvider    |
| `promptthis`        | Vanilla script tag drop-in: auto-init, embedded CSS          |

## Release

Bump versions across all packages, then publish to npm:

```bash
# Bump version (pick one)
npm run version:patch   # 0.1.0 → 0.1.1
npm run version:minor   # 0.1.0 → 0.2.0
npm run version:major   # 0.1.0 → 1.0.0

# Publish (clean → build → test → publish core → react → vanilla)
npm run release
```

Packages are published in dependency order: `@promptthis/core` first, then `@promptthis/react` and `@promptthis/vanilla`.

> After bumping versions, update the `@promptthis/core` dependency in `packages/react/package.json` and `packages/vanilla/package.json` to match the new version before publishing.

## Demo

Run the interactive demo locally:

```bash
npm run demo
```

Opens a Next.js app at `localhost:3000` with live examples of PromptButton, usePrompt hook, and PromptProvider.

## License

MIT
