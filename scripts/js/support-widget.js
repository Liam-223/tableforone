const SUPPORT_BUBBLE_KEY = 'tablefor.one.supportBubbleDismissed.v2';

function openSupportWidget() {
  const widgetButton = document.getElementById('bmc-wbtn');
  if (widgetButton && typeof widgetButton.click === 'function') {
    widgetButton.click();
    return;
  }

  const trigger = document.querySelector('.bmc-btn, .bmc-button, .bmc-widget-button');
  if (trigger && typeof trigger.click === 'function') {
    trigger.click();
    return;
  }

  window.open('https://www.buymeacoffee.com/liam223', '_blank', 'noopener,noreferrer');
}

function initSupportBubble() {
  const wrapper = document.getElementById('supportBubbleWrapper');
  if (!wrapper) return;

  let dismissed = false;
  try { dismissed = localStorage.getItem(SUPPORT_BUBBLE_KEY) === 'true'; } catch {}
  if (dismissed) {
    wrapper.style.display = 'none';
    return;
  }

  const bubbleButton = document.getElementById('supportBubbleButton');
  const closeButton = document.getElementById('supportBubbleClose');

  if (bubbleButton) {
    bubbleButton.addEventListener('click', event => {
      event.preventDefault();
      openSupportWidget();
    });
  }

  if (!closeButton) return;
  closeButton.addEventListener('click', event => {
    event.stopPropagation();
    wrapper.style.display = 'none';
    try { localStorage.setItem(SUPPORT_BUBBLE_KEY, 'true'); } catch {}
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupportBubble, { once: true });
} else {
  initSupportBubble();
}
