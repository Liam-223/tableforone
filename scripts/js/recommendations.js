// SCRIPT BY - LIAM
//

const recommendations = [
    {
    name: 'Godot Engine',
    desc: 'An open-source game engine for creating 2D and 3D games. Its great, I use it myself for "actual" games besides Roblox!!',
    link: 'https://godotengine.org/'
  },
  {
    name: 'Proton VPN',
    desc: 'A nice VPN service that can also be free if you dont wanna pay. Id also recommend their other services, I personally use them over providers like Google because they have much better privacy policies (You can even use MY LINK for a 14 Days free trial of their paid plan https://pr.tn/ref/HN0M66BR):',
    link: 'https://protonvpn.com/'
  },
  {
    name: 'Cavalry',
    desc: 'A nice graphic tool that just recently got bought and made free by Canva, used for creating animations and visual effects. (also pls make sure that when you create a Canva account that you turn off pretty much everything that has to do with data collection)',
    link: 'https://cavalry.studio/'
  },
  { 
    name: 'Cosmos',
    desc: 'A site similar to Pinterest but in my opinion just nicer.',
    link: 'https://cosmos.so/'
  },
  { 
    name: 'Synfig Studio',
    desc: 'A free and open-source 2D animation software. It is soooo good for a free program.',
    link: 'https://www.synfig.org/'
  },
  { 
    name: 'Keep Android Open',
    desc: 'Something important for Android users who want to maintain control over their devices!!',
    link: 'https://keepandroidopen.org/'
  },
];

function createRecommendationItem({ name, desc, link }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.textContent = name;
  a.addEventListener('click', function () {
    showModal(name, desc, link);
  });
  li.appendChild(a);
  return li;
}

function renderRecommendations() {
  const ul = document.querySelector('.recommendations-panel ul');
  if (!ul) return;
  ul.innerHTML = '';
  recommendations.forEach(rec => {
    ul.appendChild(createRecommendationItem(rec));
  });
}

function markHomeImagesReady() {
  const homePage = document.getElementById('page-home');
  if (!homePage) return;

  const homeImages = homePage.querySelectorAll('img');
  if (!homeImages.length) {
    homePage.classList.add('home-ready');
    return;
  }

  const allLoaded = Array.from(homeImages).every(img => img.complete && img.naturalWidth > 0);
  if (allLoaded) {
    homePage.classList.add('home-ready');
  }
}

function openRecommendations() {
  const panel = document.getElementById('recommendations-panel');
  const trigger = document.querySelector('.recommendations-trigger');
  if (!panel || !trigger) return;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  trigger.setAttribute('aria-expanded', 'true');
  trigger.classList.add('is-open');
}

function closeRecommendations() {
  const panel = document.getElementById('recommendations-panel');
  const trigger = document.querySelector('.recommendations-trigger');
  if (!panel || !trigger) return;
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('is-open');
}

function toggleRecommendations() {
  const panel = document.getElementById('recommendations-panel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    closeRecommendations();
  } else {
    openRecommendations();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderRecommendations();

  const homePage = document.getElementById('page-home');
  const homeImages = homePage ? homePage.querySelectorAll('img') : [];

  const checkIfHomeReady = () => {
    const allImagesLoaded = Array.from(homeImages).every(img => img.complete && img.naturalWidth > 0);
    if (allImagesLoaded) {
      homePage?.classList.add('home-ready');
    }
  };

  homeImages.forEach(img => {
    img.addEventListener('load', checkIfHomeReady, { once: true });
    img.addEventListener('error', checkIfHomeReady, { once: true });
  });

  checkIfHomeReady();

  const trigger = document.querySelector('.recommendations-trigger');
  const closeButton = document.querySelector('.recommendations-close');

  trigger?.addEventListener('click', toggleRecommendations);
  closeButton?.addEventListener('click', closeRecommendations);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || target.closest('.recommendations-trigger')) return;
    if (target.closest('.recommendations-panel')) return;
    closeRecommendations();
  });
});