import { Sidebar } from "@/components/sidebar";
import {
  HeroBanner,
  GettingStartedSection,
  BasicSection,
  IconOnlySection,
  CustomizedSection,
  HookSection,
  ThemingSection,
  ProviderSection,
} from "@/components/demo-sections";
import { ExternalLink } from "pixelarticons/fonts/react/ExternalLink";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="ml-70 flex-1 min-w-0 max-md:ml-0">
        <div className="md:min-h-[calc(100vh-68px)] md:flex md:flex-col">
          <div className="flex-1 flex flex-col justify-center max-w-[800px] px-12 pb-3 max-md:px-5 max-md:pt-20 max-md:pb-3">
            <header>
              <h1 className="text-[clamp(40px,6vw,72px)] font-bold tracking-tighter leading-none mb-5">
                The share button,
                <br />
                but for AI.
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                Every &ldquo;Ask AI&rdquo; widget puts a chatbot on your site.
                This does the opposite: it sends your content to the
                user&rsquo;s own AI provider, with author-crafted prompts.
              </p>
            </header>
          </div>

          <HeroBanner />
        </div>

        <div className="max-w-[800px] px-12 pt-10 pb-30 max-md:px-5 max-md:pt-8 max-md:pb-20">
          <GettingStartedSection />
          <BasicSection />
          <IconOnlySection />
          <CustomizedSection />
          <HookSection />
          <ThemingSection />
          <ProviderSection />

          <footer className="mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between flex-wrap gap-4 max-md:flex-col max-md:items-start">
            <div className="text-[13px] text-neutral-500">
              Built with <strong className="text-black">PromptThis</strong>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.npmjs.com/package/@promptthis/react"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-black transition-colors"
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
                className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-black transition-colors"
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
