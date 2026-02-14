// 营养计算模块

// 计算三餐总营养
export function calculateTotalNutrition(meals) {
  const total = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  Object.values(meals).forEach(meal => {
    if (meal && meal.nutrition) {
      total.calories += meal.nutrition.calories;
      total.protein += meal.nutrition.protein;
      total.carbs += meal.nutrition.carbs;
      total.fat += meal.nutrition.fat;
    }
  });

  return total;
}

// 计算营养素百分比（基于推荐摄入量）
export function calculateNutritionPercentage(nutrition) {
  const recommended = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 70
  };

  return {
    calories: Math.round((nutrition.calories / recommended.calories) * 100),
    protein: Math.round((nutrition.protein / recommended.protein) * 100),
    carbs: Math.round((nutrition.carbs / recommended.carbs) * 100),
    fat: Math.round((nutrition.fat / recommended.fat) * 100)
  };
}

// 生成营养评估
export function getNutritionAssessment(totalCalories) {
  if (totalCalories < 1400) {
    return { level: 'low', message: '热量偏低，建议适当增加' };
  } else if (totalCalories <= 2000) {
    return { level: 'good', message: '热量适中，营养均衡' };
  } else {
    return { level: 'high', message: '热量偏高，注意控制' };
  }
}
