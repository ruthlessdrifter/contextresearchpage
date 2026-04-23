#!/usr/bin/env bash
# ============================================================
# 用途: 启动本地开发服务器预览页面
# 用法: bash serve.sh [端口号]
# 参数:
#   端口号 — 可选，默认 8080
# 说明:
#   因为 leaderboard 数据通过 fetch() 加载 JSON 文件，
#   直接用 file:// 打开 index.html 可能因 CORS 限制导致
#   数据无法加载。请使用此脚本启动本地 HTTP 服务。
# ============================================================

PORT="${1:-8081}"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Serving $DIR on http://localhost:$PORT"
echo "Press Ctrl+C to stop."

if command -v python3 &>/dev/null; then
  python3 -m http.server "$PORT" -d "$DIR"
elif command -v python &>/dev/null; then
  cd "$DIR" && python -m SimpleHTTPServer "$PORT"
else
  echo "Error: python not found. Install python3 or use another HTTP server."
  exit 1
fi
