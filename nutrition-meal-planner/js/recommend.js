// 推荐算法模块
import { dateToSeed, seededRandom } from './utils.js';

let recipesCache = {
  breakfast: [],
  lunch: [],
  dinner: []
};

// 加载所有菜谱数据
export async function loadRecipes() {
  try {
    const [breakfastRes, lunchRes, dinnerRes] = await Promise.all([
      fetch('./data/breakfast.json'),
      fetch('./data/lunch.json'),
      fetch('./data/dinner.json')
    ]);

    recipesCache.breakfast = await breakfastRes.json();
    recipesCache.lunch = await lunchRes.json();
    recipesCache.dinner = await dinnerRes.json();

    return recipesCache;
  } catch (error) {
    console.error('加载菜谱数据失败:', error);
    throw error;
  }
}

// 基于日期生成今日推荐
export function generateDailyMeals(dateString) {
  const seed = dateToSeed(dateString);

  const breakfastIndex = seededRandom(seed, recipesCache.breakfast.length);
  const lunchIndex = seededRandom(seed + 1, recipesCache.lunch.length);
  const dinnerIndex = seededRandom(seed + 2, recipesCache.dinner.length);

  return {
    breakfast: recipesCache.breakfast[breakfastIndex],
    lunch: recipesCache.lunch[lunchIndex],
    dinner: recipesCache.dinner[dinnerIndex]
  };
}

// 替换某一餐（换一个功能）
export function replaceMeal(category, excludeIds = []) {
  const recipes = recipesCache[category];
  const availableRecipes = recipes.filter(r => !excludeIds.includes(r.id));

  if (availableRecipes.length === 0) {
    return recipes[Math.floor(Math.random() * recipes.length)];
  }

  const randomIndex = Math.floor(Math.random() * availableRecipes.length);
  return availableRecipes[randomIndex];
}

// 根据ID获取菜谱
export function getRecipeById(id) {
  const allRecipes = [
    ...recipesCache.breakfast,
    ...recipesCache.lunch,
    ...recipesCache.dinner
  ];
  return allRecipes.find(r => r.id === id);
}
