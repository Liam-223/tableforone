(() => {
  const app = window.TableForOne ??= {};

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const motionAnimations = new Set();

  function trackAnimation(animation) {
    motionAnimations.add(animation);
    const remove = () => motionAnimations.delete(animation);
    animation.finished.then(remove, remove);
  }

  function animateElement(element, delay = 0) {
    if (!element || motionPreference.matches || !element.animate) return;
    const animation = element.animate(
      [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 750, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }
    );
    trackAnimation(animation);
  }
  function initMotion() {
    document.querySelectorAll('#hero-title > span, .hero-scene').forEach((element, index) => {
      animateElement(element, index * 75);
    });
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
