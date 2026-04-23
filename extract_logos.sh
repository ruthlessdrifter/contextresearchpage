#!/bin/bash
# 用途: 从 context_logo_board_12_alt (1).png 裁出两个 logo, 生成透明背景的 PNG
#       用于放到 index.html 中 CLBench-life / CL-bench 两张卡片的右上角。
#
# 用法:
#   bash extract_logos.sh
#
# 输出:
#   logos/logo_life.png  —— CLBench-life 卡片右上角 logo (分支/星系形)
#   logos/logo_clb.png   —— CL-bench   卡片右上角 logo (四色块形)
#
# 依赖:
#   Python 3 + Pillow (pip3 install Pillow)
#
# 参数: 无 (路径、格子位置均在 extract_logos.py 内硬编码, 如需调整请改脚本)

set -e
cd "$(dirname "$0")"
python3 extract_logos.py
echo "[OK] logos 已生成: logos/logo_life.png, logos/logo_clb.png"
