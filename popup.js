document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleFocus');
    const statusText = document.getElementById('statusText');
    const whitelistBtn = document.getElementById('whitelistBtn');
    const focusTimeEl = document.getElementById('focusTime');
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname.replace('www.', '');
  
      const focusKey = `focusMode_${hostname}`;
      const timeKey = `focusTime_${hostname}`;
  
      // Load focus mode toggle and time
      chrome.storage.local.get([focusKey, timeKey, 'whitelist'], (data) => {
        toggle.checked = data[focusKey] || false;
        statusText.textContent = `Focus Mode: ${toggle.checked ? 'ON' : 'OFF'}`;
        focusTimeEl.textContent = `Focus Time Today: ${data[timeKey] || 0} mins`;
  
        // Check if already whitelisted
        const whitelist = data.whitelist || [];
        if (whitelist.includes(hostname)) {
          whitelistBtn.disabled = true;
          whitelistBtn.textContent = "Whitelisted";
        }
      });
  
      // Toggle handler
      toggle.addEventListener('change', () => {
        const isOn = toggle.checked;
        chrome.storage.local.set({ [focusKey]: isOn });
        statusText.textContent = `Focus Mode: ${isOn ? 'ON' : 'OFF'}`;
        chrome.runtime.sendMessage({ action: 'refreshContentScript' });
      });
  
      // Whitelist button
      whitelistBtn.addEventListener('click', () => {
        chrome.storage.local.get(['whitelist'], (data) => {
          const whitelist = data.whitelist || [];
          if (!whitelist.includes(hostname)) {
            whitelist.push(hostname);
            chrome.storage.local.set({ whitelist });
            whitelistBtn.disabled = true;
            whitelistBtn.textContent = "Whitelisted";
            alert(`${hostname} added to whitelist!`);
          }
        });
      });
    });
  });
  