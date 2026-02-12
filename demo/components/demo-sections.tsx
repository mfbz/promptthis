"use client";

import React, { useRef } from "react";
import { PromptButton, usePrompt, PromptProvider } from "@promptthis/react";
import { Section } from "@/components/section";
import { CodeBlock } from "@/components/code-block";
import { Zap } from "pixelarticons/fonts/react/Zap";
import { Copy } from "pixelarticons/fonts/react/Copy";

const SAMPLE_CONTENT = `Every "Ask AI" widget puts a chatbot on your site. PromptThis does the opposite: you embed a button, craft the prompt, and visitors open it directly in their own AI provider. The share button, but for AI. Under 8KB, zero dependencies.`;

export { SAMPLE_CONTENT };

const BANNER_PROMPT = `PromptThis is the share button, but for AI. Instead of social networks, it sends content to AI providers.

Every "Ask AI" widget puts a chatbot on your site. PromptThis does the opposite: it sends content to the user's own AI provider, with author-crafted prompts that make the AI actually useful.

INSTALL: npm install @promptthis/react

BASIC USAGE:
import { PromptButton } from '@promptthis/react'
import '@promptthis/react/styles.css'

<PromptButton content="Your content here." />

HOW IT WORKS:
1. You embed a PromptButton next to any content
2. You craft the prompt: role, context, instruction
3. Visitor clicks, picks their AI provider (Claude, ChatGPT, Perplexity)
4. Prompt opens directly in that tool or gets copied to clipboard

WHY AUTHOR-CRAFTED PROMPTS?
AI providers can browse your page, but an author-crafted prompt is always better. You know the pitfalls, the prerequisites, the ideal way to guide someone. PromptThis lets you encode that knowledge.

KEY FEATURES:
- Under 8KB minified + gzipped, zero dependencies
- Pass a string or DOM ref as content
- Shape prompts with role, context, and instruction props
- Filter providers with openIn={['claude', 'chatgpt']}
- usePrompt hook for fully custom UIs
- PromptProvider for shared defaults across a component tree
- Ships zero CSS, fully styleable with className
- No API keys, no backend, no cost per query

Help me add PromptThis to my project.`;

export function HeroBanner() {
  return (
    <div className="bg-black text-white px-12 py-10 max-md:px-5">
      <div className="max-w-[800px]">
        <p className="text-[15px] text-white/80 leading-relaxed mb-1">
          The share button, but for AI. You embed, you craft the prompt, and
          visitors copy it or open it in Claude, ChatGPT, or Perplexity.
        </p>
        <p className="text-[13px] text-white/40 mb-5">
          Under 8KB. Zero dependencies. npm install @promptthis/react
        </p>
        <PromptButton
          content={BANNER_PROMPT}
          role="You are a helpful coding assistant who specializes in React libraries."
          instruction="Help me integrate PromptThis into my project. Walk me through setup, basic usage, and any customization options."
          style={
            {
              "--promptthis-bg": "white",
              "--promptthis-text": "black",
              "--promptthis-border": "white",
              "--promptthis-radius": "0px",
              "--promptthis-hover-bg": "transparent",
              "--promptthis-hover-text": "white",
              "--promptthis-shadow": "none",
            } as React.CSSProperties
          }
          popoverStyle={
            {
              "--promptthis-popover-bg": "white",
              "--promptthis-popover-border": "white",
              "--promptthis-popover-radius": "0px",
              "--promptthis-popover-shadow": "4px 4px 0 rgba(255,255,255,0.1)",
              "--promptthis-item-text": "black",
              "--promptthis-item-hover-bg": "rgba(0,0,0,0.05)",
            } as React.CSSProperties
          }
          label="Try it: prompt this library"
        />
      </div>
    </div>
  );
}

