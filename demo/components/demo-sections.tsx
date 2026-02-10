"use client";

import { useRef } from "react";
import { PromptButton, usePrompt, PromptProvider } from "@promptthis/react";
import { Section } from "@/components/section";
import { CodeBlock } from "@/components/code-block";
import { Zap } from "pixelarticons/fonts/react/Zap";
import { Copy } from "pixelarticons/fonts/react/Copy";

const SAMPLE_CONTENT = `PromptThis is a drop-in widget that adds prompt sharing to any content. No API keys, no backend, no chatbot widget. The user's own AI tool, with author-crafted prompts. Install the React package and add a PromptButton to any piece of content on your site.`;

export { SAMPLE_CONTENT };

export function GettingStartedSection() {
  return (
    <Section
      id="getting-started"
      number="00"
      title="Getting Started"
      description="Three steps to add AI prompt sharing to your site."
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 max-md:flex-col max-md:gap-2">
          <div className="shrink-0 w-8 h-8 bg-black text-white font-pixel text-sm font-bold flex items-center justify-center">
            1
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold mb-2">Install the package</h3>
            <CodeBlock label="Terminal">{`npm install @promptthis/react`}</CodeBlock>
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col max-md:gap-2">
          <div className="shrink-0 w-8 h-8 bg-black text-white font-pixel text-sm font-bold flex items-center justify-center">
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
          <div className="shrink-0 w-8 h-8 bg-black text-white font-pixel text-sm font-bold flex items-center justify-center">
            3
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold mb-2">Try it live</h3>
            <p className="text-sm text-neutral-600 mb-2">
              Click the button below. Pick an AI tool. Done.
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
      description="Pass a string to content. The button shows all four providers by default — Claude, ChatGPT, Gemini, and Perplexity."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-0.5 max-md:p-5">
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

export function CustomizedSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="customized"
      number="02"
      title="Customized Prompts"
      description="Use a ref to extract content from the DOM. Add role, context, and instruction to shape the prompt. Filter providers with openIn."
    >
      <div
        className="relative p-8 border-2 border-black bg-white mb-0.5 max-md:p-5"
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
    openIn: ["claude", "chatgpt", "gemini"],
  });

  return (
    <Section
      id="hook"
      number="03"
      title="usePrompt Hook"
      description="Build a fully custom UI. The hook returns the assembled prompt, copy and openIn functions, and the filtered provider list."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-0.5 max-md:p-5">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-black text-white border-2 border-black cursor-pointer transition-all duration-150 hover:bg-neutral-800 hover:border-neutral-800 max-sm:justify-center"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-white text-black border-2 border-black cursor-pointer transition-all duration-150 hover:bg-black hover:text-white max-sm:justify-center"
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
  openIn: ['claude', 'chatgpt', 'gemini'],
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

export function ProviderSection() {
  return (
    <Section
      id="provider"
      number="04"
      title="PromptProvider"
      description="Wrap any subtree with shared defaults. All nested PromptButton and usePrompt instances inherit role, providers, and other settings."
    >
      <div className="relative p-8 border-2 border-black bg-white mb-0.5 max-md:p-5">
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
          openIn={["claude", "gemini"]}
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
  openIn={['claude', 'gemini']}
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
