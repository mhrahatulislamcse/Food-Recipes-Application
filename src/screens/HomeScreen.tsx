import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, SlidersHorizontal, Plus } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { Categories } from '../components/Categories';
import { RecipesList } from '../components/RecipesList';

interface HomeScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipeId: string, e?: React.MouseEvent) => void;
  onNavigateToCreate: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onNavigateToCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'quick' | 'easy' | 'high-protein'>('all');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: recipes.length,
    };
    recipes.forEach((r) => {
      const catKey = r.category.toLowerCase();
      counts[catKey] = (counts[catKey] || 0) + 1;
    });
    return counts;
  }, [recipes]);

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Category match
      if (
        selectedCategory.toLowerCase() !== 'all' &&
        recipe.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Filter chips
      if (selectedFilter === 'quick' && recipe.cookingTimeMinutes > 25) {
        return false;
      }
      if (selectedFilter === 'easy' && recipe.difficulty !== 'Easy') {
        return false;
      }
      if (
        selectedFilter === 'high-protein' &&
        !recipe.tags?.some((t) => t.toLowerCase().includes('protein')) &&
        recipe.category !== 'Beef' &&
        recipe.category !== 'Chicken' &&
        recipe.category !== 'Seafood'
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesCuisine = recipe.area.toLowerCase().includes(q);
        const matchesCategory = recipe.category.toLowerCase().includes(q);
        const matchesIngredient = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(q)
        );
        return matchesTitle || matchesCuisine || matchesCategory || matchesIngredient;
      }

      return true;
    });
  }, [recipes, selectedCategory, selectedFilter, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 pb-20 px-4 sm:px-6 pt-4 max-w-6xl mx-auto">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full w-fit mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Welcome back</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Hello, Foodie! 👋
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            Make your own food, stay at home
          </p>
        </div>

        {/* Create Recipe Action button */}
        <button
          onClick={onNavigateToCreate}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Add Recipe</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-stone-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes, ingredients, cuisines..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-stone-200/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-stone-800 placeholder-stone-400 text-sm font-medium shadow-2xs outline-none transition-all"
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

      {/* Categories Horizontal Carousel */}
      <Categories
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-stone-400 font-medium flex items-center gap-1 mr-1 flex-shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
        </span>

        {[
          { id: 'all', label: 'All Dishes' },
          { id: 'quick', label: '⚡ Quick (< 25 min)' },
          { id: 'easy', label: '🌱 Beginner Friendly' },
          { id: 'high-protein', label: '💪 High Protein' },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedFilter(chip.id as any)}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === chip.id
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Recipes Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
            {selectedCategory === 'All' ? 'Popular Recipes' : `${selectedCategory} Recipes`}
          </h2>
          <p className="text-xs text-stone-500">
            Showing {filteredRecipes.length} delicious{' '}
            {filteredRecipes.length === 1 ? 'dish' : 'dishes'}
          </p>
        </div>

        {(selectedCategory !== 'All' || selectedFilter !== 'all' || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Recipe Cards */}
      <RecipesList
        recipes={filteredRecipes}
        onSelectRecipe={onSelectRecipe}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onClearFilters={handleClearFilters}
        emptyMessage={
          searchQuery
            ? `No recipes found matching "${searchQuery}". Try searching for salmon, burger, pasta, or chicken.`
            : `No recipes found in the ${selectedCategory} category.`
        }
      />
    </div>
  );
};

export default HomeScreen;
