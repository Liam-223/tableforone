// SCRIPT BY - LIAM
//

const games = [
  {
    title: 'Climbbound - Idle Mountain Climber',
    image: 'assets/games/Climbbound/banner.webp',
    alt: 'Idle Mountain Climber banner',
    link: 'https://liam-223.itch.io/climbbound',
    buttonText: 'Play on itch.io'
  }
];

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';

  const image = document.createElement('img');
  image.src = game.image;
  image.alt = game.alt;
  image.className = 'game-banner';

  const info = document.createElement('div');
  info.className = 'game-info';

  const title = document.createElement('h3');
  title.textContent = game.title;

  const action = document.createElement('a');
  action.href = game.link;
  action.target = '_blank';
  action.rel = 'noopener';
  action.className = 'game-action-link';
  action.textContent = game.buttonText;

  info.appendChild(title);
  info.appendChild(action);
  card.appendChild(image);
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
