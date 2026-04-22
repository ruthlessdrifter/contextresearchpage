// ===== Case Modal =====
(function () {
  var CATEGORY_TITLES = {
    'Interpersonal Interaction': 'Communication & Social Interactions',
    'Thought Organization Reconstruction': 'Fragmented Information & Revisions',
    'Behavior Trails': 'Behavioral Records & Activity Trails'
  };

  var overlay, titleEl, categoryEl, summaryEl, contentEl;
  var messagesBodyEl, messagesCountEl, rubricsBodyEl, rubricsCountEl;
  var currentCase = null;

  function init() {
    overlay = document.getElementById('case-modal-overlay');
    titleEl = overlay.querySelector('.case-modal-title');
    categoryEl = overlay.querySelector('.case-modal-category');
    summaryEl = overlay.querySelector('.case-modal-summary');
    contentEl = overlay.querySelector('.case-modal-content');
    messagesBodyEl = overlay.querySelector('#cm-messages-body');
    messagesCountEl = overlay.querySelector('#cm-messages-count');
    rubricsBodyEl = overlay.querySelector('#cm-rubrics-body');
    rubricsCountEl = overlay.querySelector('#cm-rubrics-count');

    overlay.querySelector('.case-modal-close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) close();
    });

    document.querySelectorAll('.life-case[data-case-index]').forEach(function (card) {
      var viewBtn = card.querySelector('.life-case-view-full');
      if (viewBtn) {
        viewBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var source = card.dataset.caseSource || 'life';
          openCase(parseInt(card.dataset.caseIndex, 10), source);
        });
      }
    });
  }

  function openCase(index, source) {
    source = source || 'life';
    var dataset = source === 'clb'
      ? (typeof CLB_CASE_DATA !== 'undefined' ? CLB_CASE_DATA : null)
      : (typeof CASE_DATA !== 'undefined' ? CASE_DATA : null);
    if (!dataset || !dataset[index]) return;
    currentCase = dataset[index];
    var displayTitle = CATEGORY_TITLES[currentCase.category] || currentCase.category;
    titleEl.textContent = displayTitle;
    categoryEl.textContent = currentCase.subcategory +
      (currentCase.subsubcategory ? ' · ' + currentCase.subsubcategory : '');

    if (summaryEl) summaryEl.innerHTML = '';

    messagesCountEl.textContent = currentCase.messages.length;
    rubricsCountEl.textContent = currentCase.rubrics.length;

    messagesBodyEl.innerHTML = renderMessages();
    rubricsBodyEl.innerHTML = renderRubrics();
    bindExpandButtons();

    messagesBodyEl.scrollTop = 0;
    rubricsBodyEl.scrollTop = 0;

    overlay.style.display = 'flex';
    requestAnimationFrame(function () {
      overlay.classList.add('visible');
    });
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('visible');
    setTimeout(function () {
      overlay.style.display = 'none';
      messagesBodyEl.innerHTML = '';
      rubricsBodyEl.innerHTML = '';
      if (summaryEl) summaryEl.innerHTML = '';
      currentCase = null;
    }, 300);
    document.body.style.overflow = '';
  }

  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ── Messages ──
  var COLLAPSE_THRESHOLD = 1200;

  function renderMessages() {
    var parts = [];
    currentCase.messages.forEach(function (msg, i) {
      var roleClass = msg.role === 'user' ? 'cm-message--user' : 'cm-message--assistant';
      var icon = msg.role === 'user' ? 'U' : 'A';
      var label = msg.role === 'user' ? 'User' : 'Assistant';
      var text = msg.content || '';
      var needsTruncation = text.length > COLLAPSE_THRESHOLD;
      var truncClass = needsTruncation ? ' truncated' : '';

      parts.push(
        '<div class="cm-message ' + roleClass + '">' +
          '<div class="cm-message-header">' +
            '<span class="cm-message-role">' +
              '<span class="cm-message-role-icon">' + icon + '</span>' +
              '<span>' + label + '</span>' +
            '</span>' +
            '<span class="cm-message-meta">' +
              'Message ' + (i + 1) +
            '</span>' +
          '</div>' +
          '<div class="cm-message-body">' +
            '<div class="cm-message-text' + truncClass + '" data-msg-idx="' + i + '">' +
              esc(text) +
            '</div>' +
            '<button class="cm-expand-btn' + (needsTruncation ? ' show' : '') + '" data-msg-idx="' + i + '" type="button">' +
              '<span class="cm-expand-btn-label">Show full content</span>' +
              '<span class="cm-expand-btn-icon">\u25BE</span>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    });
    return parts.join('');
  }

  function bindExpandButtons() {
    messagesBodyEl.querySelectorAll('.cm-expand-btn.show').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = btn.dataset.msgIdx;
        var textEl = messagesBodyEl.querySelector('.cm-message-text[data-msg-idx="' + idx + '"]');
        if (!textEl) return;
        var isExpanded = textEl.classList.contains('expanded');
        var iconEl = btn.querySelector('.cm-expand-btn-icon');
        var labelEl = btn.querySelector('.cm-expand-btn-label');

        textEl.classList.toggle('expanded');
        textEl.classList.toggle('truncated');

        if (isExpanded) {
          labelEl.textContent = 'Show full content';
          if (iconEl) iconEl.style.transform = '';
        } else {
          labelEl.textContent = 'Collapse';
          if (iconEl) iconEl.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  // ── Rubrics ──
  function renderRubrics() {
    var items = currentCase.rubrics.map(function (r, i) {
      return { text: r, idx: i + 1 };
    });

    var lis = items.map(function (item) {
      return '<li class="cm-rubric-item">' +
        '<span class="cm-rubric-num">' + item.idx + '</span>' +
        '<div class="cm-rubric-body">' +
          '<span class="cm-rubric-text">' + esc(item.text) + '</span>' +
        '</div>' +
      '</li>';
    });
    return '<ol class="cm-rubrics-list">' + lis.join('') + '</ol>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
