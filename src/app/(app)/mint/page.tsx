'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEmotiKey } from '@/lib/hooks/use-emotikey';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GenerativeArt from '@/components/emotikey/generative-art';
import { Loader2, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MintPage() {
  const { currentToken, addMintedToken, setCurrentToken } = useEmotiKey();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentToken?.emotion) {
      router.replace('/create');
    }
  }, [currentToken, router]);

  const handleMint = async () => {
    if (!currentToken) return;

    setIsMinting(true);
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newMintedToken = {
      id: new Date().toISOString(),
      mintedBy: '0xMock...User', // Mock user address
      mintedAt: new Date().toISOString(),
      ...currentToken,
    };
    
    // @ts-ignore
    addMintedToken(newMintedToken);
    
    setIsMinting(false);
    setIsMinted(true);

    toast({
      title: 'Mint Successful!',
      description: `Your emotion "${currentToken.emotion}" is now an EmotiKey.`,
    });

    setTimeout(() => {
        setCurrentToken(null);
        router.push('/gallery');
    }, 2000);
  };
  
  if (!currentToken?.emotion) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-border/50 shadow-2xl shadow-primary/5">
        <CardHeader>
            <CardTitle className="font-headline text-4xl text-center">Your EmotiKey</CardTitle>
            <CardDescription className="text-center font-body text-lg">A unique digital fingerprint of your emotion.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg border bg-background/50">
                <GenerativeArt
                    patternType={currentToken.patternType || 'blobs'}
                    primaryColor={currentToken.primaryColor || 'hsl(259, 21%, 66%)'}
                />
            </div>
            
            <Alert className="bg-background/50">
                <Info className="h-4 w-4" />
                <AlertTitle>Metadata</AlertTitle>
                <AlertDescription>
                    <div className="text-sm space-y-2 mt-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Emotion:</span>
                            <span className="font-bold">{currentToken.emotion}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Primary Color:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs">{currentToken.primaryColor}</span>
                                <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: currentToken.primaryColor }}/>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Pattern:</span>
                            <span className="font-medium capitalize">{currentToken.patternType}</span>
                        </div>
                        <div className="flex flex-col items-start pt-2">
                            <span className="text-muted-foreground">Mood Signature:</span>
                            <span className="font-mono text-xs break-all mt-1">{currentToken.moodSignatureHash}</span>
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
        </CardContent>
        <CardFooter>
            <Button
                className="w-full h-12 text-lg font-bold"
                onClick={handleMint}
                disabled={isMinting || isMinted}
            >
                {isMinting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Minting...
                    </>
                ) : isMinted ? (
                    <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Minted!
                    </>
                ) : (
                    'Mint Emotion Token'
                )}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
