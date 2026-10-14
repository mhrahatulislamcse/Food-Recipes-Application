import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  Flame,
  Users,
  ChefHat,
  Check,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Plus,
  Minus,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onEditRecipe?: (recipe: Recipe) => void;
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  recipe,
  onBack,
  isFavorite,
  onToggleFavorite,
  onEditRecipe,
}) => {
  // Portion scaling: baseServings vs currentServings
  const baseServings = recipe.servings || 2;
  const [servings, setServings] = useState(baseServings);

  // Checked ingredients state for grocery/prep tracking
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Active cooking timer state
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);

  // Active tab: 'ingredients' | 'instructions'
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [copiedShare, setCopiedShare] = useState(false);

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const startStepTimer = (stepNum: number, minutes: number) => {
    setActiveTimerStep(stepNum);
    setTimerSeconds(minutes * 60);
    setTimerRunning(true);
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(null);
    setActiveTimerStep(null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleIngredientCheck = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scaleFactor = servings / baseServings;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out this recipe for ${recipe.title} on Foodie! Cooking time: ${recipe.cookingTimeMinutes} mins.`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  // Helper to scale measure string if numeric
  const formatScaledMeasure = (measure: string) => {
    if (scaleFactor === 1) return measure;
    // Look for numbers like "2 tablespoons", "1/2 cup", "4 fillets", "400g"
    const match = measure.match(/^([\d./]+)\s*(.*)$/);
    if (!match) return measure;

    let numVal: number;
    if (match[1].includes('/')) {
      const parts = match[1].split('/');
      numVal = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      numVal = parseFloat(match[1]);
    }

    if (isNaN(numVal)) return measure;
    const scaled = (numVal * scaleFactor).toFixed(1).replace(/\.0$/, '');
    return `${scaled} ${match[2]}`.trim();
  };

  return (
    <div className="min-h-full bg-stone-50 pb-24">
      {/* Hero Image Header with Floating Controls */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-stone-900">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-black/40" />

        {/* Top Action Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-stone-800 shadow-md transition-all active:scale-90 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-stone-800 shadow-md transition-all active:scale-90 cursor-pointer relative"
              aria-label="Share Recipe"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded shadow whitespace-nowrap animate-fade-in">
                  Copied link!
                </span>
              )}
            </button>

            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/85 hover:bg-white text-stone-700'
              }`}
              aria-label="Favorite"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Hero Bottom Badges */}
        <div className="absolute bottom-4 inset-x-5 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-900 shadow-xs">
              {recipe.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-xs text-white/90 border border-white/20">
              {recipe.area} Cuisine
            </span>
            {recipe.isCustom && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Custom Recipe
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-stone-100">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 py-3 border-b border-stone-100 text-center">
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-50/70 border border-amber-100/60">
              <Clock className="w-5 h-5 text-amber-600 mb-1" />
              <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                Cook Time
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                {recipe.cookingTimeMinutes}m
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-orange-50/70 border border-orange-100/60">
              <Flame className="w-5 h-5 text-orange-600 mb-1" />
              <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                Calories
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                {recipe.calories} kcal
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-emerald-50/70 border border-emerald-100/60">
              <Users className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                Portions
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                {servings} ppl
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-blue-50/70 border border-blue-100/60">
              <ChefHat className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                Difficulty
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed mt-4 mb-5">
            {recipe.description}
          </p>

          {/* Servings Adjuster Bar */}
          <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70 mb-6">
            <div>
              <span className="text-xs font-bold text-stone-800 block">
                Adjust Servings
              </span>
              <span className="text-[11px] text-stone-500">
                Ingredient measurements recalculate automatically
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 active:scale-90 transition-all cursor-pointer"
                disabled={servings <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-stone-900 min-w-5 text-center">
                {servings}
              </span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-6 h-6 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-900 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Timer Notification Floating bar if running */}
          <AnimatePresence>
            {timerSeconds !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-2xl bg-amber-500 text-stone-900 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5 text-stone-900" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-800 uppercase tracking-wide block">
                      Cooking Timer {activeTimerStep ? `(Step ${activeTimerStep})` : ''}
                    </span>
                    <span className="text-2xl font-black font-mono tracking-wider">
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTimer}
                    className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-black transition-all cursor-pointer"
                  >
                    {timerRunning ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-2.5 rounded-full bg-white/40 hover:bg-white/60 text-stone-900 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs Selector: Ingredients vs Step-by-Step Instructions */}
          <div className="flex border-b border-stone-200 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'border-amber-500 text-amber-800 bg-amber-50/40 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Ingredients ({recipe.ingredients.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'instructions'
                  ? 'border-amber-500 text-amber-800 bg-amber-50/40 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Instructions ({recipe.instructions.length} Steps)</span>
            </button>
          </div>

          {/* Tab 1: Ingredients Checklist */}
          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2 px-1">
                <span>Tap any ingredient to mark it ready/purchased</span>
                <span>
                  {Object.values(checkedIngredients).filter(Boolean).length} /{' '}
                  {recipe.ingredients.length} ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recipe.ingredients.map((item, index) => {
                  const isChecked = !!checkedIngredients[index];

                  return (
                    <div
                      key={index}
                      onClick={() => toggleIngredientCheck(index)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-200 text-stone-400'
                          : 'bg-stone-50/80 border-stone-200/80 text-stone-800 hover:bg-amber-50/50 hover:border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 text-white'
                              : 'border-2 border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isChecked ? 'line-through text-stone-400' : 'text-stone-800'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                          isChecked
                            ? 'bg-emerald-100 text-emerald-700 line-through opacity-70'
                            : 'bg-white border border-stone-200 text-stone-600 shadow-2xs'
                        }`}
                      >
                        {formatScaledMeasure(item.measure)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Instructions Steps */}
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              {recipe.instructions.map((step) => {
                const hasTimer = typeof step.timerMinutes === 'number' && step.timerMinutes > 0;
                const isCurrentStepTimer =
                  activeTimerStep === step.step && timerSeconds !== null;

                return (
                  <div
                    key={step.step}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-200 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-900 font-bold text-xs flex items-center justify-center shadow-xs">
                          {step.step}
                        </span>
                        <span className="text-xs font-bold text-stone-600 uppercase tracking-wide">
                          Step {step.step}
                        </span>
                      </div>

                      {hasTimer && (
                        <button
                          onClick={() => startStepTimer(step.step, step.timerMinutes!)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                            isCurrentStepTimer
                              ? 'bg-amber-500 text-stone-900 ring-2 ring-amber-300'
                              : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50 hover:text-amber-800'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {isCurrentStepTimer
                              ? `Active: ${formatTimer(timerSeconds)}`
                              : `Start ${step.timerMinutes}m Timer`}
                          </span>
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed pl-9">
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Video or External Link Guide if available */}
          {recipe.youtubeUrl && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Video Tutorial</span>
              </h4>
              <a
                href={recipe.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors"
              >
                <span>Watch Cooking Guide on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Custom Recipe Edit Action if submitted by user */}
          {recipe.isCustom && onEditRecipe && (
            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => onEditRecipe(recipe)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
              >
                Edit My Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailScreen;
