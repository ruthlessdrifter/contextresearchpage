// ===== Pass Score Curve Chart (CLBench-Life) =====
(function () {
  const PSC_DATA = {
    series: [
      { rank:  1, display_name: "GPT-5.4 xHigh",         thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [79.80,74.81,70.82,64.59,56.11,45.39,34.66,24.69,21.70], avg: 77.04, highlight: false },
      { rank:  2, display_name: "GPT-5.4 High",          thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [77.78,71.52,67.33,61.07,53.00,42.88,31.52,21.48,19.30], avg: 75.38, highlight: false },
      { rank:  3, display_name: "GPT-5.1",               thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [78.47,71.53,66.58,59.41,50.99,38.61,28.47,18.56,17.30], avg: 74.33, highlight: false },
      { rank:  4, display_name: "Gemini 3.1 Pro (High)", thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [74.07,66.69,60.73,56.42,46.98,37.45,27.34,18.23,16.90], avg: 72.59, highlight: false },
      { rank:  5, display_name: "Seed 2.0 Pro (High)",   thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [73.39,66.64,60.46,54.61,46.54,36.57,25.21,16.39,15.50], avg: 71.87, highlight: false },
      { rank:  6, display_name: "Hy3 preview (High)",    thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [73.83,67.16,61.23,54.20,45.68,35.68,24.94,16.91,15.70], avg: 71.81, highlight: false },
      { rank:  7, display_name: "Claude Opus 4.6 (High)",thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [71.89,66.05,60.71,55.88,47.84,37.00,27.60,18.37,17.00], avg: 71.18, highlight: false },
      { rank:  8, display_name: "Seed 2.0 Pro (Medium)", thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [71.11,63.21,56.30,48.64,42.22,31.36,19.51,12.59,11.40], avg: 69.31, highlight: false },
      { rank:  9, display_name: "Qwen 3.5 Plus (High)",  thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [68.26,59.95,54.24,47.94,39.13,30.06,20.49,13.27,12.40], avg: 68.50, highlight: false },
      { rank: 10, display_name: "Seed 2.0 Pro (Low)",    thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [67.65,61.48,55.06,46.42,37.53,29.14,20.00,13.58,12.10], avg: 68.13, highlight: false },
      { rank: 11, display_name: "Kimi K2.5 (High)",      thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [66.23,57.33,51.98,46.87,39.62,29.32,21.58,14.25,13.20], avg: 68.06, highlight: false },
      { rank: 12, display_name: "Hy3 preview (Low)",     thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [64.20,58.52,52.59,46.42,39.51,29.63,22.47,13.83,12.80], avg: 67.17, highlight: false },
      { rank: 13, display_name: "Grok 4.20 (High)",      thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [64.98,55.24,49.92,42.51,35.27,28.04,19.80,12.90,11.90], avg: 66.42, highlight: false },
      { rank: 14, display_name: "GLM-4.7 (High)",        thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [63.86,55.45,47.77,42.08,34.65,26.73,18.81,11.39,10.90], avg: 66.07, highlight: false },
      { rank: 15, display_name: "DeepSeek V3.2 Think",         thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [59.95,51.24,44.20,37.81,29.60,22.89,15.09,10.20, 9.50], avg: 63.00, highlight: false },
      { rank: 16, display_name: "Hunyuan 2.0 Think",     thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [60.99,51.28,44.61,37.20,29.47,21.65,14.65, 9.22, 8.40], avg: 62.90, highlight: false },
      { rank: 17, display_name: "MiMo v2 Pro (High)",    thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [57.78,50.37,42.72,35.80,27.90,20.49,12.84, 7.90, 6.90], avg: 60.82, highlight: false },
      { rank: 18, display_name: "MiniMax M2.5",          thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [51.16,43.06,36.36,30.08,22.81,16.45,10.91, 6.86, 6.30], avg: 57.73, highlight: false },
      { rank: 19, display_name: "Claude Opus 4.6",       thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [75.31,66.17,59.51,52.35,43.95,34.57,24.20,14.81,13.60], avg: 71.34, highlight: false },
      { rank: 20, display_name: "Gemini 3.1 Pro",        thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [72.35,64.44,58.27,53.33,47.16,38.02,27.90,17.04,16.00], avg: 71.32, highlight: false },
      { rank: 21, display_name: "GPT-5.4",               thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [70.54,62.38,56.93,52.23,43.32,33.17,20.79,15.10,13.80], avg: 69.61, highlight: false },
      { rank: 22, display_name: "Kimi K2.5",             thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [65.43,58.77,53.58,45.19,37.28,27.90,18.27,10.37, 9.60], avg: 66.72, highlight: false },
      { rank: 23, display_name: "Hy3 preview (NoThink)", thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [56.30,48.64,42.47,37.28,28.89,21.48,15.06,10.12, 9.40], avg: 61.62, highlight: false },
      { rank: 24, display_name: "Qwen 3.5 Plus",         thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [58.44,48.87,41.81,36.27,28.97,21.16,13.10, 8.82, 8.10], avg: 61.62, highlight: false },
      { rank: 25, display_name: "Grok 4.20",             thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [55.75,48.25,42.00,36.00,29.25,21.50,14.25, 9.00, 8.60], avg: 61.18, highlight: false },
      { rank: 26, display_name: "DeepSeek V3.2",               thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [56.05,46.67,40.49,36.05,29.14,21.98,14.32, 8.15, 7.40], avg: 60.74, highlight: false },
      { rank: 27, display_name: "Seed 2.0 Pro",          thresholds: [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0], task_pass_rates: [57.28,50.62,45.19,36.79,28.64,20.74,11.85, 8.64, 8.40], avg: 60.62, highlight: false }
    ]
  };

  const GRADIENT = ["#5e81ac", "#81a1c1", "#8fbcbb", "#ebcb8b", "#d08770"];
  const X_LABELS = ["60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"];

  // 默认展示的 9 个代表性模型（各厂商 High 档 + Hy3 代表 + DeepSeek 下限）
  const DEFAULT_MODELS = new Set([
    "GPT-5.4 High",
    "Claude Opus 4.6 (High)",
    "Gemini 3.1 Pro (High)",
    "Hy3 preview (High)",
    "Seed 2.0 Pro (High)",
    "Kimi K2.5 (High)",
    "Qwen 3.5 Plus (High)",
    "Grok 4.20 (High)",
    "DeepSeek V3.2 Think"
  ]);

  function getColor(item, idx, total) {
    if (item.highlight && item.highlight_color) return item.highlight_color;
    const nonHl = PSC_DATA.series.filter(s => !s.highlight);
    const nonHlIdx = nonHl.indexOf(item);
    const n = nonHl.length;
    if (n <= 1) return GRADIENT[2];
    const t = nonHlIdx / (n - 1);
    const segLen = 1 / (GRADIENT.length - 1);
    const segIdx = Math.min(Math.floor(t / segLen), GRADIENT.length - 2);
    const segT = (t - segIdx * segLen) / segLen;
    return lerpColor(GRADIENT[segIdx], GRADIENT[segIdx + 1], segT);
  }

  function lerpColor(a, b, t) {
    const pa = hexToRgb(a), pb = hexToRgb(b);
    const r = Math.round(pa.r + (pb.r - pa.r) * t);
    const g = Math.round(pa.g + (pb.g - pa.g) * t);
    const bl = Math.round(pa.b + (pb.b - pa.b) * t);
    return `rgb(${r},${g},${bl})`;
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }

  const canvas = document.getElementById('psc-chart');
  if (!canvas) return;

  const activeModels = new Set(
    PSC_DATA.series
      .map(s => s.display_name)
      .filter(name => DEFAULT_MODELS.has(name))
  );
  let chartInstance = null;
  let hoveredDatasetIndex = null;
  let pinnedName = null;

  function buildDatasets() {
    return PSC_DATA.series
      .filter(s => activeModels.has(s.display_name))
      .map((s, i) => {
        const color = getColor(s, i, PSC_DATA.series.length);
        const isHl = s.highlight;
        return {
          label: s.display_name,
          data: s.task_pass_rates,
          borderColor: color,
          backgroundColor: color,
          borderWidth: isHl ? 2 : 1.5,
          pointRadius: function (ctx) {
            const totalPts = s.thresholds.length;
            const t = ctx.dataIndex / Math.max(totalPts - 1, 1);
            return 3 - t * 1.5;
          },
          pointHoverRadius: 4,
          pointBackgroundColor: '#fff',
          pointBorderColor: color,
          pointBorderWidth: isHl ? 1.5 : 1,
          tension: 0.3,
          fill: false,
          order: isHl ? 0 : 10 + i,
          _meta: s
        };
      });
  }

  function renderChart() {
    const datasets = buildDatasets();
    if (pinnedName && !datasets.some(function (ds) { return ds.label === pinnedName; })) {
      pinnedName = null;
    }
    if (chartInstance) {
      chartInstance.data.datasets = datasets;
      chartInstance.update('none');
      updateFocus();
      renderPinBadge();
      return;
    }

    chartInstance = new Chart(canvas, {
      type: 'line',
      data: { labels: X_LABELS, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#1a1a1a',
            bodyColor: '#444',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            cornerRadius: 4,
            padding: 7,
            titleFont: { size: 11, weight: '600', family: "'Inter', sans-serif" },
            bodyFont: { size: 10, family: "'JetBrains Mono', monospace" },
            boxPadding: 3,
            itemSort: function (a, b) {
              return a.datasetIndex - b.datasetIndex;
            },
            callbacks: {
              title: function (items) {
                return 'Threshold: ' + items[0].label;
              },
              label: function (ctx) {
                var meta = ctx.dataset._meta;
                return ' ' + meta.display_name + ': ' + ctx.parsed.y.toFixed(1) + '%';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Pass Score Threshold',
              font: { size: 10, weight: '600', family: "'Inter', sans-serif" },
              color: '#333'
            },
            grid: { display: false },
            ticks: {
              font: { size: 10, family: "'JetBrains Mono', monospace" },
              color: '#666'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Task Pass Rate (%)',
              font: { size: 10, weight: '600', family: "'Inter', sans-serif" },
              color: '#333'
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              font: { size: 10, family: "'JetBrains Mono', monospace" },
              color: '#666',
              callback: function (v) { return v + '%'; }
            },
            min: 0,
            max: 85
          }
        },
        onHover: function (event, elements) {
          if (elements.length > 0) {
            var newIdx = elements[0].datasetIndex;
            if (newIdx !== hoveredDatasetIndex) {
              hoveredDatasetIndex = newIdx;
              updateFocus();
            }
          } else if (hoveredDatasetIndex !== null) {
            hoveredDatasetIndex = null;
            updateFocus();
          }
        },
        onClick: function () {}
      }
    });
  }

  function pinnedDatasetIndex() {
    if (!pinnedName || !chartInstance) return -1;
    return chartInstance.data.datasets.findIndex(function (ds) {
      return ds.label === pinnedName;
    });
  }

  function applyFocusStyle(focusIdx, fadeOthers) {
    chartInstance.data.datasets.forEach(function (ds, i) {
      if (i === focusIdx) {
        ds.borderWidth = ds._meta.highlight ? 3 : 2.6;
        ds.borderColor = ds._meta.highlight_color || ds.backgroundColor;
        ds.pointBorderColor = ds.backgroundColor;
        ds.order = -1;
      } else if (fadeOthers) {
        ds.borderWidth = 1;
        ds.borderColor = addAlpha(ds.backgroundColor, 0.15);
        ds.pointBorderColor = addAlpha(ds.backgroundColor, 0.15);
        ds.order = 20;
      } else {
        var isHl = ds._meta.highlight;
        ds.borderColor = ds.backgroundColor;
        ds.borderWidth = isHl ? 2 : 1.5;
        ds.pointBorderColor = ds.backgroundColor;
        ds.order = isHl ? 0 : 10 + i;
      }
    });
    chartInstance.update('none');
  }

  function resetStyle() {
    chartInstance.data.datasets.forEach(function (ds, i) {
      var isHl = ds._meta.highlight;
      var color = ds.backgroundColor;
      ds.borderColor = color;
      ds.borderWidth = isHl ? 2 : 1.5;
      ds.pointBorderColor = color;
      ds.order = isHl ? 0 : 10 + i;
    });
    chartInstance.update('none');
  }

  function updateFocus() {
    if (!chartInstance) return;
    var pIdx = pinnedDatasetIndex();
    if (pIdx >= 0) {
      applyFocusStyle(pIdx, true);
    } else if (hoveredDatasetIndex !== null) {
      applyFocusStyle(hoveredDatasetIndex, false);
    } else {
      resetStyle();
    }
    updateChipFocusClass();
  }

  function setHoveredModel(name) {
    if (!chartInstance) return;
    if (!name) {
      if (hoveredDatasetIndex !== null) {
        hoveredDatasetIndex = null;
        updateFocus();
      }
      return;
    }
    var newIdx = chartInstance.data.datasets.findIndex(function (ds) {
      return ds.label === name;
    });
    if (newIdx < 0) return;
    if (newIdx !== hoveredDatasetIndex) {
      hoveredDatasetIndex = newIdx;
      updateFocus();
    }
  }

  function updateChipFocusClass() {
    var container = document.getElementById('psc-model-toggles');
    if (container) {
      container.querySelectorAll('.psc-toggle').forEach(function (btn) {
        var name = btn.dataset.model;
        if (name && name === pinnedName) btn.classList.add('pinned');
        else btn.classList.remove('pinned');
      });
    }
    var tbody = document.getElementById('psc-detail-tbody');
    if (tbody) {
      tbody.querySelectorAll('tr[data-model]').forEach(function (tr) {
        if (tr.dataset.model === pinnedName) tr.classList.add('pinned');
        else tr.classList.remove('pinned');
      });
    }
  }

  function renderPinBadge() {
    var chartBox = document.querySelector('.psc-chart-container');
    if (!chartBox) return;
    var badge = document.getElementById('psc-pin-badge');
    if (!pinnedName) {
      if (badge) badge.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'psc-pin-badge';
      badge.className = 'psc-pin-badge';
      chartBox.appendChild(badge);
    }
    badge.innerHTML = 'Focused: <strong>' + pinnedName + '</strong> <button class="psc-pin-clear" aria-label="Clear focus">\u2715</button>';
    badge.querySelector('.psc-pin-clear').addEventListener('click', function () {
      pinnedName = null;
      hoveredDatasetIndex = null;
      updateFocus();
      renderPinBadge();
    });
  }

  function addAlpha(color, alpha) {
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', ',' + alpha + ')');
    }
    if (color.startsWith('#')) {
      var rgb = hexToRgb(color);
      return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')';
    }
    return color;
  }

  // Model toggle buttons
  function renderToggles() {
    var container = document.getElementById('psc-model-toggles');
    if (!container) return;
    container.innerHTML = '';

    // "All" button
    var allBtn = document.createElement('button');
    allBtn.className = 'psc-toggle' + (activeModels.size === PSC_DATA.series.length ? ' active' : '');
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', function () {
      if (activeModels.size === PSC_DATA.series.length) {
        activeModels.clear();
      } else {
        PSC_DATA.series.forEach(function (s) { activeModels.add(s.display_name); });
      }
      renderToggles();
      renderChart();
      renderDetailTable();
    });
    container.appendChild(allBtn);

    PSC_DATA.series.forEach(function (s, i) {
      var btn = document.createElement('button');
      var color = getColor(s, i, PSC_DATA.series.length);
      var isActive = activeModels.has(s.display_name);
      btn.className = 'psc-toggle' + (isActive ? ' active' : '');
      btn.dataset.model = s.display_name;
      btn.innerHTML = '<span class="psc-toggle-dot" style="background:' + color + '"></span>' + s.display_name;
      if (isActive) {
        btn.style.borderColor = color;
      }
      btn.addEventListener('click', function () {
        if (activeModels.has(s.display_name)) {
          activeModels.delete(s.display_name);
        } else {
          activeModels.add(s.display_name);
        }
        renderToggles();
        renderChart();
        renderDetailTable();
      });
      container.appendChild(btn);
    });
  }

  // Detail score table
  function renderDetailTable() {
    var tbody = document.getElementById('psc-detail-tbody');
    if (!tbody) return;
    // 表格列顺序改为 100% → 65%（去掉 60%），按 100% 阈值分数降序排
    // 原 task_pass_rates 索引：0=60%, 1=65%, ..., 8=100%
    var COL_ORDER = [8, 7, 6, 5, 4, 3, 2, 1];

    var rows = PSC_DATA.series
      .filter(function (s) { return activeModels.has(s.display_name); })
      .sort(function (a, b) { return b.task_pass_rates[8] - a.task_pass_rates[8]; });

    tbody.innerHTML = rows.map(function (s, idx) {
      var color = s.highlight && s.highlight_color ? s.highlight_color : '';
      var nameStyle = color ? ' style="color:' + color + ';font-weight:700"' : '';
      var rankClass = idx < 3 ? ' class="psc-rank-' + (idx + 1) + '"' : '';
      var cells = COL_ORDER.map(function (i, ci) {
        var v = s.task_pass_rates[i].toFixed(1);
        return ci === 0
          ? '<td><strong>' + v + '%</strong></td>'
          : '<td>' + v + '%</td>';
      }).join('');
      return '<tr data-model="' + s.display_name.replace(/"/g, '&quot;') + '">' +
        '<td' + rankClass + '>' + (idx + 1) + '</td>' +
        '<td' + nameStyle + '>' + s.display_name + '</td>' +
        cells +
        '</tr>';
    }).join('');

    tbody.onmouseover = function (e) {
      var tr = e.target.closest('tr[data-model]');
      if (!tr) return;
      setHoveredModel(tr.dataset.model);
    };
    tbody.onmouseleave = function () {
      setHoveredModel(null);
    };
    tbody.onclick = function (e) {
      var tr = e.target.closest('tr[data-model]');
      if (!tr) return;
      var name = tr.dataset.model;
      if (pinnedName === name) {
        pinnedName = null;
        hoveredDatasetIndex = null;
      } else {
        pinnedName = name;
      }
      updateFocus();
      renderPinBadge();
    };
  }

  renderToggles();
  renderChart();
  renderDetailTable();
})();
