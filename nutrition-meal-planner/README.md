# 营养餐推荐网站

> 让每一餐都营养均衡，告别选择困难和重复疲劳

## 项目简介

这是一个静态网站，为用户提供每日早中晚餐的营养搭配推荐。基于日期自动生成推荐，确保每天不重样，所有菜谱均为家常菜，食材易购买。

## 功能特点

- ✅ 每日自动推荐早中晚三餐
- ✅ 基于日期的伪随机算法，同一天访问结果一致
- ✅ "换一个"功能，不喜欢可以重新推荐
- ✅ 详细的营养数据展示（卡路里、蛋白质、碳水、脂肪）
- ✅ 完整的烹饪步骤和食材清单
- ✅ 数据来源透明，标注权威平台
- ✅ 移动端完美适配

## 技术栈

- 原生 JavaScript (ES6+)
- CSS3 (Flexbox/Grid)
- 静态 JSON 数据
- 无需后端和数据库

## 项目结构

```
nutrition-meal-planner/
├── index.html              # 主页（仪表盘）
├── detail.html             # 详情页
├── about.html              # 关于页
├── css/
│   ├── main.css           # 主样式
│   ├── dashboard.css      # 仪表盘样式
│   └── mobile.css         # 移动端适配
├── js/
│   ├── app.js             # 应用主逻辑
│   ├── recommend.js       # 推荐算法
│   ├── nutrition.js       # 营养计算
│   ├── ui.js              # UI渲染
│   └── utils.js           # 工具函数
├── data/
│   ├── breakfast.json     # 早餐菜谱（10道）
│   ├── lunch.json         # 午餐菜谱（10道）
│   └── dinner.json        # 晚餐菜谱（10道）
└── images/
    └── recipes/           # 菜谱图片
```

## 快速开始

### 本地运行

由于使用了 ES6 模块，需要通过 HTTP 服务器运行：

**方法1：使用 Python**
```bash
cd nutrition-meal-planner
python -m http.server 8000
```

**方法2：使用 Node.js**
```bash
cd nutrition-meal-planner
npx serve
```

**方法3：使用 VS Code Live Server**
- 安装 Live Server 扩展
- 右键 index.html，选择 "Open with Live Server"

然后访问 `http://localhost:8000`

### 部署

可以直接部署到以下平台（完全免费）：

- **GitHub Pages**
- **Vercel**
- **Netlify**

只需将整个 `nutrition-meal-planner` 文件夹上传即可。

## 数据来源

所有菜谱及营养数据综合参考以下权威平台：

- USDA FoodData Central（营养数据）
- Edamam 营养分析平台
- 下厨房、豆果美食（菜谱参考）
- 《中国居民膳食指南》

## 营养标准

- 早餐：300-500 kcal（占全天25%）
- 午餐：600-800 kcal（占全天40%）
- 晚餐：500-700 kcal（占全天35%）
- 全天总计：1400-2000 kcal

## 版本信息

- **当前版本**：V1.0 MVP
- **菜谱数量**：30道家常菜（早中晚各10道）
- **支持天数**：10天不重样

## 未来计划

- V2.0：扩充菜谱库到100+道，增加用户账户系统
- V2.5：运动推荐系统，健康报告
- V3.0：社区功能，食材购买对接

## 免责声明

本网站提供的营养建议仅供参考，不构成医疗建议。个体营养需求因年龄、性别、活动量等因素而异。如有特殊饮食需求或健康问题，请咨询专业营养师或医生。

## 许可证

MIT License

---

**开发日期**：2026-02-14
