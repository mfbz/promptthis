# CLAUDE.md

## Project

PromptThis: "The share button, but for AI."

## Positioning

Every "Ask AI" widget puts a chatbot on your site. PromptThis does the opposite, it sends content to the user's own AI tool, with author-crafted prompts. The closest analogy is the social share button (ShareThis, AddToAny), but for AI tools instead of social networks.

- **Author-side widget**: the content creator embeds the button and crafts the prompt (role, context, instructions)
- **Exports TO external AI tools**: Claude, ChatGPT, Gemini, Perplexity. Not running AI on-site
- **Share sheet UX**: popover on desktop, bottom sheet on mobile
- **Zero infrastructure**: no API keys, no backend, no accounts, no cost per query
- **Under 8KB** minified + gzipped, zero dependencies

## Architecture

Monorepo with npm workspaces. Three packages:

- `packages/core` (`@promptthis/core`): Pure TypeScript logic. No DOM, no framework. Prompt assembly, provider URLs, clipboard.
- `packages/react` (`@promptthis/react`): React components (PromptButton, usePrompt hook, PromptProvider). Ships zero CSS by default, optional `styles.css`.
- `packages/vanilla` (`promptthis`): Script tag drop-in. Auto-inits from `data-prompt` attributes. Embeds CSS.

## Commands

- `npm run build` - Build all packages (core first, then react + vanilla)
- `npm run test` - Run all tests with vitest
- `npm run test:watch` - Watch mode
- `npm run clean` - Remove all dist/ directories
- `npm run build -w packages/core` - Build just core

## Release

- `npm run version:patch` - Bump all packages patch (0.1.0 → 0.1.1)
- `npm run version:minor` - Bump all packages minor (0.1.0 → 0.2.0)
- `npm run version:major` - Bump all packages major (0.1.0 → 1.0.0)
- `npm run release` - Clean, build, test, then publish all packages to npm (core first, then react + vanilla)
- All packages are published with `--access public` (scoped packages require this)
- Publish order: core → react → vanilla (react and vanilla depend on core)
- After bumping versions, update the `@promptthis/core` dependency version in `packages/react/package.json` and `packages/vanilla/package.json` to match

## Key Design Decisions

- "Provider" is the internal term for AI destinations (Claude, ChatGPT, etc). User-facing prop is `openIn`.
- React component ships no CSS by default. Users import `@promptthis/react/styles.css` for defaults or style via className.
- Vanilla embeds CSS automatically (script tag users expect zero setup).
- Default button: sparkle icon + "Prompt". Inherits page font/color. Not opinionated.
- Popover renders with `data-promptthis-*` attributes for CSS targeting.
- Core is framework-agnostic. Future Vue/Svelte wrappers import from core.

## Demo

- `demo/` - Next.js App Router app showcasing `@promptthis/react`
- `npm run demo` - Builds all packages then starts the dev server
- Geist Pixel + Geist Sans fonts, black/white aesthetic
- 4 sections: Basic, Customized (ref + role/context), usePrompt hook, PromptProvider

## Testing

- Vitest with jsdom environment for React component tests
- Core tests are pure unit tests (no DOM)
- `@testing-library/react` for component tests

## Code Style

- Never use block/banner comments like `/* === Section === */`. Use short inline comments only when the logic isn't self-evident.

## File Structure

packages/core/src/ - prompt.ts, providers.ts, clipboard.ts, content.ts, index.ts
packages/react/src/ - prompt-button.tsx, use-prompt.ts, provider.tsx, sparkle-icon.tsx, icons/, styles.css, index.ts
packages/vanilla/src/ - promptthis.ts
