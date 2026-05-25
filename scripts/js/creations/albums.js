// SCRIPT BY - LIAM
//

const albums = [
  {
    title: 'Viscera',
    description: 'A short experimental album. (still missing 2 tracks, some tracks are also not final)',
    folder: 'Viscera',
    cover: 'COVER.jpg',
    tracks: [
      { title: '#1 Light Headache' },
      { title: '#2 Glass Iris' },
      { title: '#3 Scraping Teeth' },
      { title: '#4 Heavy Breath' },
      { title: '#5 Flowing Blood' },
      { title: '#6 Knotted Intestines' }
    ]
  },
  {
    title: 'A Tales Tale',
    description: 'A short album. (also still missing 2 tracks, some tracks are also not final).',
    folder: 'A Tales Tale',
    cover: 'COVER.jpg',
    tracks: [
      { title: '#1 A Bell\'s Ringing' },
      { title: '#2 Day in the Circus' }
    ]
  }
];

const ALBUM_BASE_PATH = ['assets', 'music', 'Album'];

function buildAssetUrl(...segments) {
  return segments.map(segment => encodeURIComponent(segment)).join('/');
}

function createTrackItem(track) {
  const item = document.createElement('div');
  item.className = 'track-item';

  const title = document.createElement('div');
  title.className = 'track-title';
  title.textContent = track.title;

  const status = document.createElement('div');
  status.className = 'track-status';
  status.textContent = 'Coming soon';

  item.appendChild(title);
  item.appendChild(status);
  return item;
}

function createAlbumCard(album) {
  const card = document.createElement('div');
  card.className = 'music-album';

  const cover = document.createElement('img');
  cover.className = 'music-cover';
  cover.src = buildAssetUrl(...ALBUM_BASE_PATH, album.folder, album.cover);
  cover.alt = `${album.title} album cover`;

  const details = document.createElement('div');
  details.className = 'music-details';

  const title = document.createElement('h3');
  title.textContent = `${album.title} (Album - UNFINISHED)`;

  const desc = document.createElement('p');
  desc.textContent = album.description;

  const trackList = document.createElement('div');
  trackList.className = 'track-list';

  album.tracks.forEach(track => {
    trackList.appendChild(createTrackItem(track));
  });

  details.appendChild(title);
  details.appendChild(desc);
  details.appendChild(trackList);

  card.appendChild(cover);
  card.appendChild(details);

  return card;
}

function renderAlbums() {
  const container = document.getElementById('music-root');
  if (!container) return;

  container.innerHTML = '';
  albums.forEach(album => {
    container.appendChild(createAlbumCard(album));
  });
}

document.addEventListener('DOMContentLoaded', renderAlbums);
