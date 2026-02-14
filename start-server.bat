@echo off
echo ========================================
echo   营养餐推荐网站 - 本地服务器启动
echo ========================================
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [√] 检测到 Python，正在启动服务器...
    echo.
    echo 服务器地址: http://localhost:8000
    echo 按 Ctrl+C 停止服务器
    echo.
    cd nutrition-meal-planner
    python -m http.server 8000
) else (
    echo [×] 未检测到 Python
    echo.
    echo 请选择以下方式之一运行：
    echo.
    echo 1. 安装 Python 后运行此脚本
    echo 2. 使用 Node.js: npx serve nutrition-meal-planner
    echo 3. 使用 VS Code Live Server 扩展
    echo.
    pause
)
