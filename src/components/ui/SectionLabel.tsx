import React from 'react';

interface SectionLabelProps {
  label: string;
  hasLine?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  hasLine = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-4 text-champagne/80 tracking-luxury text-xs font-body uppercase ${className}`}>
      <span className="tracking-[0.28em] font-medium text-[11px] text-champagne">{label}</span>
      {hasLine && <span className="inline-block w-8 h-[1px] bg-champagne/30" />}
    </div>
  );
};
