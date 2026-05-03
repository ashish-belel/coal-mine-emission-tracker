const themeToggleBtn = document.getElementById('theme-toggle-btn');
// const logoLight = document.querySelector('.logo-light');
const logoDark = document.querySelector('.logo-dark');
const storedTheme = localStorage.getItem('theme');
const body = document.body;

function updateTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    themeToggleBtn.classList.add('active');
    themeToggleBtn.innerHTML = '<span class="toggle-icon">☀️</span>';
    // logoLight.style.display = 'none';
    logoDark.style.display = 'block';
  } else {
    themeToggleBtn.classList.remove('active');
    themeToggleBtn.innerHTML = '<span class="toggle-icon">🌙</span>';
    // logoLight.style.display = 'block';
    logoDark.style.display = 'block';
  }
}

function initTheme() {
  const defaultTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  updateTheme(defaultTheme);
}

themeToggleBtn.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') || 'light';
  updateTheme(current === 'dark' ? 'light' : 'dark');
});

initTheme();
