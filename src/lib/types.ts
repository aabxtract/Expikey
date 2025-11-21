export type PatternType = 'waves' | 'blobs' | 'particle rings' | 'radial bursts' | string;

export interface EmotionalToken {
  id: string;
  emotion: string;
  primaryColor: string;
  patternType: PatternType;
  moodSignatureHash: string;
  mintedBy: string;
  mintedAt: string;
}

export interface StreakData {
    current: number;
    longest: number;
    dates: Date[];
}
