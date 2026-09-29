import React from 'react';

interface FeatherGeometryProps {
  className?: string;
  variant?: 'wings' | 'peacock-eye' | 'concentric-radiance' | 'ribbed-plume';
  opacity?: number;
}

export const FeatherGeometry: React.FC<FeatherGeometryProps> = ({
  className = '',
  variant = 'peacock-eye',
  opacity = 0.35,
}) => {
  if (variant === 'concentric-radiance') {
    return (
      <svg
        className={`pointer-events-none select-none ${className}`}
        viewBox="0 0 500 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <g stroke="currentColor" strokeWidth="0.8">
          {/* Concentric oval contours */}
          {[120, 160, 200, 240, 290, 350, 420].map((rx, idx) => (
            <ellipse
              key={idx}
              cx="250"
              cy="380"
              rx={rx}
              ry={rx * 1.65}
              strokeDasharray="4 8"
              className="transition-all duration-1000"
              style={{ stroke: 'rgba(191, 167, 140, 0.4)' }}
            />
          ))}
          {/* Subtle vertical center spine */}
          <line x1="250" y1="40" x2="250" y2="720" stroke="rgba(191, 167, 140, 0.5)" strokeWidth="0.75" />
          <circle cx="250" cy="180" r="12" stroke="rgba(191, 167, 140, 0.6)" fill="rgba(74, 53, 67, 0.2)" />
          <circle cx="250" cy="180" r="3" fill="#BFA78C" />
        </g>
      </svg>
    );
  }

  if (variant === 'wings') {
    return (
      <svg
        className={`pointer-events-none select-none ${className}`}
        viewBox="0 0 700 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <g stroke="currentColor" strokeWidth="0.75">
          {/* Left Wing Feather Curves */}
          <path
            d="M350 150 C260 220 180 340 160 520 C140 680 220 800 350 860"
            stroke="rgba(191, 167, 140, 0.5)"
          />
          <path
            d="M350 180 C280 250 210 360 190 510 C180 640 240 760 350 820"
            stroke="rgba(191, 167, 140, 0.35)"
          />
          <path
            d="M350 210 C300 280 240 380 220 500 C210 610 260 710 350 780"
            stroke="rgba(191, 167, 140, 0.25)"
          />

          {/* Right Wing Feather Curves */}
          <path
            d="M350 150 C440 220 520 340 540 520 C560 680 480 800 350 860"
            stroke="rgba(191, 167, 140, 0.5)"
          />
          <path
            d="M350 180 C420 250 490 360 510 510 C520 640 460 760 350 820"
            stroke="rgba(191, 167, 140, 0.35)"
          />
          <path
            d="M350 210 C400 280 460 380 480 500 C490 610 440 710 350 780"
            stroke="rgba(191, 167, 140, 0.25)"
          />

          {/* Parallel Barb Engraved Lines */}
          {[0.25, 0.35, 0.45, 0.55, 0.65, 0.75].map((t, i) => (
            <g key={i}>
              <line
                x1={350}
                y1={200 + t * 500}
                x2={190 + (1 - t) * 60}
                y2={250 + t * 480}
                stroke="rgba(191, 167, 140, 0.18)"
              />
              <line
                x1={350}
                y1={200 + t * 500}
                x2={510 - (1 - t) * 60}
                y2={250 + t * 480}
                stroke="rgba(191, 167, 140, 0.18)"
              />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  // Default: 'peacock-eye'
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 320 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g stroke="currentColor">
        {/* Outer drop ellipse */}
        <path
          d="M160 40 C240 180 290 320 280 440 C270 520 220 570 160 570 C100 570 50 520 40 440 C30 320 80 180 160 40 Z"
          stroke="rgba(191, 167, 140, 0.45)"
          strokeWidth="0.8"
        />
        {/* Inner concentric ovals */}
        <ellipse cx="160" cy="400" rx="90" ry="120" stroke="rgba(191, 167, 140, 0.35)" strokeWidth="0.8" />
        <ellipse cx="160" cy="410" rx="60" ry="80" stroke="rgba(74, 53, 67, 0.5)" strokeWidth="0.8" />
        <ellipse cx="160" cy="420" rx="35" ry="48" stroke="rgba(191, 167, 140, 0.6)" strokeWidth="0.8" fill="rgba(45, 16, 23, 0.2)" />
        <circle cx="160" cy="425" r="8" fill="#BFA78C" opacity="0.8" />
        <circle cx="160" cy="425" r="2" fill="#0B0A0A" />

        {/* Delicate radial rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 160 + Math.cos(rad) * 95;
          const y1 = 400 + Math.sin(rad) * 125;
          const x2 = 160 + Math.cos(rad) * 115;
          const y2 = 400 + Math.sin(rad) * 145;
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(191, 167, 140, 0.2)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
};
