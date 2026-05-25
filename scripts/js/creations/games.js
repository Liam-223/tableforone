// SCRIPT BY - LIAM
//

const games = [
  {
    title: 'Climbbound - Idle Mountain Climber',
    image: 'assets/games/Climbbound/banner.webp',
    alt: 'Idle Mountain Climber banner',
    link: 'https://liam-223.itch.io/climbbound'
  }
];

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';

  const link = document.createElement('a');
  link.href = game.link;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', `Open ${game.title} on itch.io`);

  const image = document.createElement('img');
  image.src = game.image;
  image.alt = game.alt;
  image.className = 'game-banner';

  link.appendChild(image);

  const info = document.createElement('div');
  info.className = 'game-info';

  const title = document.createElement('h3');
  title.textContent = game.title;

  info.appendChild(title);
  card.appendChild(link);
  card.appendChild(info);

  return card;
}

function renderGames() {
  const root = document.getElementById('game-root');
  if (!root) return;

  root.innerHTML = '';
  games.forEach(game => root.appendChild(createGameCard(game)));
}

document.addEventListener('DOMContentLoaded', renderGames);
