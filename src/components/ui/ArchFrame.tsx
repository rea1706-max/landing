import React from 'react';

export type ArchVariant = 'narrow' | 'wide' | 'tall' | 'cropped' | 'double' | 'pill';

interface ArchFrameProps {
  children?: React.ReactNode;
  variant?: ArchVariant;
  className?: string;
  borderColor?: string;
  hasRibbing?: boolean;
  hasInnerShadow?: boolean;
  hasGlow?: boolean;
  style?: React.CSSProperties;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  children,
  variant = 'tall',
  className = '',
  borderColor = 'rgba(191, 167, 140, 0.25)',
  hasRibbing = false,
  hasInnerShadow = true,
  hasGlow = false,
  style,
}) => {
  const getProportions = () => {
    switch (variant) {
      case 'narrow':
        return 'w-36 md:w-56 h-[380px] md:h-[520px] rounded-t-[112px] md:rounded-t-[140px]';
      case 'wide':
        return 'w-64 md:w-96 h-[400px] md:h-[600px] rounded-t-[192px] md:rounded-t-[250px]';
      case 'tall':
        return 'w-48 md:w-72 h-[460px] md:h-[640px] rounded-t-[144px] md:rounded-t-[180px]';
      case 'cropped':
        return 'w-72 md:w-[480px] h-[550px] md:h-[750px] rounded-t-[240px] md:rounded-t-[300px] -translate-y-12';
      case 'pill':
        return 'w-44 md:w-64 h-[440px] md:h-[600px] rounded-[9999px]';
      case 'double':
        return 'w-56 md:w-80 h-[480px] md:h-[660px] rounded-t-[160px] md:rounded-t-[200px]';
      default:
        return 'w-52 md:w-72 h-[450px] md:h-[620px] rounded-t-[150px] md:rounded-t-[180px]';
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-700 ${getProportions()} ${className}`}
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow: hasInnerShadow
          ? 'inset 0 0 40px rgba(11, 10, 10, 0.8), 0 20px 50px rgba(0, 0, 0, 0.5)'
          : undefined,
        ...style,
      }}
    >
      {/* Optional Outer/Inner Glow */}
      {hasGlow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 50% 25%, rgba(191, 167, 140, 0.25) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Fluted Vertical Ribbed Overlay */}
      {hasRibbing && (
        <div className="absolute inset-0 pointer-events-none fluted-ribs opacity-60 z-10" />
      )}

      {/* Double Arch Nested Inner Border if variant is double */}
      {variant === 'double' && (
        <div
          className="absolute inset-3 rounded-t-[148px] md:rounded-t-[188px] pointer-events-none z-10"
          style={{ border: '1px solid rgba(191, 167, 140, 0.15)' }}
        />
      )}

      {/* Content */}
      <div className="relative w-full h-full z-0">{children}</div>

      {/* Subtle bottom fade to seamlessly integrate into dark floor */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0B0A0A] to-transparent pointer-events-none z-10" />
    </div>
  );
};
