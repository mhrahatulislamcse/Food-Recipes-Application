import React from 'react';
import { Clock, Flame, Heart, Star, Sparkles, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe } from '../types/recipe';

interface RecipesListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipeId: string, e?: React.MouseEvent) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  onClearFilters?: () => void;
}

export const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  isLoading = false,
  emptyMessage = 'No recipes found matching your criteria.',
  onClearFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-3 shadow-xs border border-amber-100/60 animate-pulse space-y-3"
          >
            <div className="w-full h-48 bg-amber-100/70 rounded-2xl" />
            <div className="h-5 bg-amber-100/70 rounded-md w-3/4" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 bg-amber-100/60 rounded-md w-1/3" />
              <div className="h-4 bg-amber-100/60 rounded-md w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-16 px-4 bg-amber-50/60 rounded-3xl border border-dashed border-amber-200 my-4"
      >
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 shadow-xs">
          <ChefHat className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-stone-800 mb-1">No Recipes Found</h3>
        <p className="text-sm text-stone-500 max-w-sm mb-5">{emptyMessage}</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Show All Recipes
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-2">
      {recipes.map((recipe, index) => {
        const isFav = favorites.includes(recipe.id);

        return (
          <motion.article
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.4) }}
            whileHover={{ y: -4 }}
            onClick={() => onSelectRecipe(recipe)}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-amber-100/80 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Image Container with Badges */}
            <div className="relative w-full aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Gradient Overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

              {/* Top Row: Category tag and Favorite Button */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-stone-800 shadow-xs border border-white/40 flex items-center gap-1">
                  <span>{recipe.category}</span>
                  {recipe.isCustom && (
                    <span className="flex items-center text-amber-600 font-bold text-[10px] ml-1">
                      <Sparkles className="w-2.5 h-2.5 mr-0.5" /> My Creation
                    </span>
                  )}
                </span>

                <button
                  type="button"
                  aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe.id, e);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-85 shadow-sm cursor-pointer ${
                    isFav
                      ? 'bg-rose-500 text-white shadow-rose-200'
                      : 'bg-white/90 text-stone-600 hover:text-rose-500 hover:bg-white'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFav ? 'fill-current scale-110' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Bottom on-image badges: Estimated Cooking Time & Area/Rating */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-medium">
                {/* Estimated Cooking Time badge */}
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-white">
                    {recipe.cookingTimeMinutes} mins
                  </span>
                </div>

                {/* Rating or Cuisine */}
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">
                    {recipe.rating ?? 4.8}
                  </span>
                  {recipe.reviewCount && (
                    <span className="text-white/70 text-[10px]">
                      ({recipe.reviewCount})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium mb-1.5 uppercase tracking-wider">
                  <span>{recipe.area} Cuisine</span>
                  <span>•</span>
                  <span>{recipe.servings} Servings</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {recipe.title}
                </h3>

                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              {/* Footer info: Calories & Difficulty */}
              <div className="mt-3 pt-3 border-t border-amber-50 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-1 font-medium">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>{recipe.calories} kcal</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      recipe.difficulty === 'Easy'
                        ? 'bg-emerald-500'
                        : recipe.difficulty === 'Medium'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  <span className="font-medium text-stone-700">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default RecipesList;
