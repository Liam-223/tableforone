(() => {
  const app = window.TableForOne ??= {};

  function initTheme() {
    const themeRoot = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    function setTheme(theme) {
      themeRoot.dataset.theme = theme;
      const dark = theme === 'dark';
      themeButton.innerHTML = (dark ? 'Light' : 'Dark') + ' <span aria-hidden="true">◐</span>';
      themeButton.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' mode');
      document.querySelector('meta[name="theme-color"]').content = getComputedStyle(themeRoot).getPropertyValue('--bg').trim();
    }
    let savedTheme;
    try { savedTheme = localStorage.getItem('tablefor.one.theme.v2'); } catch {}
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
    themeButton.addEventListener('click', () => {
      const theme = themeRoot.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(theme);
      try { localStorage.setItem('tablefor.one.theme.v2', theme); } catch {}
    });
  }

  app.initTheme = initTheme;
})();
