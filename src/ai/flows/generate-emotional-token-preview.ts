'use server';

/**
 * @fileOverview Generates a preview of an emotional token based on user input.
 *
 * This file exports:
 * - `generateEmotionalTokenPreview`: A function that takes an emotion as input and returns a token preview.
 * - `GenerateEmotionalTokenPreviewInput`: The input type for the `generateEmotionalTokenPreview` function.
 * - `GenerateEmotionalTokenPreviewOutput`: The output type for the `generateEmotionalTokenPreview` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import crypto from 'crypto';

const GenerateEmotionalTokenPreviewInputSchema = z.object({
  emotion: z.string().describe('The emotion to be converted into a token.'),
});
export type GenerateEmotionalTokenPreviewInput = z.infer<typeof GenerateEmotionalTokenPreviewInputSchema>;

const GenerateEmotionalTokenPreviewOutputSchema = z.object({
  primaryColor: z.string().describe('The primary color associated with the emotion (HSL format).'),
  patternType: z.string().describe('The type of pattern generated (e.g., waves, blobs, particle rings).'),
  moodSignatureHash: z.string().describe('A unique hash representing the emotional state.'),
});
export type GenerateEmotionalTokenPreviewOutput = z.infer<typeof GenerateEmotionalTokenPreviewOutputSchema>;

export async function generateEmotionalTokenPreview(
  input: GenerateEmotionalTokenPreviewInput
): Promise<GenerateEmotionalTokenPreviewOutput> {
  return generateEmotionalTokenPreviewFlow(input);
}

const generateEmotionalTokenPreviewFlow = ai.defineFlow(
  {
    name: 'generateEmotionalTokenPreviewFlow',
    inputSchema: GenerateEmotionalTokenPreviewInputSchema,
    outputSchema: GenerateEmotionalTokenPreviewOutputSchema,
  },
  async input => {
    const emotionHash = crypto.createHash('md5').update(input.emotion).digest('hex');
    const hue = parseInt(emotionHash.substring(0, 2), 16) * (360 / 255); // Map hash to hue (0-360)
    const saturation = parseInt(emotionHash.substring(2, 4), 16) % 50 + 50; // Saturation (50-100)
    const lightness = parseInt(emotionHash.substring(4, 6), 16) % 40 + 30; // Lightness (30-70)
    const primaryColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Determine pattern type based on hash
    const patternTypes = ['waves', 'blobs', 'particle rings', 'radial bursts'];
    const patternIndex = parseInt(emotionHash.substring(6, 8), 16) % patternTypes.length;
    const patternType = patternTypes[patternIndex];

    // Generate mood signature hash
    const timestamp = Date.now();
    const sender = 'EmotiKeyApp'; // Placeholder - in real app, use wallet address
    const moodSignatureHash = crypto
      .createHash('sha256')
      .update(input.emotion + timestamp + sender)
      .digest('hex');

    return {
      primaryColor,
      patternType,
      moodSignatureHash,
    };
  }
);
