// 工具函数模块

// 日期转种子
export function dateToSeed(dateString) {
  return parseInt(dateString.replace(/-/g, ''));
}

// 基于种子的伪随机数生成器（线性同余生成器）
export function seededRandom(seed, max) {
  const a = 1103515245;
  const c = 12345;
  const m = 2147483648;
  seed = (a * seed + c) % m;
  return Math.floor((seed / m) * max);
}

// 获取当前日期字符串 YYYY-MM-DD
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 格式化难度
export function formatDifficulty(difficulty) {
  const map = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  };
  return map[difficulty] || difficulty;
}

// 格式化分类
export function formatCategory(category) {
  const map = {
    'breakfast': '早餐',
    'lunch': '午餐',
    'dinner': '晚餐'
  };
  return map[category] || category;
}
