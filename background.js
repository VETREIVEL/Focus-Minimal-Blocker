// background.js
const FOCUS_SITES = ["youtube.com", "instagram.com"];

function getTodayKey(site) {
  const today = new Date().toISOString().slice(0, 10); // e.g. 2025-08-05
  return `focusTime_${site}_${today}`;
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

// Run every minute
chrome.alarms.create("tick", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "tick") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      if (!tab || !tab.url) return;

      const domain = getDomain(tab.url);
      if (!FOCUS_SITES.includes(domain)) return;

      const key = getTodayKey(domain);
      chrome.storage.local.get([key], result => {
        const current = result[key] || 0;
        chrome.storage.local.set({ [key]: current + 1 });
      });
    });
  }
});
