document.addEventListener('DOMContentLoaded', function () {
  function addWiggleOnClick(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('click', function () {
        el.classList.remove('wiggle'); 
        void el.offsetWidth;
        el.classList.add('wiggle');
      });
    });
  }
  addWiggleOnClick('img[alt="Chair"]');
  addWiggleOnClick('img[alt="Table"]');
});
