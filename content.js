function blockClicksAndVideos() {
  // Get Eastern Time hour (24h format)
  const now = new Date();
  const hourEST = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false
  }).format(now));

  // Only allow between 8 PM and 8 AM EST
  const isAllowedTime = (hourEST >= 20 || hourEST < 8);

  const clickableSelectors = [
    'a[href*="/watch"]',
    'a[href*="/title"]',
    'a[href*="/movie"]',
    'a[href*="/series"]',
    'a[href*="/video"]',
    'a[role="link"]',
    'button',
    '[data-uia]',
    '[aria-label*="Play"]',
    '[aria-label*="Watch"]'
  ];

  clickableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (isAllowedTime) {
        el.style.pointerEvents = '';
        el.style.opacity = '';
        el.title = '';
      } else {
        el.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
        }, true);
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.4';
        el.title = 'Blocked until 8:00 PM EST';
      }
    });
  });

  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (isAllowedTime) {
      if (video.src === '') video.load(); // Try to restore if previously blanked
    } else {
      video.pause();
      video.src = '';
    }
  });
}

blockClicksAndVideos();
const observer = new MutationObserver(blockClicksAndVideos);
observer.observe(document.body, { childList: true, subtree: true });
