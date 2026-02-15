// UI渲染模块
import { calculateTotalNutrition, calculateNutritionPercentage } from './nutrition.js';
import { formatDifficulty, formatCategory } from './utils.js';

// 难度配置
const difficultyConfig = {
  easy: { label: '简单', color: '#27ae60', bg: 'rgba(39,174,96,0.12)' },
  medium: { label: '中等', color: '#f39c12', bg: 'rgba(243,156,18,0.12)' },
  hard: { label: '困难', color: '#e74c3c', bg: 'rgba(231,76,60,0.12)' }
};

// 来源平台配置
const platformConfig = {
  '下厨房': { icon: '🍳', color: '#e67e22', border: '#f39c12' },
  '豆果美食': { icon: '🥘', color: '#e74c3c', border: '#c0392b' },
  'USDA FoodData Central': { icon: '🔬', color: '#3498db', border: '#2980b9' },
  'Edamam': { icon: '🧪', color: '#9b59b6', border: '#8e44ad' },
  '中国居民膳食指南': { icon: '📖', color: '#27ae60', border: '#229954' }
};

// 渲染仪表盘
export function renderDashboard(meals, currentDate) {
  const totalNutrition = calculateTotalNutrition(meals);
  const percentages = calculateNutritionPercentage(totalNutrition);

  document.getElementById('current-date').textContent = currentDate;
  document.getElementById('total-calories').textContent = totalNutrition.calories;
  document.getElementById('protein-value').textContent = `${totalNutrition.protein}g`;
  document.getElementById('carbs-value').textContent = `${totalNutrition.carbs}g`;
  document.getElementById('fat-value').textContent = `${totalNutrition.fat}g`;

  document.getElementById('protein-bar').style.width = `${Math.min(percentages.protein, 100)}%`;
  document.getElementById('carbs-bar').style.width = `${Math.min(percentages.carbs, 100)}%`;
  document.getElementById('fat-bar').style.width = `${Math.min(percentages.fat, 100)}%`;

  document.getElementById('protein-percent').textContent = `${percentages.protein}%`;
  document.getElementById('carbs-percent').textContent = `${percentages.carbs}%`;
  document.getElementById('fat-percent').textContent = `${percentages.fat}%`;

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

  // 难度徽章
  const diff = difficultyConfig[meal.difficulty] || difficultyConfig.easy;
  const diffEl = card.querySelector('.meal-difficulty');
  diffEl.innerHTML = `<span class="difficulty-badge" style="color:${diff.color};background:${diff.bg};padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600">${diff.label}</span>`;

  // 标签预览（前3个）
  const tagsContainer = card.querySelector('.meal-tags');
  if (tagsContainer && meal.tags) {
    tagsContainer.innerHTML = meal.tags.slice(0, 3)
      .map(tag => `<span class="meal-tag-pill">${tag}</span>`)
      .join('');
  }

  card.querySelector('.btn-detail').onclick = () => {
    window.location.href = `detail.html?id=${meal.id}`;
  };
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

  // 难度徽章颜色化
  const diff = difficultyConfig[recipe.difficulty] || difficultyConfig.easy;
  document.getElementById('recipe-difficulty').innerHTML =
    `<span class="difficulty-badge" style="color:${diff.color};background:${diff.bg};padding:3px 14px;border-radius:14px;font-weight:600">${diff.label}</span>`;

  // 标签渲染
  const tagsEl = document.getElementById('recipe-tags');
  if (tagsEl && recipe.tags) {
    tagsEl.innerHTML = recipe.tags
      .map(tag => `<span class="recipe-tag">${tag}</span>`)
      .join('');
  }

  // 营养信息（带emoji和颜色）
  const nutritionMap = [
    { id: 'nutrition-calories', val: recipe.nutrition.calories, emoji: '🔥', color: '#e74c3c' },
    { id: 'nutrition-protein', val: recipe.nutrition.protein, emoji: '💪', color: '#1abc9c' },
    { id: 'nutrition-carbs', val: recipe.nutrition.carbs, emoji: '🌾', color: '#f39c12' },
    { id: 'nutrition-fat', val: recipe.nutrition.fat, emoji: '🫒', color: '#9b59b6' }
  ];
  nutritionMap.forEach(n => {
    const el = document.getElementById(n.id);
    if (el) {
      el.style.color = n.color;
      el.textContent = n.val;
      const label = el.parentElement.querySelector('.label');
      if (label && !label.dataset.emojified) {
        label.innerHTML = `${n.emoji} ${label.textContent}`;
        label.dataset.emojified = 'true';
      }
    }
  });

  // 食材列表（带勾选）
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = recipe.ingredients
    .map((ing, i) => `<li class="ingredient-item">
      <label class="ingredient-label">
        <input type="checkbox" class="ingredient-check" data-index="${i}">
        <span class="ingredient-text">${ing.name} ${ing.amount}</span>
      </label>
    </li>`)
    .join('');

  // 勾选交互
  ingredientsList.addEventListener('change', (e) => {
    if (e.target.classList.contains('ingredient-check')) {
      const text = e.target.nextElementSibling;
      if (e.target.checked) {
        text.style.textDecoration = 'line-through';
        text.style.color = '#bdc3c7';
      } else {
        text.style.textDecoration = 'none';
        text.style.color = '';
      }
    }
  });

  // 烹饪步骤（时间线）
  const stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = recipe.steps
    .map((step, index) => `<li class="step-item"><span class="step-number">${index + 1}</span>${step}</li>`)
    .join('');

  // 数据来源（卡片化）
  const sourcesList = document.getElementById('sources-list');
  sourcesList.innerHTML = recipe.sources
    .map(source => {
      let url = source.url;
      if (source.platform === '下厨房' && recipe.name) {
        url = `https://www.xiachufang.com/search/?keyword=${encodeURIComponent(recipe.name)}`;
      } else if (source.platform === '豆果美食' && recipe.name) {
        url = `https://www.douguo.com/search/recipe/${encodeURIComponent(recipe.name)}`;
      }
      const cfg = platformConfig[source.platform] || { icon: '🔗', color: '#7f8c8d', border: '#95a5a6' };
      if (url) {
        return `<li>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="source-card" style="border-left:4px solid ${cfg.border}">
            <span class="source-icon" style="color:${cfg.color}">${cfg.icon}</span>
            <div class="source-info">
              <span class="source-platform" style="color:${cfg.color}">${source.platform}</span>
              <span class="source-type">${source.dataType}</span>
            </div>
            <span class="source-arrow">→</span>
          </a>
        </li>`;
      }
      return `<li><span class="source-platform">${source.platform}</span> - <span class="source-type">${source.dataType}</span></li>`;
    })
    .join('');
}
