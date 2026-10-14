import React from 'react';
import { ChefHat, Smartphone, Monitor, RotateCcw } from 'lucide-react';

interface HeaderBarProps {
  viewMode: 'mobile' | 'desktop';
  onToggleViewMode: (mode: 'mobile' | 'desktop') => void;
  onReplayWelcome: () => void;
  onResetData: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  viewMode,
  onToggleViewMode,
  onReplayWelcome,
  onResetData,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-2.5 shadow-2xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-xs">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-stone-900 font-serif">
                Foodie!
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                React Native Lab
              </span>
            </div>
            <p className="text-[10px] text-stone-500 hidden sm:block">
              Your Food Recipe Application
            </p>
          </div>
        </div>

        {/* Viewport & Controls */}
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Preview in Mobile Phone Frame (React Native style)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Frame</span>
            </button>
            <button
              onClick={() => onToggleViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Preview in Wide Screen"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Screen</span>
            </button>
          </div>

          {/* Replay Welcome Screen */}
          <button
            onClick={onReplayWelcome}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 flex items-center gap-1 transition-all cursor-pointer"
            title="Replay Welcome Screen with Expanding Rings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay Welcome</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
