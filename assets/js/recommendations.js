const recommendations = [
    {
    name: 'Godot Engine',
    desc: 'An open-source game engine for creating 2D and 3D games. Its great, I use it myself for "actual" games besides Roblox!!',
    link: 'https://godotengine.org/'
  },
  {
    name: 'Proton VPN',
    desc: 'A nice VPN service that can also be free if you dont wanna pay. Id also recommend their other services, I personally use them over providers like Google because they have much better privacy policies :)',
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
  const ul = document.querySelector('.recommendations ul');
  if (!ul) return;
  ul.innerHTML = '';
  recommendations.forEach(rec => {
    ul.appendChild(createRecommendationItem(rec));
  });
}

document.addEventListener('DOMContentLoaded', renderRecommendations);