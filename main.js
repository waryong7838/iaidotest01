// ===== 다크/라이트 모드 =====
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== 언어 전환 (KO / EN) =====
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'ko';

function applyLang(lang) {
  document.querySelectorAll('[data-ko]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ko;
  });
  document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
  langToggle.textContent = lang === 'en' ? 'KO' : 'EN';
  localStorage.setItem('lang', lang);
  currentLang = lang;
}

if (currentLang === 'en') applyLang('en');

langToggle.addEventListener('click', () => {
  applyLang(currentLang === 'ko' ? 'en' : 'ko');
});

// ===== 모바일 네비게이션 토글 =====
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '64px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(10,10,10,0.97)';
    navLinks.style.padding = '1.5rem 2rem';
    navLinks.style.gap = '1.5rem';
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) navLinks.style.display = 'none';
  });
});

// ===== 섹션 스크롤 애니메이션 =====
const styleEl = document.createElement('style');
styleEl.textContent = `.section.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleEl);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(24px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
