import React from 'react';
import { Plus, Edit2, Trash2, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipesList } from '../components/RecipesList';

interface MyRecipeScreenProps {
  customRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipeId: string, e?: React.MouseEvent) => void;
  onNavigateToCreate: () => void;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
}

export const MyRecipeScreen: React.FC<MyRecipeScreenProps> = ({
  customRecipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onNavigateToCreate,
  onEditRecipe,
  onDeleteRecipe,
}) => {
  return (
    <div className="space-y-6 pb-20 px-4 sm:px-6 pt-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full w-fit mb-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>My Kitchen Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            My Recipes 👨‍🍳
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            Recipes you have crafted and submitted
          </p>
        </div>

        <button
          onClick={onNavigateToCreate}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Recipe</span>
        </button>
      </div>

      {/* If there are custom recipes, show custom actions list or grid */}
      {customRecipes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{customRecipes.length} custom creations</span>
            <span>Click any recipe to view or use the quick buttons below</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div
                  className="flex gap-4 cursor-pointer"
                  onClick={() => onSelectRecipe(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-24 h-24 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      {recipe.category} • {recipe.area}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 truncate mt-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-stone-600">
                      <span>⏱ {recipe.cookingTimeMinutes}m</span>
                      <span>👥 {recipe.servings} servings</span>
                      <span>🔥 {recipe.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-stone-100">
                  <button
                    onClick={() => onEditRecipe(recipe)}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
                        onDeleteRecipe(recipe.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-stone-200">
          <div className="w-16 h-16 rounded-full bg-amber-100/70 text-amber-700 flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            No Custom Recipes Yet
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mb-6">
            Have a family secret recipe or your own specialty? Submit your recipe to keep it in your personal recipe book!
          </p>
          <button
            onClick={onNavigateToCreate}
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Your First Recipe</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRecipeScreen;
