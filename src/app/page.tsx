'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import BackgroundParticles from '@/components/emotikey/background-particles';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <BackgroundParticles />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
        <div className="z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary animate-fade-in-down">
            EmotiKey
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-body text-foreground/80 animate-fade-in-up delay-200">
            Mint your feelings into generative on-chain art.
          </p>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg font-body text-muted-foreground animate-fade-in-up delay-300">
            Transform human emotion into a unique generative NFT. Each feeling becomes a distinct piece of art, shaped by its unique emotional signature, color palette, and pattern.
          </p>
          <Button
            size="lg"
            className="mt-8 h-14 px-8 text-lg font-bold animate-fade-in-up delay-500 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300"
            onClick={() => router.push('/create')}
          >
            Launch App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
