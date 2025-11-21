'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateEmotionalTokenPreview } from '@/ai/flows/generate-emotional-token-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useEmotiKey } from '@/lib/hooks/use-emotikey';
import GenerativeArt from '@/components/emotikey/generative-art';

const presetEmotions = ['Happy', 'Stressed', 'Grateful', 'Curious', 'Overwhelmed', 'Blessed'];

export default function CreatePage() {
  const [emotion, setEmotion] = useState('');
  const { setCurrentToken, isGenerating, setIsGenerating } = useEmotiKey();
  const router = useRouter();
  const { toast } = useToast();

  const handleGenerate = async (emotionToGenerate: string) => {
    if (!emotionToGenerate.trim()) {
      toast({
        title: 'Emotion Required',
        description: 'Please enter or select an emotion.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateEmotionalTokenPreview({ emotion: emotionToGenerate });
      setCurrentToken({
        emotion: emotionToGenerate,
        ...result,
      });
      router.push('/mint');
    } catch (error) {
      console.error('Error generating token:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate an emotional token. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handlePresetClick = (preset: string) => {
    setEmotion(preset);
    handleGenerate(preset);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(emotion);
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-8rem)] pt-10">
      <Card className="w-full max-w-lg bg-card/60 backdrop-blur-lg border-border/50 shadow-2xl shadow-primary/5 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl">Express Your Emotion</CardTitle>
          <CardDescription className="font-body text-base pt-2">
            Capture your current feeling and transform it into a unique, generative piece of art on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="How are you feeling right now?"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="text-center text-lg h-12 bg-background/70"
                disabled={isGenerating}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Emotional Token'
              )}
            </Button>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">Or choose a preset:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presetEmotions.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  className="bg-background/70 backdrop-blur-sm"
                  onClick={() => handlePresetClick(preset)}
                  disabled={isGenerating}
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
