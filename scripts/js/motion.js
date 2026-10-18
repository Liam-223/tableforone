(() => {
  const app = window.TableForOne ??= {};

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const motionAnimations = new Set();

  function trackAnimation(animation) {
    motionAnimations.add(animation);
    const remove = () => motionAnimations.delete(animation);
    animation.finished.then(remove, remove);
  }

  function animateElement(element, delay = 0, keyframes, easing = 'cubic-bezier(.16,1,.3,1)') {
    if (!element || motionPreference.matches || !element.animate) return;
    const frames = keyframes || [
      { opacity: 0, transform: 'translateY(22px)', filter: 'blur(6px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
    ];
    const finalFrame = { ...frames[frames.length - 1] };
    const staticStyle = getComputedStyle(element);
    ['opacity', 'transform', 'filter'].forEach(property => {
      if (property in finalFrame) finalFrame[property] = staticStyle[property];
    });
    const animation = element.animate(
      [...frames.slice(0, -1), finalFrame],
      { duration: 1050, delay, easing, fill: 'both' }
    );
    trackAnimation(animation);
    animation.addEventListener('finish', () => animation.cancel(), { once: true });
  }
  function initMotion() {
    document.querySelectorAll('.site-header nav .nav-link, #theme-toggle').forEach((element, index) => {
      animateElement(element, index * 55, [
        { opacity: 0, transform: 'translateY(-10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ]);
    });
    document.querySelectorAll('#hero-title > .title-line').forEach((element, index) => {
      animateElement(element, index * 150, [
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0 0 0)' }
      ], 'cubic-bezier(.65,0,.35,1)');
    });
    animateElement(document.querySelector('.chair-button'), 430, [
      { opacity: 0, transform: 'translateY(34px) rotate(-8deg) scale(.9)' },
      { opacity: 1, transform: 'translateY(0) rotate(0) scale(1)' }
    ]);
    animateElement(document.querySelector('.table-img'), 560, [
      { opacity: 0, transform: 'translateY(26px) scale(.92)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ]);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateElement(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: .12 });
      document.querySelectorAll('.category-disclosure').forEach(element => observer.observe(element));
    }
    motionPreference.addEventListener('change', () => {
      if (motionPreference.matches) motionAnimations.forEach(animation => animation.cancel());
    });
  }

  app.motionPreference = motionPreference;
  app.trackAnimation = trackAnimation;
  app.initMotion = initMotion;
})();
