import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigateHome: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateHome,
}) => {
  // Shared animation stages matching ring1padding and ring2padding spring logic
  const [ring1Active, setRing1Active] = useState(false);
  const [ring2Active, setRing2Active] = useState(false);

  useEffect(() => {
    // Ring 1 spring animation starts after 100ms
    const timer1 = setTimeout(() => {
      setRing1Active(true);
    }, 100);

    // Ring 2 spring animation starts after 300ms
    const timer2 = setTimeout(() => {
      setRing2Active(true);
    }, 300);

    // Auto navigate after 2500ms (2.5s) as described in prompt
    const navTimer = setTimeout(() => {
      onNavigateHome();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(navTimer);
    };
  }, [onNavigateHome]);

  return (
    <div
      className="relative w-full h-full min-h-[580px] flex flex-col items-center justify-between py-12 px-6 select-none overflow-hidden"
      style={{ backgroundColor: '#FBBF24' }}
    >
      {/* Background ambient subtle warm glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-600/10 blur-2xl pointer-events-none" />

      {/* Top status indicator / Skip button */}
      <div className="w-full flex justify-end z-10">
        <button
          onClick={onNavigateHome}
          className="text-xs font-semibold text-white/90 hover:text-white px-3 py-1.5 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xs flex items-center gap-1 transition-all cursor-pointer"
        >
          Skip <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Animated Rings & Logo Section */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Outer Ring (ring2) */}
        <motion.div
          initial={{ padding: '0px' }}
          animate={{ padding: ring2Active ? '36px' : '0px' }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 14,
            mass: 1.2,
          }}
          className="rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          {/* Inner Ring (ring1) */}
          <motion.div
            initial={{ padding: '0px' }}
            animate={{ padding: ring1Active ? '28px' : '0px' }}
            transition={{
              type: 'spring',
              stiffness: 110,
              damping: 12,
              mass: 1,
            }}
            className="rounded-full flex items-center justify-center shadow-lg shadow-amber-600/20"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
          >
            {/* Logo Image / Icon */}
            <motion.div
              initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center p-3 shadow-2xl relative overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                alt="Foodie Logo"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-amber-500/15 rounded-full flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-amber-700 drop-shadow-sm opacity-90" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text Section: Foodie! & your food recipe app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8 space-y-1"
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-widest drop-shadow-xs"
            style={{ fontFamily: "'Playfair Display', serif, system-ui" }}
          >
            Foodie!
          </h1>
          <p className="text-white/95 text-sm sm:text-base font-semibold tracking-wider uppercase">
            your food recipe app
          </p>
          <p className="text-white/80 text-xs tracking-normal font-medium pt-1">
            Food is always right • Stay at home, cook good food
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA / progress indicator */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 z-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNavigateHome}
          className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Explore Delicious Recipes</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </motion.button>
        <span className="text-[11px] text-white/75 font-medium animate-pulse">
          Starting your culinary journey...
        </span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
