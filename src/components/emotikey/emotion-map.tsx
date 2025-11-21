'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { influenceEmotionMapColor } from '@/ai/flows/influence-emotion-map-color';
import { communityEmotions } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface EmotionBubble {
  id: string;
  emotion: string;
  count: number;
  color: string;
  x: number;
  y: number;
  size: number;
}

const EmotionMap = () => {
  const [bubbles, setBubbles] = useState<EmotionBubble[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchColorsAndCreateBubbles = async () => {
      setIsLoading(true);
      const bubblePromises = communityEmotions.map(async (em, index) => {
        const { color } = await influenceEmotionMapColor({ emotion: em.emotion });
        const size = 30 + Math.sqrt(em.count) * 5;
        return {
          id: `bubble-${index}`,
          emotion: em.emotion,
          count: em.count,
          color,
          x: Math.random() * (dimensions.width - size),
          y: Math.random() * (dimensions.height - size),
          size,
        };
      });
      const newBubbles = await Promise.all(bubblePromises);
      setBubbles(newBubbles);
      setIsLoading(false);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
        fetchColorsAndCreateBubbles();
    }
    
  }, [dimensions]);

  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
      const updateDimensions = () => {
          if (mapRef.current) {
              setDimensions({
                  width: mapRef.current.offsetWidth,
                  height: mapRef.current.offsetHeight
              });
          }
      }
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Community Emotion Map</CardTitle>
            <CardDescription className="font-body">A real-time heatmap of the community's collective feelings.</CardDescription>
        </CardHeader>
        <CardContent>
            <div ref={mapRef} className="relative w-full h-[60vh] rounded-lg border bg-background/50 overflow-hidden">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p className="mt-2">Loading emotional landscape...</p>
                    </div>
                ) : (
                    bubbles.map((bubble) => (
                        <motion.div
                            key={bubble.id}
                            className="absolute rounded-full flex items-center justify-center cursor-pointer group"
                            initial={{
                                x: bubble.x,
                                y: bubble.y,
                                width: bubble.size,
                                height: bubble.size,
                            }}
                            animate={{
                                x: Math.random() * (dimensions.width - bubble.size),
                                y: Math.random() * (dimensions.height - bubble.size),
                            }}
                            transition={{
                                duration: Math.random() * 20 + 20,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                            style={{
                                background: `radial-gradient(circle, ${bubble.color}99 0%, ${bubble.color}00 70%)`,
                            }}
                        >
                            <motion.div
                                className="w-full h-full rounded-full bg-white/10"
                                style={{
                                    backgroundColor: bubble.color,
                                    width: bubble.size * 0.9,
                                    height: bubble.size * 0.9,
                                }}
                            />
                            <div className="absolute text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="font-bold text-white text-shadow-lg" style={{fontSize: `${bubble.size/6}px`}}>{bubble.emotion}</p>
                                <p className="font-semibold text-white/80 text-shadow" style={{fontSize: `${bubble.size/8}px`}}>{bubble.count}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </CardContent>
    </Card>
  );
};

export default EmotionMap;
