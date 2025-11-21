'use client';

import { EmotionalToken } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import GenerativeArt from './generative-art';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Tag, Calendar, Palette, Fingerprint, User } from 'lucide-react';

interface GalleryCardProps {
  token: EmotionalToken;
}

export default function GalleryCard({ token }: GalleryCardProps) {
  const timeAgo = formatDistanceToNow(new Date(token.mintedAt), { addSuffix: true });

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02, shadow: "lg" }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="overflow-hidden bg-card/60 backdrop-blur-lg border-border/50 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square w-full">
            <GenerativeArt patternType={token.patternType} primaryColor={token.primaryColor} />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-xl font-bold text-foreground">{token.emotion}</h3>
          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
             <Calendar className="h-3 w-3" />
             <span>{timeAgo}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
                <Palette className="h-3 w-3"/>
                <div className="h-3 w-3 rounded-full" style={{backgroundColor: token.primaryColor}} />
                <span className="font-mono">{token.primaryColor}</span>
            </div>
            <div className="flex items-center gap-2">
                <User className="h-3 w-3"/>
                <span className="font-mono">{token.mintedBy}</span>
            </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
