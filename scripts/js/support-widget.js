const SUPPORT_BUBBLE_KEY = 'tablefor.one.supportBubbleDismissed';

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

  window.setTimeout(() => {
    const retryButton = document.getElementById('bmc-wbtn');
    if (retryButton && typeof retryButton.click === 'function') {
      retryButton.click();
    }
  }, 100);
}

function initSupportBubble() {
  const wrapper = document.getElementById('supportBubbleWrapper');
  if (!wrapper) return;

  if (localStorage.getItem(SUPPORT_BUBBLE_KEY) === 'true') {
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
    localStorage.setItem(SUPPORT_BUBBLE_KEY, 'true');
  });
}

document.addEventListener('DOMContentLoaded', initSupportBubble);
