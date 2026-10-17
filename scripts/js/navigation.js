(() => {
  const app = window.TableForOne ??= {};

  const { revealSection } = app;

  function initNavigation() {
    const headerSlot = document.querySelector('.header-slot');
    const header = document.querySelector('.site-header');
    const home = document.getElementById('home');
    const legacySections = { creations: 'work', games: 'games', apps: 'apps', art: 'art', shop: 'work', music: 'music', about: 'about', home: 'home' };
    const page = new URLSearchParams(location.search).get('page');
    const oldHash = location.hash.slice(1);
    const destination = legacySections[page] || (['creations', 'shop'].includes(oldHash) ? legacySections[oldHash] : null);
    if (destination) {
      history.replaceState(null, '', location.pathname + '#' + destination);
      requestAnimationFrame(() => {
        revealSection(destination);
        document.getElementById(destination)?.scrollIntoView();
      });
    }
    revealSection(location.hash.slice(1));
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => revealSection(link.hash.slice(1)));
    });
    addEventListener('hashchange', () => revealSection(location.hash.slice(1)));
    const navigation = [...document.querySelectorAll('.nav-link')];
    const sections = navigation.map(link => document.querySelector(link.getAttribute('href')));
    function updateNavigation() {
      header.classList.toggle(
        'is-compact',
        home.getBoundingClientRect().bottom <= headerSlot.offsetHeight
      );
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= innerHeight * .35) current = section;
      }
      for (const link of navigation) {
        const active = link.hash === '#' + current.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
    let scheduled = false;
    addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
    }, { passive: true });
    addEventListener('resize', updateNavigation);
    updateNavigation();
  }

  app.initNavigation = initNavigation;
})();
