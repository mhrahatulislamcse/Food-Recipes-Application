import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  children,
  showStatusBar = true,
}) => {
  return (
    <div className="py-6 px-2 flex justify-center items-center min-h-[calc(100vh-65px)] bg-stone-100">
      {/* Phone Outer Chassis */}
      <div className="relative w-full max-w-[420px] h-[850px] max-h-[92vh] bg-stone-900 rounded-[50px] p-3 shadow-2xl border-4 border-stone-800 ring-1 ring-black/20 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
            <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-700/60" />
          </div>
        </div>

        {/* Screen Area */}
        <div className="relative w-full h-full bg-stone-50 rounded-[40px] overflow-hidden flex flex-col">
          {/* iOS Status Bar */}
          {showStatusBar && (
            <div className="h-10 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-stone-800 z-40 bg-transparent select-none">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-stone-800">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none relative">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-5 flex items-center justify-center bg-transparent z-40 pointer-events-none">
            <div className="w-32 h-1 bg-stone-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneSimulator;
