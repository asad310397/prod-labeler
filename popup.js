// popup.js
document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.includes("sesimi.app") || tab.url.includes("myadboxapp")) {
    document.getElementById("tabTitle").textContent = `danger`;
    chrome.action.setIcon({ path: "./danger.png" });
  } else if (tab.url.includes("sesimi.io") || tab.url.includes("adboxapp")) {
    document.getElementById("tabTitle").textContent = `warning`;
    chrome.action.setIcon({ path: "./warning.png" });
  } else {
    document.getElementById("tabTitle").textContent = `safe`;
    chrome.action.setIcon({ path: "./safe.png" });
  }
});
