import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  ChefHat,
  Sparkles,
  Check,
} from 'lucide-react';
import { Recipe, Ingredient, InstructionStep } from '../types/recipe';

interface RecipesFormScreenProps {
  initialRecipe?: Recipe | null;
  onSaveRecipe: (recipe: Recipe) => void;
  onCancel: () => void;
}

const PRESET_IMAGES = [
  {
    name: 'Burger',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pasta',
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Salmon',
    url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Salad',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dessert',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tacos',
    url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pizza',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pancakes',
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
  },
];

export const RecipesFormScreen: React.FC<RecipesFormScreenProps> = ({
  initialRecipe,
  onSaveRecipe,
  onCancel,
}) => {
  const isEditing = !!initialRecipe;

  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [category, setCategory] = useState(initialRecipe?.category || 'Chicken');
  const [area, setArea] = useState(initialRecipe?.area || 'American');
  const [cookingTime, setCookingTime] = useState(initialRecipe?.cookingTimeMinutes || 25);
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTimeMinutes || 15);
  const [servings, setServings] = useState(initialRecipe?.servings || 4);
  const [calories, setCalories] = useState(initialRecipe?.calories || 450);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    initialRecipe?.difficulty || 'Easy'
  );
  const [image, setImage] = useState(
    initialRecipe?.image || PRESET_IMAGES[0].url
  );
  const [description, setDescription] = useState(initialRecipe?.description || '');

  // Ingredients state
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients || [
      { name: 'Olive Oil', measure: '2 tbsp' },
      { name: 'Garlic', measure: '3 cloves' },
      { name: 'Salt & Pepper', measure: 'To taste' },
    ]
  );

  // Instructions state
  const [instructions, setInstructions] = useState<InstructionStep[]>(
    initialRecipe?.instructions || [
      { step: 1, instruction: 'Prep all fresh ingredients and season well.', timerMinutes: 5 },
      { step: 2, instruction: 'Cook over medium-high heat until golden brown.', timerMinutes: 10 },
      { step: 3, instruction: 'Serve warm and enjoy with your favorite side dish!' },
    ]
  );

  const [errorMessage, setErrorMessage] = useState('');

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', measure: '' }]);
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions([
      ...instructions,
      { step: instructions.length + 1, instruction: '', timerMinutes: undefined },
    ]);
  };

  const handleUpdateInstruction = (
    index: number,
    field: 'instruction' | 'timerMinutes',
    value: string | number
  ) => {
    const updated = [...instructions];
    if (field === 'timerMinutes') {
      const num = Number(value);
      updated[index] = {
        ...updated[index],
        timerMinutes: isNaN(num) || num <= 0 ? undefined : num,
      };
    } else {
      updated[index] = { ...updated[index], instruction: String(value) };
    }
    setInstructions(updated);
  };

  const handleRemoveInstruction = (index: number) => {
    if (instructions.length <= 1) return;
    const filtered = instructions.filter((_, i) => i !== index);
    const reindexed = filtered.map((item, idx) => ({ ...item, step: idx + 1 }));
    setInstructions(reindexed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Please provide a recipe title.');
      return;
    }

    if (ingredients.some((ing) => !ing.name.trim())) {
      setErrorMessage('Please ensure all ingredients have a name.');
      return;
    }

    if (instructions.some((inst) => !inst.instruction.trim())) {
      setErrorMessage('Please provide text for all instruction steps.');
      return;
    }

    const newRecipe: Recipe = {
      id: initialRecipe?.id || `custom-${Date.now()}`,
      title: title.trim(),
      category,
      area: area.trim() || 'Global',
      cookingTimeMinutes: Number(cookingTime) || 20,
      prepTimeMinutes: Number(prepTime) || 10,
      servings: Number(servings) || 2,
      calories: Number(calories) || 400,
      difficulty,
      image: image.trim() || PRESET_IMAGES[0].url,
      description: description.trim() || `A delicious homemade ${title} recipe.`,
      ingredients: ingredients.map((ing) => ({
        name: ing.name.trim(),
        measure: ing.measure.trim() || '1 portion',
      })),
      instructions: instructions.map((inst, idx) => ({
        step: idx + 1,
        instruction: inst.instruction.trim(),
        timerMinutes: inst.timerMinutes,
      })),
      rating: initialRecipe?.rating || 5.0,
      reviewCount: initialRecipe?.reviewCount || 1,
      isCustom: true,
      createdAt: initialRecipe?.createdAt || new Date().toISOString(),
    };

    onSaveRecipe(newRecipe);
  };

  return (
    <div className="min-h-full bg-stone-50 pb-24 px-4 sm:px-6 pt-4 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onCancel}
          className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-stone-900">
          {isEditing ? 'Edit Recipe' : 'Submit New Recipe'}
        </h1>
        <div className="w-9" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Basic Information Section */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ChefHat className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-stone-900">General Details</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Recipe Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Crispy Honey Garlic Butter Chicken"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:ring-2 focus:ring-amber-300 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:ring-2 focus:ring-amber-300 focus:border-amber-500 outline-none"
              >
                {['Chicken', 'Beef', 'Pasta', 'Seafood', 'Dessert', 'Vegetarian', 'Breakfast'].map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Cuisine / Origin
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Italian, Mexican, Asian"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:ring-2 focus:ring-amber-300 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief teaser describing the flavor, texture, and aroma..."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:ring-2 focus:ring-amber-300 focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Recipe Photo Selection */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-stone-900">Recipe Photo</h2>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 rounded-2xl object-cover bg-stone-100 border border-stone-200"
            />
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Image URL (or select a preset below)
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-amber-300 outline-none"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-stone-500 block mb-2">
              Quick presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => setImage(preset.url)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    image === preset.url
                      ? 'bg-amber-500 text-stone-900 font-bold ring-2 ring-amber-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cooking Metas: Time, Servings, Calories, Difficulty */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
            Cooking Numbers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Cook Time (mins)
              </label>
              <input
                type="number"
                min={1}
                value={cookingTime}
                onChange={(e) => setCookingTime(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Prep Time (mins)
              </label>
              <input
                type="number"
                min={0}
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Servings
              </label>
              <input
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Calories (kcal)
              </label>
              <input
                type="number"
                min={50}
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm font-bold text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    difficulty === diff
                      ? 'bg-amber-500 text-stone-900 shadow-2xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients Builder */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">Ingredients</h2>
              <span className="text-[11px] text-stone-500">
                Specify ingredient name and measurement
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-2.5">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Garlic)"
                  value={ing.name}
                  onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                  className="flex-3 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Measure (e.g. 3 cloves)"
                  value={ing.measure}
                  onChange={(e) => handleUpdateIngredient(idx, 'measure', e.target.value)}
                  className="flex-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  disabled={ingredients.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Steps Builder */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">Instructions</h2>
              <span className="text-[11px] text-stone-500">
                Step by step cooking guide (optional timer minutes)
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-3">
            {instructions.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    Step {step.step}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500">Timer (mins):</span>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 5"
                      value={step.timerMinutes ?? ''}
                      onChange={(e) => handleUpdateInstruction(idx, 'timerMinutes', e.target.value)}
                      className="w-16 px-2 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium text-center"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                      disabled={instructions.length <= 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={step.instruction}
                  onChange={(e) => handleUpdateInstruction(idx, 'instruction', e.target.value)}
                  placeholder="Describe what needs to be cooked or prepped during this step..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 text-sm font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isEditing ? 'Update Recipe' : 'Publish Recipe'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipesFormScreen;
