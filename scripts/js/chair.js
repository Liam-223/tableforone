(() => {
  const app = window.TableForOne ??= {};

  const { motionPreference, trackAnimation } = app;

  function initChair() {
    const chairButton = document.querySelector('.chair-button');
    const tableButton = document.querySelector('.table-button');
    const chairSound = document.getElementById('chair-sound');
    chairSound.preload = 'auto';
    chairSound.volume = .55;
    function playSound() {
      chairSound.pause();
      chairSound.currentTime = 0;
      chairSound.play().catch(() => {});
    }
    let chairAnimation;
    chairButton.addEventListener('click', () => {
      playSound();
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
    let tableAnimation;
    tableButton.addEventListener('click', () => {
      playSound();
      if (motionPreference.matches || !tableButton.animate) return;
      tableAnimation?.cancel();
      tableAnimation = tableButton.animate(
        [
          { transform: 'rotate(0deg) translateX(0)', offset: 0 },
          { transform: 'rotate(-2deg) translateX(-2px)', offset: .22 },
          { transform: 'rotate(2deg) translateX(2px)', offset: .48 },
          { transform: 'rotate(-1deg) translateX(-1px)', offset: .75 },
          { transform: 'rotate(0deg) translateX(0)', offset: 1 }
        ],
        { duration: 720, easing: 'ease-in-out' }
      );
      trackAnimation(tableAnimation);
    });
  }

  app.initChair = initChair;
})();
