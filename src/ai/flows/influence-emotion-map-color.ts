'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a color based on the emotion and influence the community emotion map.
 *
 * - `influenceEmotionMapColor`: A function that takes an emotion as input and returns a color hex code.
 * - `InfluenceEmotionMapColorInput`: The input type for the `influenceEmotionMapColor` function.
 * - `InfluenceEmotionMapColorOutput`: The return type for the `influenceEmotionMapColor` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {keccak256} from 'viem';

const InfluenceEmotionMapColorInputSchema = z.object({
  emotion: z.string().describe('The emotion to generate a color for.'),
});
export type InfluenceEmotionMapColorInput = z.infer<typeof InfluenceEmotionMapColorInputSchema>;

const InfluenceEmotionMapColorOutputSchema = z.object({
  color: z.string().describe('The generated color hex code.'),
});
export type InfluenceEmotionMapColorOutput = z.infer<typeof InfluenceEmotionMapColorOutputSchema>;

export async function influenceEmotionMapColor(
  input: InfluenceEmotionMapColorInput
): Promise<InfluenceEmotionMapColorOutput> {
  return influenceEmotionMapColorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'influenceEmotionMapColorPrompt',
  input: {schema: InfluenceEmotionMapColorInputSchema},
  output: {schema: InfluenceEmotionMapColorOutputSchema},
  prompt: `You are an AI assistant designed to generate a color hex code based on the emotion provided. The color should reflect the feeling of the emotion. Respond ONLY with the color hex code.

Emotion: {{{emotion}}}`,
});

const influenceEmotionMapColorFlow = ai.defineFlow(
  {
    name: 'influenceEmotionMapColorFlow',
    inputSchema: InfluenceEmotionMapColorInputSchema,
    outputSchema: InfluenceEmotionMapColorOutputSchema,
  },
  async input => {
    // Deterministic color generation using keccak256 hash
    const hash = keccak256(Buffer.from(input.emotion)).substring(2, 8);
    const color = `#${hash}`;
    // const {output} = await prompt(input);
    return {color};
  }
);
