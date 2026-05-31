const themeToggleBtn = document.getElementById('theme-toggle-btn');
// const logoLight = document.querySelector('.logo-light');
const logoDark = document.querySelector('.logo-dark');
const storedTheme = localStorage.getItem('theme');
const body = document.body;

function updateTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeToggleBtn) {
    if (theme === 'dark') {
      themeToggleBtn.classList.add('active');
      themeToggleBtn.innerHTML = '<span class="toggle-icon">☀️</span>';
    } else {
      themeToggleBtn.classList.remove('active');
      themeToggleBtn.innerHTML = '<span class="toggle-icon">🌙</span>';
    }
  }

  if (logoDark) {
    // show the dark logo when available; avoid assuming logoLight exists
    logoDark.style.display = 'block';
  }
}

function initTheme() {
  const defaultTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  updateTheme(defaultTheme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') || 'light';
    updateTheme(current === 'dark' ? 'light' : 'dark');
  });
}

initTheme();
