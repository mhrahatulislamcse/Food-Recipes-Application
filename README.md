# 🍳 Foodie! - Modern Food & Recipe Web Application

<p align="center">
  <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80" alt="Foodie Recipe Banner" width="100%" style="border-radius: 12px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge" alt="License" /></a>
</p>

---

## 🌟 Overview

**Foodie!** is a modern, responsive recipe and cooking web application designed to help food enthusiasts discover, cook, and manage mouth-watering dishes from around the world. Featuring an interactive phone simulator view, dynamic portion scaler, integrated cooking timers, and custom recipe creation, **Foodie!** makes cooking enjoyable and accessible on any device.

---

## ✨ Key Features

### 📱 Dual Viewport Modes
- **Phone Simulator Mode**: Experience the app as a native mobile application complete with an iOS-style chassis, status bar, and dynamic island notch.
- **Wide / Desktop Mode**: Expand into a spacious, responsive layout ideal for tablets, laptops, and large desktop screens.

### 🔍 Recipe Discovery & Smart Filtering
- **Category Browsing**: Explore dishes across various categories including *Breakfast*, *Beef*, *Chicken*, *Dessert*, *Pasta*, *Seafood*, *Vegetarian*, and *Soup*.
- **Live Search**: Instant keyword search matching titles, descriptions, cuisines, and ingredients.
- **Quick Filter Badges**: Filter recipes with one click:
  - ⚡ **Quick (< 25 mins)**: Meals ready in under 25 minutes.
  - 🟢 **Easy**: Beginner-friendly recipes.
  - 💪 **High Protein**: Protein-rich culinary options.

### 📖 Interactive Cooking Experience
- **Dynamic Servings Scaler**: Easily adjust serving count (`+` / `-`) — ingredient measurements automatically update proportionally in real-time!
- **Interactive Grocery & Prep Checklist**: Check off ingredients as you prepare your mise en place or shop.
- **Built-in Step Timers**: Start, pause, and reset step-specific countdown timers directly from the cooking instructions.
- **Video Walkthroughs**: Built-in YouTube video links for step-by-step visual guidance.
- **Nutritional & Difficulty Info**: Clear stats on prep time, cooking time, calories, and difficulty level.

### ✍️ Custom Recipe Studio
- Create, customize, and edit your own recipes.
- Add detailed ingredients with precise units and measurements.
- Define multi-step cooking procedures with optional timer countdowns.
- Choose from curated high-resolution food photo presets or supply custom image URLs.

### ❤️ Favorites & Offline Persistence
- Bookmark favorite recipes with instant heart toggling.
- All saved recipes and favorites are automatically persisted using browser `localStorage`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component hierarchy & hooks |
| **TypeScript** | Strict static typing and code reliability |
| **Vite 8** | Ultra-fast local development server and bundler |
| **Tailwind CSS 4** | Utility-first, responsive modern styling |
| **Motion (Framer Motion)** | Fluid transitions and micro-interactions |
| **Lucide React** | Clean, consistent icons |

---

## 📂 Project Structure

```text
Food-Recipes-Application/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BottomNavigation.tsx  # Mobile-friendly navigation bar
│   │   ├── Categories.tsx        # Horizontal scrolling category selector
│   │   ├── HeaderBar.tsx         # Top app bar with view toggle
│   │   ├── PhoneSimulator.tsx    # Mobile device chassis container
│   │   └── RecipesList.tsx       # Recipe grid and cards
│   ├── data/
│   │   └── recipesData.ts        # Initial seed recipes & categories
│   ├── screens/            # Application views
│   │   ├── FavoriteScreen.tsx    # Bookmarked recipes
│   │   ├── HomeScreen.tsx        # Search, filters, recommendations
│   │   ├── MyRecipeScreen.tsx    # User-created recipes
│   │   ├── RecipeDetailScreen.tsx# Full recipe view with timers & portion scaling
│   │   ├── RecipesFormScreen.tsx # Custom recipe builder & editor
│   │   └── WelcomeScreen.tsx     # Onboarding landing screen
│   ├── types/
│   │   └── recipe.ts             # TypeScript interfaces & types
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Global stylesheet & Tailwind imports
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Project manifest & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & server configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mhrahatulislamcse/Food-Recipes-Application.git
   cd Food-Recipes-Application
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running Locally

To launch the local development server:
```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

### Production Build

To build the application for production:
```bash
npm run build
```

The optimized bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 📝 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server at `http://localhost:3000` with host access |
| `npm run build` | Compiles TypeScript and creates optimized production assets |
| `npm run preview` | Runs a local server to test the production build |
| `npm run lint` | Runs TypeScript compiler checks without emitting files |
| `npm run clean` | Cleans up production build output |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/mhrahatulislamcse/Food-Recipes-Application/issues) to report bugs or propose improvements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **Apache-2.0 License**. See the source files for details.
