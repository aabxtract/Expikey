'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { PatternType } from '@/lib/types';

interface GenerativeArtProps {
  patternType: PatternType;
  primaryColor: string;
}

const GenerativeArt: React.FC<GenerativeArtProps> = ({ patternType, primaryColor }) => {
  const renderPattern = () => {
    switch (patternType) {
      case 'waves':
        return <WavesPattern color={primaryColor} />;
      case 'blobs':
        return <BlobsPattern color={primaryColor} />;
      case 'particle rings':
        return <ParticleRingsPattern color={primaryColor} />;
      case 'radial bursts':
        return <RadialBurstsPattern color={primaryColor} />;
      default:
        return <BlobsPattern color={primaryColor} />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
        </defs>
        {renderPattern()}
      </svg>
    </div>
  );
};

const WavesPattern: React.FC<{ color: string }> = ({ color }) => (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={i}
          initial={{ d: "M 0 200 Q 100 150, 200 200 T 400 200" }}
          animate={{ d: ["M 0 200 Q 100 150, 200 200 T 400 200", "M 0 200 Q 100 250, 200 200 T 400 200", "M 0 200 Q 100 150, 200 200 T 400 200"]}}
          transition={{ duration: 5 + i * 2, repeat: Infinity, repeatType: "mirror" }}
          stroke={color}
          strokeWidth="3"
          fill="none"
          opacity={0.2 + i * 0.1}
          transform={`translate(0, ${-80 + i * 40})`}
        />
      ))}
    </>
);

const BlobsPattern: React.FC<{ color: string }> = ({ color }) => (
  <g filter="url(#blur)">
    {[...Array(3)].map((_, i) => (
      <motion.ellipse
        key={i}
        cx={200}
        cy={200}
        rx={100 + i * 20}
        ry={120 - i * 15}
        fill={color}
        opacity={0.3}
        animate={{
          cx: [200, 220, 180, 200],
          cy: [200, 180, 220, 200],
          rx: [100 + i * 20, 110 + i * 20, 90 + i * 20, 100 + i * 20],
          ry: [120 - i * 15, 110 - i * 15, 130 - i * 15, 120 - i * 15],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 15 + i * 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
    ))}
  </g>
);


const ParticleRingsPattern: React.FC<{ color: string }> = ({ color }) => (
    <g>
      {[...Array(3)].map((_, i) => (
        <motion.g
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          {[...Array(12)].map((_, j) => (
            <circle
              key={j}
              cx={200 + (80 + i * 40) * Math.cos((j * 30 * Math.PI) / 180)}
              cy={200 + (80 + i * 40) * Math.sin((j * 30 * Math.PI) / 180)}
              r={2 + i}
              fill={color}
              opacity={0.7 - i * 0.2}
            />
          ))}
        </motion.g>
      ))}
    </g>
);

const RadialBurstsPattern: React.FC<{ color: string }> = ({ color }) => (
    <g>
      {[...Array(12)].map((_, i) => (
        <motion.line
          key={i}
          x1={200}
          y1={200}
          x2={200}
          y2={50}
          stroke={color}
          strokeWidth="2"
          transform={`rotate(${i * 30}, 200, 200)`}
          initial={{ strokeDasharray: "150 150", strokeDashoffset: 150 }}
          animate={{ strokeDashoffset: [150, 0, -150] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
        />
      ))}
    </g>
);


export default GenerativeArt;