export function GettingStartedSection() {
  return (
    <Section
      id="getting-started"
      number="00"
      title="Getting Started"
      description="Three steps to add a prompt button to your site."
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 max-md:flex-col max-md:gap-2">
          <div className="shrink-0 w-8 h-8 bg-black text-white text-sm flex items-center justify-center">
            1
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold mb-2">Install the package</h3>
            <CodeBlock label="Terminal">{`npm install @promptthis/react`}</CodeBlock>
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col max-md:gap-2">
          <div className="shrink-0 w-8 h-8 bg-black text-white text-sm flex items-center justify-center">
            2
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold mb-2">Import and use</h3>
            <CodeBlock label="React">{`
import { PromptButton } from '@promptthis/react'
import '@promptthis/react/styles.css'

<PromptButton content="Your content here." />
            `}</CodeBlock>
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col max-md:gap-2">
          <div className="shrink-0 w-8 h-8 bg-black text-white text-sm flex items-center justify-center">
            3
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold mb-2">Try it live</h3>
            <p className="text-sm text-neutral-600 mb-2">
              Click the button below. Copy the prompt or open it in your AI
              tool.
            </p>
            <div className="mt-3">
              <PromptButton content={SAMPLE_CONTENT} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function BasicSection() {
  return (
    <Section
      id="basic"
      number="01"
      title="Basic Usage"
      description="Pass your content as a string. Visitors choose to copy the prompt or open it directly in Claude, ChatGPT, or Perplexity."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-8 max-md:p-5">
        <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
          <Zap
            width="12"
            height="12"
            overflow="visible"
            className="fill-current"
          />
          LIVE
        </div>
        <p className="text-sm text-neutral-800 leading-relaxed mb-5">
          {SAMPLE_CONTENT}
        </p>
        <PromptButton content={SAMPLE_CONTENT} />
      </div>
      <CodeBlock label="React">{`
import { PromptButton } from '@promptthis/react'

<PromptButton
  content="PromptThis is a drop-in widget that adds
    prompt sharing to any content..."
/>
      `}</CodeBlock>
    </Section>
  );
}

const ICON_ONLY_DEFAULT_STYLE = {
  "--promptthis-bg": "transparent",
  "--promptthis-text": "black",
  "--promptthis-border": "black",
  "--promptthis-radius": "0px",
  "--promptthis-hover-bg": "black",
  "--promptthis-hover-text": "white",
  "--promptthis-shadow": "none",
  "--promptthis-padding-y": "8px",
} as React.CSSProperties;

const ICON_ONLY_ROUNDED_STYLE = {
  "--promptthis-bg": "linear-gradient(to right, #8b5cf6, #9333ea)",
  "--promptthis-text": "white",
  "--promptthis-border": "transparent",
  "--promptthis-radius": "9999px",
  "--promptthis-hover-bg": "linear-gradient(to right, #7c3aed, #7e22ce)",
  "--promptthis-hover-text": "white",
  "--promptthis-shadow": "0 4px 14px rgba(124,58,237,0.35)",
  "--promptthis-padding-y": "10px",
} as React.CSSProperties;

const ICON_ONLY_MINIMAL_STYLE = {
  "--promptthis-bg": "#f9fafb",
  "--promptthis-text": "#4b5563",
  "--promptthis-border": "#e5e7eb",
  "--promptthis-radius": "6px",
  "--promptthis-hover-bg": "#f3f4f6",
  "--promptthis-hover-text": "#111827",
  "--promptthis-shadow": "0 1px 2px rgba(0,0,0,0.04)",
  "--promptthis-padding-y": "6px",
} as React.CSSProperties;

const ICON_ONLY_CYBER_STYLE = {
  "--promptthis-bg": "#0a0a0a",
  "--promptthis-text": "#67e8f9",
  "--promptthis-border": "rgba(6,182,212,0.3)",
  "--promptthis-radius": "8px",
  "--promptthis-hover-bg": "#0a0a0a",
  "--promptthis-hover-text": "#a5f3fc",
  "--promptthis-shadow":
    "0 0 20px rgba(6,182,212,0.15), inset 0 1px 0 rgba(6,182,212,0.1)",
  "--promptthis-padding-y": "8px",
} as React.CSSProperties;

export function IconOnlySection() {
  return (
    <Section
      id="icon-only"
      number="02"
      title="Icon Only"
      description="Pass label={null} to render just the icon. Works with any theme."
    >
      <div
        data-theming-demo=""
        className="relative p-8 border-2 border-black bg-white mb-8 max-md:p-5"
      >
        <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
          <Zap
            width="12"
            height="12"
            overflow="visible"
            className="fill-current"
          />
          LIVE
        </div>
        <p className="text-sm text-neutral-800 leading-relaxed mb-5">
          {SAMPLE_CONTENT}
        </p>
        <div className="flex items-center gap-3">
          <PromptButton content={SAMPLE_CONTENT} label={null} />
          <PromptButton
            content={SAMPLE_CONTENT}
            label={null}
            style={ICON_ONLY_DEFAULT_STYLE}
            popoverStyle={THEME_DEFAULT_POPOVER_STYLE}
          />
          <PromptButton
            content={SAMPLE_CONTENT}
            label={null}
            style={ICON_ONLY_ROUNDED_STYLE}
            popoverStyle={THEME_ROUNDED_POPOVER_STYLE}
          />
          <PromptButton
            content={SAMPLE_CONTENT}
            label={null}
            style={ICON_ONLY_MINIMAL_STYLE}
            popoverStyle={THEME_MINIMAL_POPOVER_STYLE}
          />
          <PromptButton
            content={SAMPLE_CONTENT}
            label={null}
            style={ICON_ONLY_CYBER_STYLE}
            popoverStyle={THEME_CYBER_POPOVER_STYLE}
          />
        </div>
      </div>
      <CodeBlock label="React">{`
<PromptButton content="..." label={null} />
      `}</CodeBlock>
    </Section>
  );
}

export function CustomizedSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="customized"
      number="03"
      title="Customized Prompts"
      description="Use a ref to extract content from the DOM. Shape the prompt with role, context, and instruction. Choose which providers visitors see with openIn."
    >
      <div
        className="relative p-8 border-2 border-black bg-white mb-8 max-md:p-5"
        ref={ref}
      >
        <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
          <Zap
            width="12"
            height="12"
            overflow="visible"
            className="fill-current"
          />
          LIVE
        </div>
        <p className="text-sm text-neutral-800 leading-relaxed mb-5">
          {SAMPLE_CONTENT}
        </p>
        <PromptButton
          content={ref}
          role="You are a senior frontend developer who specializes in React component libraries."
          context="This content is from the PromptThis documentation site."
          instruction="Explain how this library works and how to integrate it into an existing React project."
          openIn={["claude", "chatgpt"]}
        />
      </div>
      <CodeBlock label="React">{`
const ref = useRef<HTMLDivElement>(null)

<div ref={ref}>
  <p>Content is extracted from this DOM element.</p>
  <PromptButton
    content={ref}
    role="You are a senior frontend developer."
    context="From the PromptThis documentation."
    instruction="Explain how to integrate this."
    openIn={['claude', 'chatgpt']}
  />
</div>
      `}</CodeBlock>
    </Section>
  );
}

