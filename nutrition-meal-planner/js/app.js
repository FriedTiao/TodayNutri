// 应用主逻辑
import { getCurrentDate } from './utils.js';
import { loadRecipes, generateDailyMeals, replaceMeal } from './recommend.js';
import { renderDashboard } from './ui.js';

// 应用状态
let appState = {
  currentDate: '',
  meals: {
    breakfast: null,
    lunch: null,
    dinner: null
  },
  excludedIds: {
    breakfast: [],
    lunch: [],
    dinner: []
  }
};

// 初始化应用
async function init() {
  try {
    // 显示加载状态
    showLoading();

    // 加载菜谱数据
    await loadRecipes();

    // 获取当前日期
    appState.currentDate = getCurrentDate();

    // 生成今日推荐
    appState.meals = generateDailyMeals(appState.currentDate);

    // 初始化排除列表
    appState.excludedIds.breakfast = [appState.meals.breakfast.id];
    appState.excludedIds.lunch = [appState.meals.lunch.id];
    appState.excludedIds.dinner = [appState.meals.dinner.id];

    // 渲染界面
    renderDashboard(appState.meals, appState.currentDate);

    // 绑定事件
    bindEvents();

    // 隐藏加载状态
    hideLoading();
  } catch (error) {
    console.error('初始化失败:', error);
    showError('加载失败，请刷新页面重试');
  }
}

// 绑定事件
function bindEvents() {
  // 监听换一个事件
  window.addEventListener('replaceMeal', (e) => {
    const { category } = e.detail;
    handleReplaceMeal(category);
  });
}

// 处理换一个
function handleReplaceMeal(category) {
  const newMeal = replaceMeal(category, appState.excludedIds[category]);
  appState.meals[category] = newMeal;
  appState.excludedIds[category].push(newMeal.id);

  // 重新渲染
  renderDashboard(appState.meals, appState.currentDate);
}

// 显示加载状态
function showLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'flex';
}

// 隐藏加载状态
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
}

// 显示错误
function showError(message) {
  hideLoading();
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
