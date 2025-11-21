'use server';

/**
 * @fileOverview Generates a deterministic color palette based on emotion string inputs.
 *
 * - generateDeterministicColorPalette - A function that generates a color palette based on an emotion.
 * - DeterministicColorPaletteInput - The input type for the generateDeterministicColorPalette function.
 * - DeterministicColorPaletteOutput - The return type for the generateDeterministicColorPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {keccak256} from 'viem';

const DeterministicColorPaletteInputSchema = z.object({
  emotion: z.string().describe('The emotion to generate a color palette for.'),
});
export type DeterministicColorPaletteInput = z.infer<
  typeof DeterministicColorPaletteInputSchema
>;

const DeterministicColorPaletteOutputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The primary color in HSL format (e.g., hsl(240, 100%, 50%)).'),
  secondaryColor: z
    .string()
    .describe('The secondary color in HSL format.'),
  tertiaryColor: z
    .string()
    .describe('The tertiary color in HSL format.'),
});
export type DeterministicColorPaletteOutput = z.infer<
  typeof DeterministicColorPaletteOutputSchema
>;

export async function generateDeterministicColorPalette(
  input: DeterministicColorPaletteInput
): Promise<DeterministicColorPaletteOutput> {
  return generateDeterministicColorPaletteFlow(input);
}

const generateDeterministicColorPalettePrompt = ai.definePrompt({
  name: 'generateDeterministicColorPalettePrompt',
  input: {schema: DeterministicColorPaletteInputSchema},
  output: {schema: DeterministicColorPaletteOutputSchema},
  prompt: `You are a color palette generator. Generate a visually appealing color palette (primary, secondary, and tertiary colors) based on the given emotion. Provide the colors in HSL format.

Emotion: {{{emotion}}}`,
});

const generateDeterministicColorPaletteFlow = ai.defineFlow(
  {
    name: 'generateDeterministicColorPaletteFlow',
    inputSchema: DeterministicColorPaletteInputSchema,
    outputSchema: DeterministicColorPaletteOutputSchema,
  },
  async input => {
    // Generate a hash from the emotion string
    const emotionHash = keccak256(Buffer.from(input.emotion));

    // Use the hash to derive HSL values deterministically
    const hue = parseInt(emotionHash.slice(2, 4), 16) % 360; // First two hex characters for hue
    const saturation = parseInt(emotionHash.slice(4, 6), 16) % 100; // Next two for saturation
    const lightness = parseInt(emotionHash.slice(6, 8), 16) % 100; // And the next for lightness

    // Create the primary color
    const primaryColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Generate secondary and tertiary colors by slightly shifting the hue
    const secondaryHue = (hue + 30) % 360;
    const tertiaryHue = (hue + 60) % 360;
    const secondaryColor = `hsl(${secondaryHue}, ${saturation}%, ${lightness}%)`;
    const tertiaryColor = `hsl(${tertiaryHue}, ${saturation}%, ${lightness}%)`;

    //const {output} = await generateDeterministicColorPalettePrompt(input);
    //return output!;

    return {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      tertiaryColor: tertiaryColor,
    };
  }
);
