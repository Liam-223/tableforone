(() => {
  const app = window.TableForOne ??= {};

  const albums = [
    {
      title: 'Viscera',
      description: 'A short experimental album.',
      type: 'Album',
      folder: 'Viscera',
      cover: 'COVER.webp',
      tracks: [
        { title: '#1 Light Headache' },
        { title: '#2 Glass Iris' },
        { title: '#3 Scraping Teeth' },
        { title: '#4 Heavy Breath' },
        { title: '#5 Flowing Blood' },
        { title: '#6 Knotted Intestines' },
        { title: '#7 Itch Cycle' },
        { title: '#8 Soft Collapse' },
      ]
    },
    {
      title: 'A Tales Tale',
      description: 'A short EP.',
      type: 'EP',
      folder: 'A Tales Tale',
      cover: 'COVER.webp',
      tracks: [
        { title: '#1 A Bell\'s Ringing' },
        { title: '#2 Day in the Circus' },
        { title: '#3 The Curious Poet' },
        { title: '#4 The Clockmaker\'s Dream' },
      ]
    },
    {
      title: 'This Side Up',
      description: 'Another short EP.',
      type: 'EP',
      folder: 'This Side Up',
      cover: 'COVER.webp',
      tracks: [
        { title: '#1 This Side Up' },
        { title: '#2 Someone Has Left the Light On' },
        { title: '#3 Common Area' },
        { title: '#4 Local Time' },
        { title: '#5 Last Known Position' },
      ]
    }
  ];

  const MUSIC_BASE_PATH = ['assets', 'music'];

  function buildAssetUrl(...segments) {
    return segments.map(segment => encodeURIComponent(segment)).join('/');
  }

  function createTrackItem(track) {
    const item = document.createElement('div');
    item.className = 'track-item';

    const title = document.createElement('div');
    title.className = 'track-title';
    title.textContent = track.title;

    const status = document.createElement('span');
    status.className = 'track-status tag tag-status';
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
    cover.src = buildAssetUrl(...MUSIC_BASE_PATH, album.type, album.folder, album.cover);
    cover.alt = `${album.title} ${album.type.toLowerCase()} cover`;
    cover.loading = 'lazy';
    cover.decoding = 'async';

    const details = document.createElement('div');
    details.className = 'music-details';

    const title = document.createElement('h3');
    title.textContent = album.title;

    const desc = document.createElement('p');
    desc.textContent = album.description;

    const status = document.createElement('div');
    status.className = 'release-status tag-list';
    const formatTag = document.createElement('span');
    formatTag.className = 'tag';
    formatTag.textContent = album.type;
    const progressTag = document.createElement('span');
    progressTag.className = 'tag tag-status';
    progressTag.textContent = 'In progress';
    status.append(formatTag, progressTag);

    const trackList = document.createElement('details');
    trackList.className = 'track-list';
    const summary = document.createElement('summary');
    summary.textContent = `Tracklist · ${album.tracks.length} tracks`;
    trackList.appendChild(summary);

    album.tracks.forEach(track => {
      trackList.appendChild(createTrackItem(track));
    });

    details.appendChild(title);
    details.appendChild(desc);
    details.appendChild(status);

    card.appendChild(cover);
    card.appendChild(details);
    card.appendChild(trackList);

    return card;
  }

  function renderAlbums() {
    const container = document.getElementById('music-root');
    if (!container) return;

    container.replaceChildren();
    albums.forEach(album => {
      container.appendChild(createAlbumCard(album));
    });
  }

  app.renderAlbums = renderAlbums;
})();
