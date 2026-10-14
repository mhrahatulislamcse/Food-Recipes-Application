export interface Ingredient {
  name: string;
  measure: string;
}

export interface InstructionStep {
  step: number;
  instruction: string;
  timerMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  category: string; // e.g. 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian', 'Breakfast', 'Soup'
  area: string; // e.g. 'Italian', 'Mexican', 'Japanese', 'American', 'French', 'Thai'
  cookingTimeMinutes: number;
  prepTimeMinutes: number;
  servings: number;
  calories: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  youtubeUrl?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isCustom?: boolean;
  createdAt?: string;
}

export type CategoryItem = {
  id: string;
  name: string;
  iconName: string;
  imageUrl: string;
};
