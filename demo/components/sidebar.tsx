"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen } from "pixelarticons/fonts/react/BookOpen";
import { Zap } from "pixelarticons/fonts/react/Zap";
import { Sliders } from "pixelarticons/fonts/react/Sliders";
import { Code } from "pixelarticons/fonts/react/Code";
import { PaintBucket } from "pixelarticons/fonts/react/PaintBucket";
import { Section } from "pixelarticons/fonts/react/Section";
import { Menu } from "pixelarticons/fonts/react/Menu";
import { ExternalLink } from "pixelarticons/fonts/react/ExternalLink";
import { Close } from "pixelarticons/fonts/react/Close";

const NAV_ITEMS = [
  { id: "getting-started", label: "Getting Started", icon: BookOpen },
  { id: "basic", label: "Basic", icon: Zap },
  { id: "customized", label: "Customized", icon: Sliders },
  { id: "hook", label: "usePrompt Hook", icon: Code },
  { id: "theming", label: "Theming", icon: PaintBucket },
  { id: "provider", label: "PromptProvider", icon: Section },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState("getting-started");
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-xl border-b border-neutral-200 z-50 items-center justify-between px-5 hidden max-md:flex">
        <div className="font-pixel text-lg font-black">PromptThis</div>
        <button
          className="flex items-center justify-center w-10 h-10 border border-neutral-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="sidebar-nav"
        >
          {isOpen ? (
            <Close
              width="20"
              height="20"
              overflow="visible"
              className="fill-current"
            />
          ) : (
            <Menu
              width="20"
              height="20"
              overflow="visible"
              className="fill-current"
            />
          )}
        </button>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        id="sidebar-nav"
        aria-label="Navigation sidebar"
        className={`
        fixed top-0 left-0 w-70 h-screen border-r border-neutral-200 flex flex-col py-8 z-50 bg-white overflow-y-auto
        max-md:transition-transform max-md:duration-250 max-md:ease-out
        ${isOpen ? "max-md:translate-x-0 max-md:shadow-xl" : "max-md:-translate-x-full"}
      `}
      >
        <div className="px-6 mb-2">
          <div className="font-pixel text-[22px] font-black tracking-tight">
            PromptThis
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            The share button, but for AI.
          </p>
        </div>

        <nav className="flex-1 py-4" aria-label="Demo sections">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={close}
              className={`
                flex items-center gap-2.5 px-6 py-2.5 text-sm border-l-2 transition-all duration-150
                ${
                  activeId === id
                    ? "text-black font-bold border-l-black bg-neutral-50"
                    : "text-neutral-500 font-medium border-l-transparent hover:text-black hover:bg-neutral-50"
                }
              `}
            >
              <Icon
                width="16"
                height="16"
                overflow="visible"
                className={`shrink-0 fill-current ${activeId === id ? "text-black" : "text-neutral-400"}`}
              />
              {label}
            </a>
          ))}
        </nav>

        <div className="px-6 pt-4 border-t border-neutral-200">
          <a
            href="https://github.com/mfbz/promptthis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] text-neutral-500 font-medium hover:text-black transition-colors"
          >
            GitHub
            <ExternalLink
              width="14"
              height="14"
              overflow="visible"
              className="fill-current"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
