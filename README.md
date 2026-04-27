# Context Research — 最简说明

本仓库是 Context Research 的静态前端页面，包含两个榜单：

- **CL-bench**（`#section-clb`）
- **CL-bench Life**（`#section-life`）

数据全部由前端 `fetch()` 加载 JSON，无需构建。本地预览：

```bash
bash serve.sh          # 默认 http://localhost:8080
```

---

## 目录结构（只列本次关心的部分）

```
data/
  clb-data.json              ← CL-bench 榜单分数（核心）
  life-data.json             ← CL-bench Life 榜单分数（核心）
  pass_score_curve_web.json  ← Life 的 Pass-Score 曲线（参考文件，当前页面不读）
pass-score-chart.js          ← Life Pass-Score 曲线，数据内联在 PSC_DATA（实际生效处）
clb.js / clb-life.js         ← 调用 leaderboard.js 渲染榜单
leaderboard.js               ← 通用榜单渲染逻辑（不用改）
past/                        ← 暂不需要的旧文件（图片、node_modules 等）
```

---

## 1. 添加 / 注册 CL-bench 模型分数

**只需要改一个文件**：`data/clb-data.json`

在数组里追加一条对象（顺序随意，页面会按当前 Category 自动降序排序）：

```json
{
  "model": "Your Model Name",
  "org": "YourOrg",
  "overall":    0.210, "overall_std":    0.005,
  "domain":     0.230, "domain_std":     0.010,
  "rule":       0.200, "rule_std":       0.008,
  "procedural": 0.215, "procedural_std": 0.012,
  "pattern":    0.150, "pattern_std":    0.020
}
```

字段说明：

| 字段 | 含义 |
|---|---|
| `model` | 显示名（需与 Reasoning 过滤规则匹配，见下） |
| `org` | 机构，必须是以下之一才能命中厂商筛选按钮：`OpenAI / Anthropic / Google / Alibaba / DeepSeek / Moonshot / ByteDance / Tencent`（其他 org 仍会展示，但不在筛选按钮里） |
| `overall` | 总分，0–1 的小数（页面乘 100 显示为百分比） |
| `overall_std` | 标准差，**单跑无标准差填 `0`**，页面会自动显示 `†` 单跑标记 |
| `domain / rule / procedural / pattern` | 四个子类别的分数，对应页面上的 4 个 category tab |
| `*_std` | 每个子类别对应的标准差，同样单跑填 `0` |

**High Reasoning 筛选规则**（`clb.js` 中定义）：模型名里含 `thinking` / `(high)` / `(xhigh)`（不区分大小写）会自动归入 "High Reasoning"，否则归入 "Low/No Reasoning"。例如：

- `"GPT 5.1 (High)"` → High
- `"Kimi K2 Thinking"` → High
- `"Kimi K2"` → Low/No

**无需改任何 JS / HTML**，刷新页面即可看到。

---

## 2. 添加 / 注册 CL-bench Life 模型分数

### 2.1 榜单分数（必须）

改 `data/life-data.json`，追加一条：

```json
{
  "model": "Your Model Name (High)",
  "org": "YourOrg",
  "overall":       0.170, "overall_std":       0.010,
  "interpersonal": 0.200, "interpersonal_std": 0.015,
  "thought":       0.140, "thought_std":       0.012,
  "behavior":      0.160, "behavior_std":      0.011
}
```

字段说明：

| 字段 | 含义 |
|---|---|
| `model` | 显示名 |
| `org` | 支持的厂商筛选按钮：`OpenAI / Anthropic / Google / Alibaba / DeepSeek / Moonshot / ByteDance / Tencent / xAI / MiniMax` |
| `overall` | 总分，0–1 |
| `overall_std` | 单跑填 `0` |
| `interpersonal` | Communication & Social Interactions |
| `thought` | Fragmented Information & Revisions |
| `behavior` | Behavioral Records & Activity Trails |
| 对应的 `*_std` | 单跑填 `0` |

**High Reasoning 筛选规则**（`clb-life.js` 中定义）：

- 含 `(nothink)` 或 `(non-reasoning)` → Low/No Reasoning
- 含 `thinking` / `(xhigh)` / `(high)` / `(medium)` / `(low)` → High Reasoning
- 其他 → Low/No Reasoning

命名时建议加档位后缀，例如：`"Kimi K2.5 (High)"`、`"Seed 2.0 Pro (Medium)"`、`"HY3 Preview (NoThink)"`。

### 2.2 Pass-Score 曲线（可选，只和 Life 页面相关）

**注意：** 当前页面实际读取的是 `pass-score-chart.js` 顶部的 `PSC_DATA.series` 数组，**不是** `data/pass_score_curve_web.json`。如果只要新增模型曲线，改 `pass-score-chart.js`：

1. 在 `PSC_DATA.series` 里按 `rank` 顺序插入一行：

   ```js
   { rank: 28, display_name: "Your Model (High)",
     thresholds:      [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0],
     task_pass_rates: [70.00,62.00,55.00,48.00,40.00,30.00,20.00,12.00,10.00],
     avg: 65.00, highlight: false },
   ```

   - `thresholds` 固定 9 个阈值，**不要动**。
   - `task_pass_rates` 是该模型在各阈值下的任务通过率（百分比，0–100）。
   - `avg` 是整体均分（用于排序辅助参考）。
   - `highlight: true` 可让该条线加粗高亮，可再加 `highlight_color: "#ff6b6b"` 指定颜色。

2. （可选）把该模型加入 `DEFAULT_MODELS` Set，页面默认就会勾选展示它的曲线。

建议保持 `data/pass_score_curve_web.json` 与 `PSC_DATA` 数据一致，方便未来改成动态加载。

---

## 快速 Checklist

| 目标 | 改动 |
|---|---|
| CL-bench 新增一个模型 | 在 `data/clb-data.json` 数组末尾加一条对象，完成 |
| CL-bench Life 新增一个模型（只加榜单） | 在 `data/life-data.json` 数组末尾加一条对象，完成 |
| CL-bench Life 同时加 Pass-Score 曲线 | 再在 `pass-score-chart.js` 的 `PSC_DATA.series` 里加一条，并可选加到 `DEFAULT_MODELS` |
| 想让模型被 "High Reasoning" 筛选识别 | 模型名里加 `(High)` / `(xHigh)` / `Thinking` 等关键词 |
| 单跑没有 std | 把所有 `*_std` 字段填 `0`，页面会自动标 `†` |
| 预览效果 | `bash serve.sh` 然后访问 `http://localhost:8080` |
