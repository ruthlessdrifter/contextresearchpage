/**
 * Generic leaderboard renderer.
 * Both CL-bench and CLBench-Life use this shared module.
 */
function createLeaderboard(config) {
  var data = config.data;
  var catLabels = config.catLabels;
  var detailCats = config.detailCats;
  var maxScore = config.maxScore || 0.3;
  var containerId = config.containerId;
  var tbodyId = config.tbodyId;
  var scoreHeaderId = config.scoreHeaderId;
  var countElId = config.countElId;
  var orgFilterSelector = config.orgFilterSelector;
  var reasonFilterSelector = config.reasonFilterSelector;
  var catTabSelector = config.catTabSelector;
  var toggleFnName = config.toggleFnName;
  var singleRunClass = config.singleRunClass || 'clb-single-run';
  var isHighReasoningFn = config.isHighReasoningFn;

  var container = document.getElementById(containerId);
  if (!container) return;

  var currentCat = 'overall';
  var orgFilter = 'all';
  var reasonFilter = 'all';
  var expandedModels = new Set();

  function isSingleRun(item) {
    return config.stdFields.every(function(f) { return item[f] === 0; });
  }

  function getFiltered() {
    return data.filter(function(d) {
      if (orgFilter !== 'all' && d.org !== orgFilter) return false;
      if (reasonFilter === 'high' && !isHighReasoningFn(d.model)) return false;
      if (reasonFilter === 'low' && isHighReasoningFn(d.model)) return false;
      return true;
    });
  }

  function render() {
    var filtered = getFiltered();
    filtered.sort(function(a, b) { return b[currentCat] - a[currentCat]; });

    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    tbody.innerHTML = filtered.map(function(item, i) {
      var rank = i + 1;
      var rc = rank <= 3 ? ' clb-rank-' + rank : '';
      var v = item[currentCat];
      var s = item[currentCat + '_std'];
      var barW = (v / maxScore) * 100;
      var stdW = (s / maxScore) * 100;
      var errL = Math.max(barW - stdW, 0);
      var errW = stdW * 2;
      var expanded = expandedModels.has(item.model);
      var single = isSingleRun(item);
      var dagger = single ? '<sup class="' + singleRunClass + '" title="Single run (no std available)">\u2020</sup>' : '';

      var scoreHtml = single
        ? (v * 100).toFixed(1) + '%' + dagger
        : (v * 100).toFixed(1) + '% <span class="clb-score-std">\u00b1' + (s * 100).toFixed(1) + '%</span>';

      var detailHtml = detailCats.map(function(c) {
        var cv = item[c];
        var cs = item[c + '_std'];
        var cbar = (cv / maxScore) * 100;
        var detailScore = single
          ? (cv * 100).toFixed(1) + '%'
          : (cv * 100).toFixed(1) + '% <span class="std">\u00b1' + (cs * 100).toFixed(1) + '%</span>';
        return '<div class="clb-detail-item">' +
          '<div class="clb-detail-label">' + catLabels[c] + '</div>' +
          '<div class="clb-detail-value">' + detailScore + '</div>' +
          '<div class="clb-mini-bar"><div class="clb-mini-bar-fill clb-bar-' + item.org + '" style="width:' + cbar + '%"></div></div>' +
        '</div>';
      }).join('');

      return '<tr>' +
        '<td class="clb-rank' + rc + '">' + rank + '</td>' +
        '<td class="clb-model-name">' + item.model + dagger + '</td>' +
        '<td class="clb-model-org">' + item.org + '</td>' +
        '<td class="clb-score-cell">' +
          '<div class="clb-score-text">' + scoreHtml + '</div>' +
          '<div class="clb-bar-wrap">' +
            '<div class="clb-bar clb-bar-' + item.org + '" style="width:' + barW + '%"></div>' +
            (single ? '' :
            '<div class="clb-error-bar" style="left:' + errL + '%;width:' + errW + '%">' +
              '<div class="clb-error-cap"></div><div class="clb-error-line"></div><div class="clb-error-cap"></div>' +
            '</div>') +
          '</div>' +
        '</td>' +
        '<td><button class="clb-expand-btn' + (expanded ? ' open' : '') + '" onclick="' + toggleFnName + '(\'' + item.model.replace(/'/g, "\\'") + '\')">\u25BC</button></td>' +
      '</tr>' +
      '<tr class="clb-detail-row"><td colspan="5"><div class="clb-detail-grid' + (expanded ? ' visible' : '') + '">' + detailHtml + '</div></td></tr>';
    }).join('');

    var countEl = document.getElementById(countElId);
    if (countEl) countEl.textContent = filtered.length;
  }

  window[toggleFnName] = function(model) {
    if (expandedModels.has(model)) expandedModels.delete(model);
    else expandedModels.add(model);
    render();
  };

  container.querySelectorAll(orgFilterSelector + ' .clb-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      container.querySelectorAll(orgFilterSelector + ' .clb-filter').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      orgFilter = btn.dataset.org;
      render();
    });
  });

  container.querySelectorAll(reasonFilterSelector + ' .clb-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      container.querySelectorAll(reasonFilterSelector + ' .clb-filter').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      reasonFilter = btn.dataset.reason;
      render();
    });
  });

  container.querySelectorAll(catTabSelector + ' .clb-cat-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      container.querySelectorAll(catTabSelector + ' .clb-cat-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentCat = tab.dataset.cat;
      var h = document.getElementById(scoreHeaderId);
      if (h) h.textContent = catLabels[currentCat] + ' (\u00b1std)';
      render();
    });
  });

  render();
}
