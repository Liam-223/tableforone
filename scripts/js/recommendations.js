(() => {
  const app = window.TableForOne ??= {};

  const recommendations = [
    { name: 'Godot Engine', desc: 'My preferred tool for making games. A free, open-source engine for 2D and 3D projects.', link: 'https://godotengine.org/' },
    { name: 'Proton VPN', desc: 'A VPN I like, alongside the other Proton services.', link: 'https://protonvpn.com/', referral: 'https://pr.tn/ref/HN0M66BR' },
    { name: 'Cavalry', desc: 'A tool for motion graphics, animation, and visual stuff.', link: 'https://cavalry.studio/' },
    { name: 'Cosmos', desc: 'My alternative to Pinterest.', link: 'https://cosmos.so/' },
    { name: 'Synfig Studio', desc: 'Free, open-source 2D animation software.', link: 'https://www.synfig.org/' },
  ];

  function renderRecommendations() {
    const toolsRoot = document.getElementById('tools-root');
    if (!toolsRoot) return;
    toolsRoot.replaceChildren();
    recommendations.forEach(tool => {
      const article = document.createElement('article');
      article.className = 'tool-item';
      const link = document.createElement('a');
      link.href = tool.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = tool.name;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      link.appendChild(arrow);
      const description = document.createElement('p');
      description.textContent = tool.desc;
      article.append(link, description);
      if (tool.referral) {
        const referral = document.createElement('a');
        referral.className = 'referral';
        referral.href = tool.referral;
        referral.target = '_blank';
        referral.rel = 'noopener noreferrer';
        referral.textContent = 'My referral link ↗';
        article.appendChild(referral);
      }
      toolsRoot.appendChild(article);
    });
  }

  app.renderRecommendations = renderRecommendations;
})();
