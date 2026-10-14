import React, { useState, useMemo } from 'react';
import { Heart, Search, X, Sparkles } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipesList } from '../components/RecipesList';

interface FavoriteScreenProps {
  recipes: Recipe[];
  favorites: string[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string, e?: React.MouseEvent) => void;
  onNavigateHome: () => void;
}

export const FavoriteScreen: React.FC<FavoriteScreenProps> = ({
  recipes,
  favorites,
  onSelectRecipe,
  onToggleFavorite,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get only favorite recipes
  const favoriteRecipes = useMemo(() => {
    const favSet = new Set(favorites);
    return recipes.filter((r) => favSet.has(r.id));
  }, [recipes, favorites]);

  // Filter with search
  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favoriteRecipes;
    const q = searchQuery.toLowerCase();
    return favoriteRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q)
    );
  }, [favoriteRecipes, searchQuery]);

  return (
    <div className="space-y-6 pb-20 px-4 sm:px-6 pt-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full w-fit mb-1">
            <Heart className="w-3 h-3 fill-rose-600" />
            <span>Saved Delights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Favorite Recipes ❤️
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'recipe' : 'recipes'} saved to your collection
          </p>
        </div>
      </div>

      {/* Search inside favorites if there are favorites */}
      {favoriteRecipes.length > 0 && (
        <div className="relative flex items-center">
          <div className="absolute left-4 text-stone-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within your saved recipes..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-stone-200/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 text-stone-800 placeholder-stone-400 text-sm font-medium shadow-2xs outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Recipes List Grid */}
      <RecipesList
        recipes={filteredFavorites}
        onSelectRecipe={onSelectRecipe}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onClearFilters={onNavigateHome}
        emptyMessage={
          searchQuery
            ? `No saved recipes matching "${searchQuery}".`
            : "You haven't saved any favorites yet! Tap the heart icon on any recipe to add it here."
        }
      />
    </div>
  );
};

export default FavoriteScreen;
