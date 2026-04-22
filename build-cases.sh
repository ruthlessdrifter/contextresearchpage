#!/usr/bin/env bash
# ──────────────────────────────────────────────────────
# 用途: 将 RealCL JSONL 转为前端可用的 data/cases-data.js
# 用法: bash build-cases.sh
# 参数: 无（JSONL 路径和输出路径硬编码在 build-cases.py 中）
# ──────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"
python3 build-cases.py
echo "Done."
