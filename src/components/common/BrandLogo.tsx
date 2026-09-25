import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'white';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  variant = 'dark',
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 42 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-700 to-indigo-600 shadow-sm border border-indigo-500/20 text-white shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-3/5 h-3/5 text-white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Envelope fold + energetic payment mark */}
          <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <polyline points="22,7 12,13 2,7" />
          <path d="M12 11v5" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M9.5 13h5" stroke="#F59E0B" strokeWidth="2" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 ring-2 ring-white"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center leading-tight">
          <span className={`font-bold tracking-tight ${textSize} ${variant === 'white' ? 'text-white' : 'text-slate-900'}`}>
            Envelope<span className="text-indigo-600 font-extrabold">Pay</span>
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wide ${variant === 'white' ? 'text-indigo-200' : 'text-slate-500'}`}>
            Seamless Cash, Effortless Life!
          </span>
        )}
      </div>
    </div>
  );
};
