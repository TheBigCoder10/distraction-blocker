function blockClicksAndVideos() {
    const currentURL = window.location.href;
    const ryanVideosPage = 'https://www.youtube.com/@ryan/videos';
  
    const allowClicks = currentURL.startsWith(ryanVideosPage);
  
    const clickableSelectors = [
      'a[href*="/watch"]',         // YouTube
      'a[href*="/title"]',         // Netflix, Prime
      'a[href*="/movie"]',         // Hulu
      'a[href*="/series"]',        // Hulu, Disney+
      'a[href*="/video"]',
      'a[role="link"]',
      'button',
      '[data-uia]',
      '[aria-label*="Play"]',
      '[aria-label*="Watch"]'
    ];
  
    clickableSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (allowClicks) {
          // Restore interactivity on Ryan’s videos page
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
          el.title = 'Blocked by extension';
        }
      });
    });
  
    // Block playback unless on the allowed page
    if (!allowClicks) {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        video.pause();
        video.src = ''; // stop playback
      });
    }
  }
  
  // Initial run + rerun on DOM updates
  blockClicksAndVideos();
  const observer = new MutationObserver(blockClicksAndVideos);
  observer.observe(document.body, { childList: true, subtree: true });
  