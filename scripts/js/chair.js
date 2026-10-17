(() => {
  const app = window.TableForOne ??= {};

  const { motionPreference, trackAnimation } = app;

  function initChair() {
    const chairButton = document.querySelector('.chair-button');
    const chairSound = document.getElementById('chair-sound');
    chairSound.preload = 'auto';
    chairSound.volume = .55;
    let chairAnimation;
    chairButton.addEventListener('click', () => {
      chairSound.pause();
      chairSound.currentTime = 0;
      chairSound.play().catch(() => {});
      if (motionPreference.matches || !chairButton.animate) return;
      const startingPose = getComputedStyle(chairButton).transform;
      chairAnimation?.cancel();
      chairAnimation = chairButton.animate(
        [
          { transform: startingPose === 'none' ? 'rotate(0deg)' : startingPose, offset: 0 },
          { transform: 'rotate(-5deg) translateX(-2px)', offset: .24 },
          { transform: 'rotate(3deg) translateX(1px)', offset: .53 },
          { transform: 'rotate(-1deg)', offset: .76 },
          { transform: 'rotate(0deg)', offset: 1 }
        ],
        { duration: 850, easing: 'ease-in-out' }
      );
      const animation = chairAnimation;
      trackAnimation(animation);
    });
  }

  app.initChair = initChair;
})();
