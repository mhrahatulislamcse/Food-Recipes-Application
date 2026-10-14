import React from 'react';
import { motion } from 'motion/react';
import {
  Utensils,
  Flame,
  Drumstick,
  Cake,
  Wheat,
  Fish,
  Salad,
  Coffee,
} from 'lucide-react';
import { CATEGORIES } from '../data/recipesData';

interface CategoriesProps {
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
  categoryCounts?: Record<string, number>;
}

// Icon mapper for categories
const iconMap: Record<string, React.ElementType> = {
  Utensils,
  Flame,
  Drumstick,
  Cake,
  Wheat,
  Fish,
  Salad,
  Coffee,
};

export const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
          Categories
        </h2>
        <span className="text-xs text-stone-500 font-medium">
          {CATEGORIES.length} options
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive =
            activeCategory.toLowerCase() === cat.name.toLowerCase();
          const Icon = iconMap[cat.iconName] || Utensils;
          const count = categoryCounts[cat.name.toLowerCase()];

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer transition-all duration-200 outline-none`}
            >
              {/* Circular Avatar / Icon */}
              <div
                className={`relative w-15 h-15 rounded-full p-0.5 transition-all duration-300 ${
                  isActive
                    ? 'ring-3 ring-amber-500 ring-offset-2 ring-offset-stone-50 scale-105'
                    : 'hover:ring-2 hover:ring-amber-300'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-900 shadow-md shadow-amber-300/50'
                      : 'bg-white text-stone-600 shadow-xs border border-amber-100/70 group-hover:bg-amber-50'
                  }`}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isActive ? 'opacity-85' : 'opacity-90 group-hover:opacity-100'
                    }`}
                  />
                  {/* Subtle Icon Badge on Corner */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-xs border border-white ${
                      isActive
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-stone-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <span
                  className={`text-xs font-semibold tracking-tight transition-colors ${
                    isActive
                      ? 'text-amber-800 font-bold'
                      : 'text-stone-600 group-hover:text-stone-900'
                  }`}
                >
                  {cat.name}
                </span>
                {count !== undefined && (
                  <span className="text-[10px] text-stone-400 font-normal">
                    {count} {count === 1 ? 'recipe' : 'recipes'}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
