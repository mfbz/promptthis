import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Provider } from "@promptthis/core";

export interface PromptContextValue {
  openIn?: string[];
  defaultRole?: string;
  defaultContext?: string;
  defaultInstruction?: string;
  customProviders?: Provider[];
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
}: PromptProviderProps) {
  const value = useMemo(
    () => ({
      openIn,
      defaultRole,
      defaultContext,
      defaultInstruction,
      customProviders,
    }),
    [openIn, defaultRole, defaultContext, defaultInstruction, customProviders]
  );
  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}

export function usePromptContext(): PromptContextValue {
  return useContext(PromptContext);
}
