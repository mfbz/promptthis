import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { usePrompt } from "./use-prompt";
import { usePromptContext } from "./provider";
import { SparkleIcon } from "./sparkle-icon";
import { providerIcons, ClipboardIcon } from "./icons";

export interface PromptButtonProps {
  content: string | RefObject<HTMLElement | null>;
  role?: string;
  context?: string;
  instruction?: string;
  openIn?: string[];
  label?: string;
  icon?: ReactNode;
  className?: string;
  popoverClassName?: string;
  onCopy?: (prompt: string) => void;
  onOpen?: (providerId: string) => void;
}

export function PromptButton({
  content,
  role,
  context,
  instruction,
  openIn: openInProp,
  label = "Prompt",
  icon,
  className = "",
  popoverClassName = "",
  onCopy,
  onOpen,
}: PromptButtonProps) {
  const ctx = usePromptContext();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const {
    prompt,
    copy,
    openIn: openInFn,
    providers,
  } = usePrompt({
    content,
    role: role ?? ctx.defaultRole,
    context: context ?? ctx.defaultContext,
    instruction: instruction ?? ctx.defaultInstruction,
    openIn: openInProp ?? ctx.openIn,
    customProviders: ctx.customProviders,
  });

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    await copy();
    setCopied(true);
    setAnnouncement("Prompt copied to clipboard");
    onCopy?.(prompt);
    copyTimerRef.current = setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
      setAnnouncement("");
    }, 500);
  }, [copy, prompt, onCopy]);

  const handleOpenIn = useCallback(
    (providerId: string) => {
      openInFn(providerId);
      onOpen?.(providerId);
      setIsOpen(false);
    },
    [openInFn, onOpen]
  );

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isOpen]);

  // Close on Escape, focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items =
          popoverRef.current?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]'
          );
        if (!items?.length) return;
        e.preventDefault();
        const arr = Array.from(items);
        const idx = arr.indexOf(document.activeElement as HTMLElement);
        const next =
          e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)
            ? idx <= 0
              ? arr.length - 1
              : idx - 1
            : idx >= arr.length - 1
              ? 0
              : idx + 1;
        arr[next].focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen]);

  // Focus first item when popover opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        popoverRef.current
          ?.querySelector<HTMLElement>('[role="menuitem"]')
          ?.focus();
      });
    }
  }, [isOpen]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={triggerRef}
        data-promptthis-trigger=""
        className={className}
        type="button"
        aria-label={`${label} — send to AI`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon || <SparkleIcon />}
        <span>{label}</span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          data-promptthis-popover=""
          className={popoverClassName}
          role="menu"
        >
          <button
            data-promptthis-item=""
            role="menuitem"
            tabIndex={0}
            onClick={handleCopy}
          >
            <span data-promptthis-item-icon="">
              <ClipboardIcon />
            </span>
            <span>{copied ? "✓ Copied!" : "Copy prompt"}</span>
          </button>
          {providers.map((p) => (
            <button
              key={p.id}
              data-promptthis-item=""
              role="menuitem"
              tabIndex={-1}
              onClick={() => handleOpenIn(p.id)}
            >
              <span data-promptthis-item-icon="">
                {(() => {
                  const Icon = providerIcons[p.id];
                  return Icon ? <Icon /> : p.icon;
                })()}
              </span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      )}

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {announcement}
      </div>
    </div>
  );
}
