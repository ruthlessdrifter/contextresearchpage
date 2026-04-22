// ===== CLBench-Life Leaderboard =====
(function() {
  fetch('data/life-data.json')
    .then(function(r) { return r.json(); })
    .then(function(lifeData) {
      createLeaderboard({
        data: lifeData,
        catLabels: {
          overall: "Overall",
          interpersonal: "Communication & Social Interactions",
          thought: "Fragmented Information & Revisions",
          behavior: "Behavioral Records & Activity Trails"
        },
        detailCats: ['interpersonal', 'thought', 'behavior'],
        stdFields: ['overall_std', 'interpersonal_std', 'thought_std', 'behavior_std'],
        maxScore: 0.25,
        containerId: 'life-leaderboard',
        tbodyId: 'life-tbody',
        scoreHeaderId: 'life-score-header',
        countElId: 'life-model-count',
        orgFilterSelector: '.life-org-filters',
        reasonFilterSelector: '.life-reasoning-filters',
        catTabSelector: '.life-cat-tabs',
        toggleFnName: 'lifeToggle',
        singleRunClass: 'life-single-run',
        isHighReasoningFn: function(name) {
          var n = name.toLowerCase();
          if (n.includes('(nothink)') || n.includes('(non-reasoning)')) return false;
          return n.includes('thinking') ||
                 n.includes('(xhigh)') ||
                 n.includes('(high)') ||
                 n.includes('(medium)') ||
                 n.includes('(low)');
        }
      });
    });
})();
