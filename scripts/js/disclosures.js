(() => {
  const app = window.TableForOne ??= {};

  const { motionPreference } = app;

  const disclosures = new Map();

  class SmoothDisclosure {
    constructor(details) {
      this.details = details;
      this.summary = details.querySelector(':scope > summary');
      this.content = this.summary.nextElementSibling;
      this.contentElements = [...details.children].filter(element => element !== this.summary);
      this.expanded = details.open;
      this.animation = null;
      this.summary.addEventListener('click', event => {
        if (event.target.closest('summary') !== this.summary) return;
        event.preventDefault();
        this.setExpanded(!this.expanded);
      });
      this.syncState();
      if ('ResizeObserver' in window && this.content) {
        new ResizeObserver(() => {
          if (this.animation && this.expanded) this.setExpanded(true);
        }).observe(this.content);
      }
    }

    syncState() {
      this.details.dataset.expanded = String(this.expanded);
      this.summary.setAttribute('aria-expanded', String(this.expanded));
      this.contentElements.forEach(element => { element.inert = !this.expanded; });
    }

    settle() {
      this.details.open = this.expanded;
      this.animation?.cancel();
      this.animation = null;
      this.details.style.height = '';
      this.details.style.overflow = '';
      this.syncState();
    }

    setExpanded(expanded) {
      const startHeight = this.details.getBoundingClientRect().height;
      this.animation?.cancel();
      this.animation = null;
      this.expanded = expanded;
      this.syncState();
      if (motionPreference.matches || !this.details.animate) {
        this.settle();
        return;
      }
      this.details.open = true;
      this.details.style.height = 'auto';
      const borderHeight = this.details.getBoundingClientRect().height - this.details.clientHeight;
      const endHeight = expanded
        ? this.details.getBoundingClientRect().height
        : this.summary.getBoundingClientRect().height + borderHeight;
      this.details.style.height = startHeight + 'px';
      this.details.style.overflow = 'hidden';
      const animation = this.details.animate(
        [{ height: startHeight + 'px' }, { height: endHeight + 'px' }],
        { duration: 550, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
      );
      this.animation = animation;
      animation.onfinish = () => {
        if (this.animation === animation) this.settle();
      };
    }
  }
  function prepareDisclosures() {
    document.querySelectorAll('details').forEach(details => {
      if (!disclosures.has(details)) disclosures.set(details, new SmoothDisclosure(details));
    });
  }

  function revealSection(id) {
    const section = document.getElementById(id);
    if (section?.tagName === 'DETAILS') {
      const disclosure = disclosures.get(section);
      if (disclosure && !disclosure.expanded) disclosure.setExpanded(true);
      else if (!disclosure) section.open = true;
    }
  }

  function initDisclosures() {
    prepareDisclosures();
    addEventListener('resize', () => disclosures.forEach(disclosure => {
      if (disclosure.animation) disclosure.settle();
    }));
    motionPreference.addEventListener('change', () => {
      if (motionPreference.matches) disclosures.forEach(disclosure => disclosure.settle());
    });
  }

  app.revealSection = revealSection;
  app.initDisclosures = initDisclosures;
})();
