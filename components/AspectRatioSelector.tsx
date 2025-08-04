
import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onSelectRatio: (ratio: AspectRatio) => void;
  disabled: boolean;
}

const RATIOS: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];
const ICONS: Record<AspectRatio, React.ReactNode> = {
  '1:1': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,20H4V4H20Z"/></svg>,
  '16:9': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21,4H3A1,1,0,0,0,2,5V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V5A1,1,0,0,0,21,4ZM20,18H4V6H20Z"/></svg>,
  '9:16': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19,2H5A1,1,0,0,0,4,3V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3A1,1,0,0,0,19,2ZM18,20H6V4H18Z"/></svg>,
  '4:3': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21,4H3A1,1,0,0,0,2,5V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V5A1,1,0,0,0,21,4ZM20,18H4V6H20Z" transform="scale(1, 1.33) translate(0, -3)"/></svg>,
  '3:4': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19,2H5A1,1,0,0,0,4,3V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3A1,1,0,0,0,19,2ZM18,20H6V4H18Z" transform="scale(1.33, 1) translate(-4, 0)"/></svg>,
};

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Aspect Ratio
      </label>
      <div className="grid grid-cols-5 gap-2">
        {RATIOS.map((ratio) => (
          <button
            key={ratio}
            type="button"
            onClick={() => onSelectRatio(ratio)}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200
              ${selectedRatio === ratio 
                ? 'bg-purple-600/50 border-purple-500 text-white' 
                : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            title={`Aspect Ratio ${ratio}`}
          >
            {ICONS[ratio]}
            <span className="text-xs mt-1 font-mono">{ratio}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
