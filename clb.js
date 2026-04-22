// ===== CLB Leaderboard =====
(function() {
  fetch('data/clb-data.json')
    .then(function(r) { return r.json(); })
    .then(function(clbData) {
      createLeaderboard({
        data: clbData,
        catLabels: {
          overall: "Overall",
          domain: "Domain Knowledge Reasoning",
          rule: "Rule System Application",
          procedural: "Procedural Task Execution",
          pattern: "Empirical Discovery & Simulation"
        },
        detailCats: ['domain', 'rule', 'procedural', 'pattern'],
        stdFields: ['overall_std', 'domain_std', 'rule_std', 'procedural_std', 'pattern_std'],
        maxScore: 0.3,
        containerId: 'clb-leaderboard',
        tbodyId: 'clb-tbody',
        scoreHeaderId: 'clb-score-header',
        countElId: 'clb-model-count',
        orgFilterSelector: '.clb-org-filters',
        reasonFilterSelector: '.clb-reasoning-filters',
        catTabSelector: '.clb-cat-tabs',
        toggleFnName: 'clbToggle',
        singleRunClass: 'clb-single-run',
        isHighReasoningFn: function(name) {
          var n = name.toLowerCase();
          return n.includes('thinking') || n.includes('(high)') || n.includes('(xhigh)');
        }
      });
    });
})();
