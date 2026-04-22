#!/usr/bin/env python3
"""
Parse data/selected_3.jsonl → data/cases-data.js

Produces a global JS variable CASE_DATA consumed by case-modal.js.
Each entry: { id, category, subcategory, subsubcategory, messages, rubrics }
  - messages: [{role, content}]  — raw messages from the source, as-is
    (including any "<|TASK|>" delimiter if present).
  - rubrics: [string]
"""

import json
import os
import sys

JSONL_PATH = os.path.join(os.path.dirname(__file__), "data", "selected_3.jsonl")
OUT_PATH = os.path.join(os.path.dirname(__file__), "data", "cases-data.js")

# Order: Communication (case3 in file) → Fragmented (case2) → Behavior (case1)
# matches the card order in index.html
REORDER = [2, 1, 0]

def process_case(raw):
    rubrics = raw["rubrics"]
    meta = raw["metadata"]

    messages = [{"role": m["role"], "content": m["content"]} for m in raw["messages"]]

    return {
        "id": meta.get("task_id", ""),
        "category": meta.get("context_category", ""),
        "subcategory": meta.get("context_subcategory", ""),
        "subsubcategory": meta.get("subsubcategory", ""),
        "messages": messages,
        "rubrics": rubrics,
    }


def main():
    if not os.path.exists(JSONL_PATH):
        print(f"ERROR: {JSONL_PATH} not found", file=sys.stderr)
        sys.exit(1)

    raw_cases = []
    with open(JSONL_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                raw_cases.append(json.loads(line))

    cases = [process_case(raw_cases[i]) for i in REORDER]

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    js_json = json.dumps(cases, ensure_ascii=False, indent=None)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(f"var CASE_DATA = {js_json};\n")

    total_chars = sum(sum(len(m["content"]) for m in c["messages"]) for c in cases)
    for i, c in enumerate(cases):
        print(
            f"  [{i}] {c['category']:<40s} | {len(c['messages'])} msgs | {len(c['rubrics'])} rubrics"
        )
    print(f"Wrote {len(cases)} cases to {OUT_PATH}  ({total_chars:,} chars total)")


if __name__ == "__main__":
    main()
