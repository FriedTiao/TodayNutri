// UI渲染模块
import { calculateTotalNutrition, calculateNutritionPercentage } from './nutrition.js';
import { formatDifficulty, formatCategory } from './utils.js';

// 渲染仪表盘
export function renderDashboard(meals, currentDate) {
  const totalNutrition = calculateTotalNutrition(meals);
  const percentages = calculateNutritionPercentage(totalNutrition);

  // 渲染日期
  document.getElementById('current-date').textContent = currentDate;

  // 渲染总营养
  document.getElementById('total-calories').textContent = totalNutrition.calories;
  document.getElementById('protein-value').textContent = `${totalNutrition.protein}g`;
  document.getElementById('carbs-value').textContent = `${totalNutrition.carbs}g`;
  document.getElementById('fat-value').textContent = `${totalNutrition.fat}g`;

  // 渲染进度条
  document.getElementById('protein-bar').style.width = `${Math.min(percentages.protein, 100)}%`;
  document.getElementById('carbs-bar').style.width = `${Math.min(percentages.carbs, 100)}%`;
  document.getElementById('fat-bar').style.width = `${Math.min(percentages.fat, 100)}%`;

  document.getElementById('protein-percent').textContent = `${percentages.protein}%`;
  document.getElementById('carbs-percent').textContent = `${percentages.carbs}%`;
  document.getElementById('fat-percent').textContent = `${percentages.fat}%`;

  // 渲染三餐卡片
  renderMealCard('breakfast', meals.breakfast);
  renderMealCard('lunch', meals.lunch);
  renderMealCard('dinner', meals.dinner);
}

// 渲染单个餐卡片
function renderMealCard(category, meal) {
  const card = document.getElementById(`${category}-card`);
  if (!card || !meal) return;

  card.querySelector('.meal-image').src = meal.image || './images/recipes/placeholder.jpg';
  card.querySelector('.meal-image').alt = meal.name;
  card.querySelector('.meal-name').textContent = meal.name;
  card.querySelector('.meal-calories').textContent = `${meal.nutrition.calories} kcal`;
  card.querySelector('.meal-time').textContent = `${meal.cookTime}分钟`;
  card.querySelector('.meal-difficulty').textContent = formatDifficulty(meal.difficulty);

  // 绑定详情按钮
  card.querySelector('.btn-detail').onclick = () => {
    window.location.href = `detail.html?id=${meal.id}`;
  };

  // 绑定换一个按钮
  card.querySelector('.btn-replace').onclick = () => {
    window.dispatchEvent(new CustomEvent('replaceMeal', { detail: { category } }));
  };
}

// 渲染详情页
export function renderDetail(recipe) {
  if (!recipe) {
    document.body.innerHTML = '<div class="error">菜谱未找到</div>';
    return;
  }

  document.getElementById('recipe-name').textContent = recipe.name;
  document.getElementById('recipe-image').src = recipe.image || './images/recipes/placeholder.jpg';
  document.getElementById('recipe-description').textContent = recipe.description;
  document.getElementById('recipe-category').textContent = formatCategory(recipe.category);
  document.getElementById('recipe-time').textContent = `${recipe.cookTime}分钟`;
  document.getElementById('recipe-difficulty').textContent = formatDifficulty(recipe.difficulty);

  // 营养信息
  document.getElementById('nutrition-calories').textContent = recipe.nutrition.calories;
  document.getElementById('nutrition-protein').textContent = recipe.nutrition.protein;
  document.getElementById('nutrition-carbs').textContent = recipe.nutrition.carbs;
  document.getElementById('nutrition-fat').textContent = recipe.nutrition.fat;

  // 食材列表
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = recipe.ingredients
    .map(ing => `<li>${ing.name} ${ing.amount}</li>`)
    .join('');

  // 烹饪步骤
  const stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = recipe.steps
    .map((step, index) => `<li><span class="step-number">${index + 1}</span>${step}</li>`)
    .join('');

  // 数据来源
  const sourcesList = document.getElementById('sources-list');
  sourcesList.innerHTML = recipe.sources
    .map(source => `<li>${source.platform} - ${source.dataType}</li>`)
    .join('');
}
