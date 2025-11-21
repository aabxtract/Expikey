'use client';

import { useEmotiKey } from '@/lib/hooks/use-emotikey';
import GalleryCard from './gallery-card';
import { AnimatePresence, motion } from 'framer-motion';

export default function GalleryGrid() {
  const { mintedTokens } = useEmotiKey();

  if (mintedTokens.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 rounded-lg border-2 border-dashed bg-card/50">
            <p className="text-2xl font-headline text-muted-foreground">The Gallery is Quiet</p>
            <p className="mt-2 font-body text-muted-foreground">No EmotiKeys have been minted yet.</p>
            <p className="mt-1 font-body text-muted-foreground">Be the first to create one!</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {mintedTokens.map((token, index) => (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GalleryCard token={token} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
