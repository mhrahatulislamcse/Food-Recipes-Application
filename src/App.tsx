/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_RECIPES } from './data/recipesData';
import { Recipe } from './types/recipe';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { FavoriteScreen } from './screens/FavoriteScreen';
import { MyRecipeScreen } from './screens/MyRecipeScreen';
import { RecipesFormScreen } from './screens/RecipesFormScreen';
import { BottomNavigation, ScreenTab } from './components/BottomNavigation';
import { HeaderBar } from './components/HeaderBar';
import { PhoneSimulator } from './components/PhoneSimulator';

const LOCAL_STORAGE_RECIPES_KEY = 'foodie_recipes_v1';
const LOCAL_STORAGE_FAVORITES_KEY = 'foodie_favorites_v1';

export default function App() {
  // Screen stack & current view
  const [currentScreen, setCurrentScreen] = useState<
    'welcome' | 'home' | 'detail' | 'favorites' | 'my-recipes' | 'form'
  >('welcome');

  const [previousScreen, setPreviousScreen] = useState<'home' | 'favorites' | 'my-recipes'>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Viewport mode: 'mobile' (phone simulator) or 'desktop' (wide screen)
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  // Recipes state with localStorage persistence
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECIPES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_RECIPES;
  });

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return ['rec-1', 'rec-4']; // default favorites
  });

  // Sync recipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RECIPES_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.error('Failed to save recipes to localStorage', e);
    }
  }, [recipes]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Toggle favorite
  const handleToggleFavorite = (recipeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Navigate to Recipe Detail
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    if (currentScreen === 'home' || currentScreen === 'favorites' || currentScreen === 'my-recipes') {
      setPreviousScreen(currentScreen);
    }
    setCurrentScreen('detail');
  };

  // Back from detail
  const handleBackFromDetail = () => {
    setSelectedRecipe(null);
    setCurrentScreen(previousScreen);
  };

  // Open Form to create new
  const handleNavigateToCreate = () => {
    setEditingRecipe(null);
    setCurrentScreen('form');
  };

  // Open Form to edit
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setCurrentScreen('form');
  };

  // Save Recipe (Create or Update)
  const handleSaveRecipe = (recipeToSave: Recipe) => {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipeToSave.id);
      if (exists) {
        return prev.map((r) => (r.id === recipeToSave.id ? recipeToSave : r));
      } else {
        return [recipeToSave, ...prev];
      }
    });

    // If we were viewing this recipe in detail, update it
    if (selectedRecipe && selectedRecipe.id === recipeToSave.id) {
      setSelectedRecipe(recipeToSave);
      setCurrentScreen('detail');
    } else {
      setCurrentScreen('my-recipes');
    }
    setEditingRecipe(null);
  };

  // Delete Recipe
  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    setFavorites((prev) => prev.filter((id) => id !== recipeId));
    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null);
      setCurrentScreen('my-recipes');
    }
  };

  // Reset demo data
  const handleResetData = () => {
    if (confirm('Reset to initial sample recipes and demo favorites?')) {
      setRecipes(INITIAL_RECIPES);
      setFavorites(['rec-1', 'rec-4']);
      localStorage.removeItem(LOCAL_STORAGE_RECIPES_KEY);
      localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);
    }
  };

  // Tab change handler
  const handleChangeTab = (tab: ScreenTab) => {
    if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'favorites') setCurrentScreen('favorites');
    else if (tab === 'my-recipes') setCurrentScreen('my-recipes');
    else if (tab === 'create') handleNavigateToCreate();
  };

  const customRecipes = recipes.filter((r) => r.isCustom);

  // Determine current active tab
  const activeTab: ScreenTab =
    currentScreen === 'home'
      ? 'home'
      : currentScreen === 'favorites'
      ? 'favorites'
      : currentScreen === 'my-recipes'
      ? 'my-recipes'
      : 'home';

  // Bottom navigation visibility
  const showBottomNav =
    currentScreen === 'home' ||
    currentScreen === 'favorites' ||
    currentScreen === 'my-recipes';

  // Render Screen Content
  const renderScreenContent = () => {
    if (currentScreen === 'welcome') {
      return (
        <WelcomeScreen
          onNavigateHome={() => setCurrentScreen('home')}
        />
      );
    }

    if (currentScreen === 'detail' && selectedRecipe) {
      return (
        <RecipeDetailScreen
          recipe={selectedRecipe}
          onBack={handleBackFromDetail}
          isFavorite={favorites.includes(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
          onEditRecipe={handleEditRecipe}
        />
      );
    }

    if (currentScreen === 'form') {
      return (
        <RecipesFormScreen
          initialRecipe={editingRecipe}
          onSaveRecipe={handleSaveRecipe}
          onCancel={() => {
            setEditingRecipe(null);
            setCurrentScreen(previousScreen);
          }}
        />
      );
    }

    if (currentScreen === 'favorites') {
      return (
        <FavoriteScreen
          recipes={recipes}
          favorites={favorites}
          onSelectRecipe={handleSelectRecipe}
          onToggleFavorite={handleToggleFavorite}
          onNavigateHome={() => setCurrentScreen('home')}
        />
      );
    }

    if (currentScreen === 'my-recipes') {
      return (
        <MyRecipeScreen
          customRecipes={customRecipes}
          onSelectRecipe={handleSelectRecipe}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onNavigateToCreate={handleNavigateToCreate}
          onEditRecipe={handleEditRecipe}
          onDeleteRecipe={handleDeleteRecipe}
        />
      );
    }

    // Default: Home Screen
    return (
      <HomeScreen
        recipes={recipes}
        onSelectRecipe={handleSelectRecipe}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onNavigateToCreate={handleNavigateToCreate}
      />
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900">
      {/* Global Header Bar */}
      <HeaderBar
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onReplayWelcome={() => setCurrentScreen('welcome')}
        onResetData={handleResetData}
      />

      {/* Screen Render: Mobile Simulator Frame vs Wide Responsive View */}
      {viewMode === 'mobile' ? (
        <PhoneSimulator showStatusBar={currentScreen !== 'welcome'}>
          <div className="relative min-h-full flex flex-col">
            <main className="flex-1 pb-16">{renderScreenContent()}</main>

            {showBottomNav && (
              <div className="sticky bottom-0 z-40">
                <BottomNavigation
                  currentTab={activeTab}
                  onChangeTab={handleChangeTab}
                  favoritesCount={favorites.length}
                  myRecipesCount={customRecipes.length}
                />
              </div>
            )}
          </div>
        </PhoneSimulator>
      ) : (
        <div className="flex-1 w-full bg-stone-50 relative pb-16">
          <main className="min-h-[calc(100vh-120px)]">{renderScreenContent()}</main>

          {showBottomNav && (
            <BottomNavigation
              currentTab={activeTab}
              onChangeTab={handleChangeTab}
              favoritesCount={favorites.length}
              myRecipesCount={customRecipes.length}
            />
          )}
        </div>
      )}
    </div>
  );
}
