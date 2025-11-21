import { EmotionalToken, StreakData } from './types';

export const mockTokens: EmotionalToken[] = [
  {
    id: '1',
    emotion: 'Grateful',
    primaryColor: 'hsl(45, 100%, 51%)',
    patternType: 'radial bursts',
    moodSignatureHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    mintedBy: '0x123...abc',
    mintedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    emotion: 'Calm',
    primaryColor: 'hsl(180, 50%, 70%)',
    patternType: 'waves',
    moodSignatureHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    mintedBy: '0x456...def',
    mintedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    emotion: 'Inspired',
    primaryColor: 'hsl(300, 70%, 60%)',
    patternType: 'particle rings',
    moodSignatureHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    mintedBy: '0x789...ghi',
    mintedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    emotion: 'Happy',
    primaryColor: 'hsl(60, 100%, 50%)',
    patternType: 'blobs',
    moodSignatureHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    mintedBy: '0xabc...123',
    mintedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    emotion: 'Stressed',
    primaryColor: 'hsl(0, 80%, 55%)',
    patternType: 'waves',
    moodSignatureHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    mintedBy: '0xdef...456',
    mintedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    emotion: 'Curious',
    primaryColor: 'hsl(220, 75%, 65%)',
    patternType: 'particle rings',
    moodSignatureHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    mintedBy: '0xghi...789',
    mintedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockStreakData: StreakData = {
    current: 3,
    longest: 8,
    dates: [
        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // a missing day
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    ]
}

export const communityEmotions = [
    { emotion: 'Happy', count: 120 },
    { emotion: 'Grateful', count: 95 },
    { emotion: 'Stressed', count: 88 },
    { emotion: 'Calm', count: 75 },
    { emotion: 'Inspired', count: 60 },
    { emotion: 'Overwhelmed', count: 55 },
    { emotion: 'Curious', count: 42 },
    { emotion: 'Blessed', count: 30 },
    { emotion: 'Hopeful', count: 70 },
    { emotion: 'Lonely', count: 25 },
];
