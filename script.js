const sections = [
  { id: 'section-main', bg: 'bg--main' },
  { id: 'section-clb',  bg: 'bg--clb' },
  { id: 'section-life', bg: 'bg--life' }
];

let currentBg = 'bg--main';

function switchBg(newBg) {
  if (newBg === currentBg) return;
  sections.forEach(s => document.body.classList.remove(s.bg));
  document.body.classList.add(newBg);
  currentBg = newBg;
}

function highlightSidebar(sectionId) {
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const s = sections.find(s => s.id === entry.target.id);
      if (s) {
        switchBg(s.bg);
        highlightSidebar(s.id);
      }
    }
  });
}, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});

// Sidebar click → smooth scroll
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile nav click → smooth scroll
document.querySelectorAll('.mobile-nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Logo click → scroll to top
const logoEl = document.querySelector('.sidebar-logo');
if (logoEl) {
  logoEl.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('section-main').scrollIntoView({ behavior: 'smooth' });
  });
}

// Project card clicks → smooth scroll (ignore clicks on nested resource links)
document.querySelectorAll('.hero-project-card[data-goto]').forEach(card => {
  function goToSection() {
    const map = { clb: 'section-clb', 'clb-life': 'section-life' };
    const target = document.getElementById(map[card.dataset.goto]);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
  card.addEventListener('click', (e) => {
    if (e.target.closest('.resource-link')) return;
    e.preventDefault();
    goToSection();
  });
  card.addEventListener('keydown', (e) => {
    if (e.target.closest('.resource-link')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToSection();
    }
  });
});

// Life case cards — toggle with keyboard + aria support
document.querySelectorAll('.life-case[role="button"]').forEach(card => {
  function toggle() {
    card.classList.toggle('open');
    card.setAttribute('aria-expanded', card.classList.contains('open'));
  }
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

