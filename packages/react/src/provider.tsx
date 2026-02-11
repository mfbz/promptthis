import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Provider } from "@promptthis/core";

export interface PromptContextValue {
  openIn?: string[];
  defaultRole?: string;
  defaultContext?: string;
  defaultInstruction?: string;
  customProviders?: Provider[];
  copyLabel?: string;
}

const PromptContext = createContext<PromptContextValue>({});

export interface PromptProviderProps extends PromptContextValue {
  children: ReactNode;
}

export function PromptProvider({
  children,
  openIn,
  defaultRole,
  defaultContext,
  defaultInstruction,
  customProviders,
  copyLabel,
}: PromptProviderProps) {
  const value = useMemo(
    () => ({
      openIn,
      defaultRole,
      defaultContext,
      defaultInstruction,
      customProviders,
      copyLabel,
    }),
    [
      openIn,
      defaultRole,
      defaultContext,
      defaultInstruction,
      customProviders,
      copyLabel,
    ]
  );
  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}

export function usePromptContext(): PromptContextValue {
  return useContext(PromptContext);
}
