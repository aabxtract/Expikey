'use client';

import { useContext } from 'react';
import { EmotiKeyContext } from '@/lib/emotikey-context';

export const useEmotiKey = () => {
  const context = useContext(EmotiKeyContext);
  if (context === undefined) {
    throw new Error('useEmotiKey must be used within an EmotiKeyProvider');
  }
  return context;
};
