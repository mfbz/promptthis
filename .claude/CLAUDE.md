# CLAUDE.md

## Project

PromptThis: "The share button, but for AI."

## Positioning

Every "Ask AI" widget puts a chatbot on your site. PromptThis does the opposite, it sends content to the user's own AI provider, with author-crafted prompts. The closest analogy is the social share button, but for AI providers instead of social networks.

- **Author-side widget**: the content creator embeds the button and crafts the prompt (role, context, instructions)
- **Exports TO external AI providers**: Claude, ChatGPT, Gemini, Perplexity. Not running AI on-site
- **Share sheet UX**: popover on desktop, bottom sheet on mobile
- **Zero infrastructure**: no API keys, no backend, no accounts, no cost per query
- **Under 8KB** minified + gzipped, zero dependencies

## Architecture

Monorepo with npm workspaces. Three packages:

- `packages/core` (`@promptthis/core`): Pure TypeScript logic. No DOM, no framework. Prompt assembly, provider URLs, clipboard.
- `packages/react` (`@promptthis/react`): React components (PromptButton, usePrompt hook, PromptProvider). Ships zero CSS by default, optional `styles.css`.
- `packages/vanilla` (`@promptthis/vanilla`): Script tag drop-in. Auto-inits from `data-prompt` attributes. Embeds CSS.

## Commands

- `npm run build` - Build all packages (core first, then react + vanilla)
- `npm run test` - Run all tests with vitest
- `npm run test:watch` - Watch mode
- `npm run clean` - Remove all dist/ directories
- `npm run build -w packages/core` - Build just core

## Release

Uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing. All three packages use **fixed** versioning (they always share the same version number). Changesets handles dependency bumping automatically.

- `npx changeset` - Create a changeset (describe what changed, pick bump type)
- `npm run version` - Consume changesets: bump versions, update internal deps, generate CHANGELOGs
- `npm run release` - Clean, build, test, then publish all packages to npm in dependency order
- Config: `.changeset/config.json` (fixed versioning, public access, `main` base branch)
- Publish order is automatic: core → react → vanilla (topological)

### GitHub workflow

Automated via `.github/workflows/release.yml`:

1. Create a changeset in your feature branch (`npx changeset`), commit it with your code
2. Open PR → merge to main
3. The GitHub Action opens a "Version Packages" PR (version bumps + changelogs)
4. Merge that PR → the action publishes to npm automatically

Uses npm Trusted Publishing (OIDC) — no tokens or secrets needed. Each package must be configured with a trusted publisher on npmjs.com (package settings → Trusted Publishers → add repo + workflow file `release.yml`).

## Key Design Decisions

- "Provider" is the internal term for AI destinations (Claude, ChatGPT, etc). User-facing prop is `openIn`.
- React component ships no CSS by default. Users import `@promptthis/react/styles.css` for defaults or style via className.
- Vanilla embeds CSS automatically (script tag users expect zero setup).
- Default button: sparkle icon + "Prompt". Pass `label={null}` or `label=""` for icon-only. Inherits page font/color.
- All default styles live in `@layer promptthis`, so any Tailwind class or custom CSS overrides them without `!important`. Two-tier custom property pattern: private `--_pt-*` variables read from public `--promptthis-*` with defaults.
- `style` and `popoverStyle` props enable ergonomic CSS variable overrides via inline styles.
- `copyLabel` prop allows localization. Resolved order: prop > PromptProvider context > default.
- `createProvider()` helper in core simplifies custom provider creation (template string URLs, optional `formatPrompt`).
- Custom providers with the same `id` as a default provider override it (custom-first dedup).
- Prompt content uses `<content>` XML tags (not `---` delimiters).
- Popover renders with `data-promptthis-*` attributes for CSS targeting.
- Dark mode: `@media (prefers-color-scheme: dark)` + `[data-theme="dark"]` ancestor.
- Core is framework-agnostic. Future Vue/Svelte wrappers import from core.

## Demo

- `demo/` - Next.js App Router app showcasing `@promptthis/react`
- `npm run demo` - Builds all packages then starts the dev server
- Geist Pixel + Geist Sans fonts, black/white aesthetic
- 7 sections: Getting Started, Basic, Icon Only, Customized (ref + role/context), usePrompt hook, Theming, PromptProvider

## Testing

- Vitest with jsdom environment for React component tests
- Core tests are pure unit tests (no DOM)
- `@testing-library/react` for component tests

## Code Style

- Never use block/banner comments like `/* === Section === */`. Use short inline comments only when the logic isn't self-evident.

## File Structure

packages/core/src/ - prompt.ts, providers.ts, clipboard.ts, content.ts, position.ts, index.ts
packages/react/src/ - prompt-button.tsx, use-prompt.ts, provider.tsx, sparkle-icon.tsx, icons/, styles.css, index.ts
packages/vanilla/src/ - promptthis.ts
