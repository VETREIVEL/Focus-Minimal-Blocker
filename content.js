function getRandomQuote() {
    const quotes = [
      "Don't watch the clock. Do what it does. Keep going.",
      "Small steps every day.",
      "Focus on what matters.",
      "Discipline is the bridge between goals and accomplishment.",
      "Stay focused. Stay sharp."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  function injectQuoteBox() {
    // Remove old quote box if it exists
    const oldQuote = document.getElementById("focus-mode-quote");
    if (oldQuote) {
      oldQuote.remove();
    }
  
    // Create new quote box
    const quoteBox = document.createElement("div");
    quoteBox.id = "focus-mode-quote";
    quoteBox.innerText = getRandomQuote();
    quoteBox.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #f1f1f1;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: sans-serif;
      max-width: 220px;
      font-size: 14px;
    `;
    document.body.appendChild(quoteBox);
  }
  
  
  function hideYouTubeDistractions() {
    const selectors = [
      '#related',
      '#comments',
      'ytd-reel-shelf-renderer',
      'ytd-rich-section-renderer',
      '#secondary',
      'ytd-watch-next-secondary-results-renderer',
      '.ytp-ce-element',
      'ytd-playlist-panel-renderer',
      '#playlist',
      'ytd-compact-video-renderer',
      'ytd-compact-autoplay-renderer',
      'ytd-merch-shelf-renderer',
      '#chat',
      '#chatframe',
      'ytd-live-chat-frame',
      'ytd-reel-video-renderer', // individual reels
      'ytd-reel-player-overlay-renderer',
      'ytd-reel-player-header-renderer',
      '#shorts-container',
      'ytd-shorts', // catch-all
      'ytd-reel-player-overlay-renderer',
      'ytd-engagement-panel-section-list-renderer',
      'ytd-reel-shelf-renderer',
      'tp-yt-paper-dialog',
      'ytd-rich-grid-slim-media',
      'ytd-reel-player-renderer'
    ];
  
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = 'none';
      });
    });
  
    // Optional: full redirect away from /shorts/
    if (window.location.pathname.startsWith("/shorts")) {
      window.location.href = "https://www.youtube.com";
    }
  
    injectQuoteBox();
  }
  
  function hideInstagramDistractions() {
    const selectors = [
      'main section > div:nth-child(2)',
      'nav[role="navigation"] + div',
      '._aagx',
      '[role="dialog"]',
      '[aria-label="Reels"]',
      '._ac7v',
      '._aam1'
    ];
  
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = 'none';
      });
    });
  
    injectQuoteBox();
  }
  
  // Run based on site
  if (window.location.hostname.includes("youtube.com")) {
    setInterval(hideYouTubeDistractions, 1000);
  } else if (window.location.hostname.includes("instagram.com")) {
    setInterval(hideInstagramDistractions, 1000);
  }




  function startFocusTimer(siteKey) {
    setInterval(() => {
      chrome.storage.local.get([siteKey], data => {
        const currentTime = data[siteKey] || 0;
        chrome.storage.local.set({ [siteKey]: currentTime + 1 });
      });
    }, 60000); // every 60 sec
  }
  
  chrome.storage.local.get([`focusMode_${hostname}`], result => {
    if (result[`focusMode_${hostname}`]) {
      startFocusTimer(`focusTime_${hostname}`);
    }
  });
  
  
  