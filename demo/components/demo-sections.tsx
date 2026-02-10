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

const THEME_DEFAULT_TRIGGER =
  "inline-flex items-center !gap-1.5 !px-4 !py-2 !text-sm !font-bold !text-black !bg-transparent !border-2 !border-black !rounded-none !opacity-100 !transition-none !transform-none cursor-pointer hover:!bg-black hover:!text-white";
const THEME_DEFAULT_POPOVER =
  "!bg-black !border-2 !border-black !rounded-none !shadow-[4px_4px_0_rgba(0,0,0,0.1)] [&_[data-promptthis-item]]:!text-white [&_[data-promptthis-item]]:!font-semibold [&_[data-promptthis-item]]:!px-4 [&_[data-promptthis-item]]:!py-3 [&_[data-promptthis-item]:hover]:!bg-white/10 [&_[data-promptthis-item]:focus-visible]:!bg-white/10";

const THEME_ROUNDED_TRIGGER =
  "inline-flex items-center !gap-1.5 !px-5 !py-2.5 !text-sm !font-semibold !text-white !bg-linear-to-r !from-violet-500 !to-purple-600 !border-0 !rounded-full !opacity-100 !transition-none !transform-none cursor-pointer !shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:!from-violet-600 hover:!to-purple-700 hover:!shadow-[0_6px_20px_rgba(124,58,237,0.5)]";
const THEME_ROUNDED_POPOVER =
  "!bg-white !border !border-violet-100 !rounded-2xl !shadow-xl [&_[data-promptthis-item]]:!text-gray-700 [&_[data-promptthis-item]]:!font-medium [&_[data-promptthis-item]]:!rounded-xl [&_[data-promptthis-item]]:!mx-1.5 [&_[data-promptthis-item]]:!my-0.5 [&_[data-promptthis-item]:hover]:!bg-violet-50 [&_[data-promptthis-item]:hover]:!text-violet-700 [&_[data-promptthis-item]:focus-visible]:!bg-violet-50 [&_[data-promptthis-item-icon]]:!text-violet-500";

const THEME_MINIMAL_TRIGGER =
  "inline-flex items-center !gap-1.5 !px-3 !py-1.5 !text-[13px] !font-medium !text-gray-600 !bg-gray-50 !border !border-gray-200 !rounded-md !opacity-100 !transition-none !transform-none cursor-pointer !shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:!bg-gray-100 hover:!border-gray-300 hover:!text-gray-900 [&_svg]:!w-3.5 [&_svg]:!h-3.5 [&_svg]:!text-gray-400";
const THEME_MINIMAL_POPOVER =
  "!bg-white !border !border-gray-200 !rounded-lg !shadow-md !p-1 [&_[data-promptthis-item]]:!text-gray-600 [&_[data-promptthis-item]]:!text-[13px] [&_[data-promptthis-item]]:!font-normal [&_[data-promptthis-item]]:!rounded [&_[data-promptthis-item]]:!px-2.5 [&_[data-promptthis-item]]:!py-2 [&_[data-promptthis-item]:hover]:!bg-gray-100 [&_[data-promptthis-item]:hover]:!text-gray-900 [&_[data-promptthis-item]:focus-visible]:!bg-gray-100 [&_[data-promptthis-item-icon]]:!text-gray-400 [&_[data-promptthis-item-icon]]:!w-4 [&_[data-promptthis-item-icon]]:!text-[13px]";

const THEME_CYBER_TRIGGER =
  "inline-flex items-center !gap-1.5 !px-4 !py-2 !text-sm !font-semibold !text-cyan-300 !bg-[#0a0a0a] !border !border-cyan-500/30 !rounded-lg !opacity-100 !transition-none !transform-none cursor-pointer !shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(6,182,212,0.1)] hover:!border-cyan-500/50 hover:!text-cyan-200 hover:!shadow-[0_0_30px_rgba(6,182,212,0.25),inset_0_1px_0_rgba(6,182,212,0.15)] [&_svg]:!text-cyan-400";
const THEME_CYBER_POPOVER =
  "!bg-[#0a0a0a] !border !border-cyan-500/20 !rounded-xl !shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.08)] [&_[data-promptthis-item]]:!text-gray-300 [&_[data-promptthis-item]]:!font-medium [&_[data-promptthis-item]:hover]:!bg-cyan-500/10 [&_[data-promptthis-item]:hover]:!text-cyan-300 [&_[data-promptthis-item]:focus-visible]:!bg-cyan-500/10 [&_[data-promptthis-item-icon]]:!text-cyan-500";

export function ThemingSection() {
  return (
    <Section
      id="theming"
      number="04"
      title="Theming"
      description="Ships with zero CSS. Style every element — trigger, popover, items, and icons — with className and popoverClassName."
    >
      <div data-theming-demo="" className="flex flex-col gap-6">
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
              Default
            </span>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">
              Sharp corners, inverted hover, dark popover.
            </p>
            <PromptButton
              content={SAMPLE_CONTENT}
              className={THEME_DEFAULT_TRIGGER}
              popoverClassName={THEME_DEFAULT_POPOVER}
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
              className={THEME_ROUNDED_TRIGGER}
              popoverClassName={THEME_ROUNDED_POPOVER}
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
              className={THEME_MINIMAL_TRIGGER}
              popoverClassName={THEME_MINIMAL_POPOVER}
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
              className={THEME_CYBER_TRIGGER}
              popoverClassName={THEME_CYBER_POPOVER}
            />
          </div>
        </div>
        <CodeBlock label="React">{`
// Use ! prefix to override styles.css defaults
<PromptButton
  content="..."
  className="!text-white !font-semibold
    !bg-linear-to-r !from-violet-500 !to-purple-600
    !border-0 !rounded-full !opacity-100
    !shadow-[0_4px_14px_rgba(124,58,237,0.35)]
    hover:!from-violet-600 hover:!to-purple-700"
  popoverClassName="!bg-white !rounded-2xl !shadow-xl
    !border !border-violet-100
    [&_[data-promptthis-item]]:!text-gray-700
    [&_[data-promptthis-item]]:!rounded-xl
    [&_[data-promptthis-item]]:!mx-1.5
    [&_[data-promptthis-item]:hover]:!bg-violet-50
    [&_[data-promptthis-item]:hover]:!text-violet-700
    [&_[data-promptthis-item-icon]]:!text-violet-500"
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
      number="05"
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
