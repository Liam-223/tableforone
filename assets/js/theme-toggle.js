const themeToggleButton = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggleButton.textContent = theme === 'dark' ? '☾' : '☀';
  themeToggleButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

function loadTheme() {
  const storedTheme = localStorage.getItem('site-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(theme);
}

function toggleTheme() {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('site-theme', nextTheme);
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', toggleTheme);
}

window.addEventListener('DOMContentLoaded', loadTheme);