export function HookSection() {
  const { copy, openIn, providers } = usePrompt({
    content: SAMPLE_CONTENT,
    role: "You are a helpful coding assistant.",
    openIn: ["claude", "chatgpt", "perplexity"],
  });

  return (
    <Section
      id="hook"
      number="04"
      title="usePrompt Hook"
      description="Build your own UI around the prompt. The hook gives you the assembled prompt, copy and openIn functions, and the filtered provider list."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-8 max-md:p-5">
        <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
          <Zap
            width="12"
            height="12"
            overflow="visible"
            className="fill-current"
          />
          LIVE
        </div>
        <p className="text-sm text-neutral-800 leading-relaxed mb-5">
          {SAMPLE_CONTENT}
        </p>
        <div className="flex gap-2 flex-wrap max-sm:flex-col">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-black text-white border-2 border-black cursor-pointer transition-all duration-150 hover:bg-neutral-800 hover:border-neutral-800 max-sm:justify-center"
            onClick={() => copy()}
          >
            <Copy
              width="16"
              height="16"
              overflow="visible"
              className="fill-current"
            />
            Copy prompt
          </button>
          {providers.map((p) => (
            <button
              key={p.id}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-white text-black border-2 border-black cursor-pointer transition-all duration-150 hover:bg-black hover:text-white max-sm:justify-center"
              onClick={() => openIn(p.id)}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>
      </div>
      <CodeBlock label="React">{`
import { usePrompt } from '@promptthis/react'

const { copy, openIn, providers } = usePrompt({
  content: 'Your content here.',
  role: 'You are a helpful coding assistant.',
  openIn: ['claude', 'chatgpt', 'perplexity'],
})

<button onClick={() => copy()}>Copy prompt</button>
{providers.map((p) => (
  <button key={p.id} onClick={() => openIn(p.id)}>
    {p.icon} {p.name}
  </button>
))}
      `}</CodeBlock>
    </Section>
  );
}

const THEME_DEFAULT_STYLE = {
  "--promptthis-bg": "transparent",
  "--promptthis-text": "black",
  "--promptthis-border": "black",
  "--promptthis-radius": "0px",
  "--promptthis-hover-bg": "black",
  "--promptthis-hover-text": "white",
  "--promptthis-shadow": "none",
  "--promptthis-padding-x": "16px",
  "--promptthis-padding-y": "8px",
} as React.CSSProperties;
const THEME_DEFAULT_POPOVER_STYLE = {
  "--promptthis-popover-bg": "black",
  "--promptthis-popover-border": "black",
  "--promptthis-popover-radius": "0px",
  "--promptthis-popover-shadow": "4px 4px 0 rgba(0,0,0,0.1)",
  "--promptthis-item-text": "white",
  "--promptthis-item-hover-bg": "rgba(255,255,255,0.1)",
} as React.CSSProperties;

const THEME_ROUNDED_STYLE = {
  "--promptthis-bg": "linear-gradient(to right, #8b5cf6, #9333ea)",
  "--promptthis-text": "white",
  "--promptthis-border": "transparent",
  "--promptthis-radius": "9999px",
  "--promptthis-shadow": "0 4px 14px rgba(124,58,237,0.35)",
  "--promptthis-hover-bg": "linear-gradient(to right, #7c3aed, #7e22ce)",
  "--promptthis-hover-text": "white",
  "--promptthis-padding-x": "20px",
  "--promptthis-padding-y": "10px",
} as React.CSSProperties;
const THEME_ROUNDED_POPOVER_STYLE = {
  "--promptthis-popover-bg": "white",
  "--promptthis-popover-border": "#ede9fe",
  "--promptthis-popover-radius": "16px",
  "--promptthis-popover-shadow":
    "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
  "--promptthis-item-text": "#374151",
  "--promptthis-item-hover-bg": "#f5f3ff",
} as React.CSSProperties;

const THEME_MINIMAL_STYLE = {
  "--promptthis-bg": "#f9fafb",
  "--promptthis-text": "#4b5563",
  "--promptthis-border": "#e5e7eb",
  "--promptthis-radius": "6px",
  "--promptthis-shadow": "0 1px 2px rgba(0,0,0,0.04)",
  "--promptthis-hover-bg": "#f3f4f6",
  "--promptthis-hover-text": "#111827",
  "--promptthis-padding-x": "12px",
  "--promptthis-padding-y": "6px",
  "--promptthis-font-size": "13px",
} as React.CSSProperties;
const THEME_MINIMAL_POPOVER_STYLE = {
  "--promptthis-popover-bg": "white",
  "--promptthis-popover-border": "#e5e7eb",
  "--promptthis-popover-radius": "8px",
  "--promptthis-popover-shadow":
    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  "--promptthis-item-text": "#4b5563",
  "--promptthis-item-hover-bg": "#f3f4f6",
} as React.CSSProperties;

const THEME_CYBER_STYLE = {
  "--promptthis-bg": "#0a0a0a",
  "--promptthis-text": "#67e8f9",
  "--promptthis-border": "rgba(6,182,212,0.3)",
  "--promptthis-radius": "8px",
  "--promptthis-shadow":
    "0 0 20px rgba(6,182,212,0.15), inset 0 1px 0 rgba(6,182,212,0.1)",
  "--promptthis-hover-bg": "#0a0a0a",
  "--promptthis-hover-text": "#a5f3fc",
  "--promptthis-padding-x": "16px",
  "--promptthis-padding-y": "8px",
} as React.CSSProperties;
const THEME_CYBER_POPOVER_STYLE = {
  "--promptthis-popover-bg": "#0a0a0a",
  "--promptthis-popover-border": "rgba(6,182,212,0.2)",
  "--promptthis-popover-radius": "12px",
  "--promptthis-popover-shadow":
    "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.08)",
  "--promptthis-item-text": "#d1d5db",
  "--promptthis-item-hover-bg": "rgba(6,182,212,0.1)",
} as React.CSSProperties;

export function ThemingSection() {
  return (
    <Section
      id="theming"
      number="05"
      title="Theming"
      description="Style with CSS custom properties via style and popoverStyle. No !important needed."
    >
      <div data-theming-demo="" className="flex flex-col gap-6">
        <div className="relative border-2 border-black bg-white p-10 max-md:p-6">
          <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
            <Zap
              width="12"
              height="12"
              overflow="visible"
              className="fill-current"
            />
            LIVE
          </div>
          <span className="font-pixel text-[10px] tracking-widest text-neutral-400 uppercase block mb-2">
            Default
          </span>
          <p className="text-sm text-neutral-600 leading-relaxed mb-2">
            Zero configuration. Import the stylesheet and drop in a button.
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Neutral background, subtle border, 8px radius. Inherits your
            page&rsquo;s font and text color. Override anything with CSS custom
            properties.
          </p>
          <PromptButton content={SAMPLE_CONTENT} />
        </div>

        <div className="grid grid-cols-2 gap-0.5 max-sm:grid-cols-1">
          <div className="relative border-2 border-black bg-white p-8 max-md:p-5">
            <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
              <Zap
                width="12"
                height="12"
                overflow="visible"
                className="fill-current"
              />
              LIVE
            </div>
            <span className="font-pixel text-[10px] tracking-widest text-neutral-400 uppercase block mb-4">
              Sharp
            </span>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">
              Sharp corners, inverted hover, dark popover.
            </p>
            <PromptButton
              content={SAMPLE_CONTENT}
              style={THEME_DEFAULT_STYLE}
              popoverStyle={THEME_DEFAULT_POPOVER_STYLE}
            />
          </div>

          <div className="relative bg-linear-to-br from-violet-50 to-purple-50 border border-violet-200 p-8 max-md:p-5">
            <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-violet-600 text-white flex items-center gap-1.5">
              <Zap
                width="12"
                height="12"
                overflow="visible"
                className="fill-current"
              />
              LIVE
            </div>
            <span className="font-pixel text-[10px] tracking-widest text-violet-400 uppercase block mb-4">
              Rounded
            </span>
            <p className="text-sm text-violet-900/70 leading-relaxed mb-5">
              Pill shape, gradient button, soft popover.
            </p>
            <PromptButton
              content={SAMPLE_CONTENT}
              style={THEME_ROUNDED_STYLE}
              popoverStyle={THEME_ROUNDED_POPOVER_STYLE}
            />
          </div>

          <div className="relative bg-white border border-neutral-200 p-8 max-md:p-5">
            <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-neutral-800 text-white flex items-center gap-1.5">
              <Zap
                width="12"
                height="12"
                overflow="visible"
                className="fill-current"
              />
              LIVE
            </div>
            <span className="font-pixel text-[10px] tracking-widest text-neutral-400 uppercase block mb-4">
              Minimal
            </span>
            <p className="text-sm text-neutral-500 leading-relaxed mb-5">
              Clean, quiet, shadcn-inspired.
            </p>
            <PromptButton
              content={SAMPLE_CONTENT}
              style={THEME_MINIMAL_STYLE}
              popoverStyle={THEME_MINIMAL_POPOVER_STYLE}
            />
          </div>

          <div className="relative bg-[#0a0a0a] border border-cyan-500/20 p-8 max-md:p-5">
            <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-cyan-600 text-white flex items-center gap-1.5">
              <Zap
                width="12"
                height="12"
                overflow="visible"
                className="fill-current"
              />
              LIVE
            </div>
            <span className="font-pixel text-[10px] tracking-widest text-cyan-500/60 uppercase block mb-4">
              Cyberpunk
            </span>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              Dark mode, glow, neon accents.
            </p>
            <PromptButton
              content={SAMPLE_CONTENT}
              style={THEME_CYBER_STYLE}
              popoverStyle={THEME_CYBER_POPOVER_STYLE}
            />
          </div>
        </div>
        <CodeBlock label="React">{`
// Use CSS custom properties via style and popoverStyle
<PromptButton
  content="..."
  style={{
    "--promptthis-bg": "transparent",
    "--promptthis-text": "black",
    "--promptthis-border": "black",
    "--promptthis-radius": "0px",
    "--promptthis-hover-bg": "black",
    "--promptthis-hover-text": "white",
  }}
  popoverStyle={{
    "--promptthis-popover-bg": "black",
    "--promptthis-item-text": "white",
    "--promptthis-item-hover-bg": "rgba(255,255,255,0.1)",
  }}
/>
        `}</CodeBlock>
      </div>
    </Section>
  );
}

export function ProviderSection() {
  return (
    <Section
      id="provider"
      number="06"
      title="PromptProvider"
      description="Wrap any subtree with shared defaults. Every nested PromptButton and usePrompt inherits the same role, providers, and configuration."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-8 max-md:p-5">
        <div className="absolute -top-px -right-px font-pixel text-[10px] tracking-widest px-2.5 py-1 bg-black text-white flex items-center gap-1.5">
          <Zap
            width="12"
            height="12"
            overflow="visible"
            className="fill-current"
          />
          LIVE
        </div>
        <PromptProvider
          defaultRole="You are a documentation expert who explains things clearly and concisely."
          openIn={["claude", "perplexity"]}
        >
          <p className="text-sm text-neutral-800 leading-relaxed mb-5">
            {SAMPLE_CONTENT}
          </p>
          <div className="flex gap-2 flex-wrap">
            <PromptButton content={SAMPLE_CONTENT} label="Prompt A" />
            <PromptButton
              content="Multiple buttons can share the same configuration via PromptProvider."
              label="Prompt B"
            />
          </div>
        </PromptProvider>
      </div>
      <CodeBlock label="React">{`
import { PromptProvider, PromptButton } from '@promptthis/react'

<PromptProvider
  defaultRole="You are a documentation expert."
  openIn={['claude', 'perplexity']}
>
  <PromptButton
    content="Inherits defaults from provider."
    label="Prompt A"
  />
  <PromptButton
    content="Same shared configuration."
    label="Prompt B"
  />
</PromptProvider>
      `}</CodeBlock>
    </Section>
  );
}
