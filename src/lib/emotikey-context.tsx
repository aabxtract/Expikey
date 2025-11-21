'use client';

import React, { createContext, useState, ReactNode } from 'react';
import type { EmotionalToken, PatternType } from './types';
import { mockTokens } from './mock-data';

interface IEmotiKeyContext {
  currentToken: Partial<EmotionalToken> | null;
  setCurrentToken: (token: Partial<EmotionalToken> | null) => void;
  mintedTokens: EmotionalToken[];
  addMintedToken: (token: EmotionalToken) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const EmotiKeyContext = createContext<IEmotiKeyContext | undefined>(undefined);

export const EmotiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [currentToken, setCurrentToken] = useState<Partial<EmotionalToken> | null>(null);
  const [mintedTokens, setMintedTokens] = useState<EmotionalToken[]>(mockTokens);
  const [isGenerating, setIsGenerating] = useState(false);

  const addMintedToken = (token: EmotionalToken) => {
    setMintedTokens(prevTokens => [token, ...prevTokens]);
  };

  return (
    <EmotiKeyContext.Provider
      value={{
        currentToken,
        setCurrentToken,
        mintedTokens,
        addMintedToken,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </EmotiKeyContext.Provider>
  );
};
