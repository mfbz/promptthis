import { Sidebar } from "@/components/sidebar";
import {
  SAMPLE_CONTENT,
  GettingStartedSection,
  BasicSection,
  CustomizedSection,
  HookSection,
  ProviderSection,
} from "@/components/demo-sections";
import { ExternalLink } from "pixelarticons/fonts/react/ExternalLink";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="ml-70 flex-1 min-w-0 max-md:ml-0">
        <div className="max-w-[800px] px-12 py-16 pb-30 max-md:px-5 max-md:pt-20 max-md:pb-20">
          <header className="pb-16 border-b border-neutral-200 mb-16">
            <h1 className="font-pixel text-[clamp(40px,6vw,72px)] font-black tracking-tighter leading-none mb-5">
              The share button,
              <br />
              but for AI.
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
              Add a prompt button to any content. Visitors click, pick their AI
              tool, and get a perfectly structured prompt — ready to use. No API
              keys. No backend. No chatbot.
            </p>
            <div className="mt-8 p-6 bg-neutral-50 border border-neutral-200">
              <div className="font-pixel text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                Prompt used in all demos
              </div>
              <div className="text-sm text-neutral-800 leading-relaxed italic">
                &ldquo;{SAMPLE_CONTENT}&rdquo;
              </div>
            </div>
          </header>

          <GettingStartedSection />
          <BasicSection />
          <CustomizedSection />
          <HookSection />
          <ProviderSection />

          <footer className="mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between flex-wrap gap-4 max-md:flex-col max-md:items-start">
            <div className="text-[13px] text-neutral-500">
              Built with{" "}
              <strong className="text-black font-extrabold">PromptThis</strong>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.npmjs.com/package/@promptthis/react"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-neutral-500 font-semibold hover:text-black transition-colors"
              >
                npm
                <ExternalLink
                  width="12"
                  height="12"
                  overflow="visible"
                  className="fill-current"
                />
              </a>
              <a
                href="https://github.com/mfbz/promptthis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-neutral-500 font-semibold hover:text-black transition-colors"
              >
                GitHub
                <ExternalLink
                  width="12"
                  height="12"
                  overflow="visible"
                  className="fill-current"
                />
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
