import React from 'react';
import { Home, Heart, BookOpen, Plus } from 'lucide-react';

export type ScreenTab = 'home' | 'favorites' | 'my-recipes' | 'create';

interface BottomNavigationProps {
  currentTab: ScreenTab;
  onChangeTab: (tab: ScreenTab) => void;
  favoritesCount: number;
  myRecipesCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onChangeTab,
  favoritesCount,
  myRecipesCount,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-2 z-40 max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-full"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-amber-800 font-bold'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              currentTab === 'home' ? 'bg-amber-100' : ''
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px]">Home</span>
        </button>

        {/* Favorites */}
        <button
          onClick={() => onChangeTab('favorites')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
            currentTab === 'favorites'
              ? 'text-rose-600 font-bold'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all relative ${
              currentTab === 'favorites' ? 'bg-rose-100' : ''
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                currentTab === 'favorites' ? 'fill-current' : ''
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">Favorites</span>
        </button>

        {/* Floating Center: Add Recipe */}
        <button
          onClick={() => onChangeTab('create')}
          className="flex flex-col items-center -mt-5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500 group-hover:bg-amber-600 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-400/50 group-active:scale-90 transition-all border-4 border-white">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-bold text-stone-700 mt-0.5">
            Create
          </span>
        </button>

        {/* My Recipes */}
        <button
          onClick={() => onChangeTab('my-recipes')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
            currentTab === 'my-recipes'
              ? 'text-amber-800 font-bold'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all relative ${
              currentTab === 'my-recipes' ? 'bg-amber-100' : ''
            }`}
          >
            <BookOpen className="w-5 h-5" />
            {myRecipesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-amber-600 text-white text-[9px] font-bold flex items-center justify-center">
                {myRecipesCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">My Recipes</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
