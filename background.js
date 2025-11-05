// Listen for when the active tab changes within the current window
chrome.tabs.onActivated.addListener((activeInfo) => {
  updateIcon();
});

// Listen for when a tab's content finishes loading (e.g., navigation to a new page within the same tab)
// and its properties like URL change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab && changeInfo.status === "complete" && tab.active) {
    updateIcon();
  }
});
async function updateIcon() {
  let icon = "";
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (
    tab.url.includes("chrome://") ||
    tab.url.includes("edge://") ||
    tab.url.includes("about:")
  ) {
    chrome.action.setIcon({ path: `assets/safe.png`, tabId: tab.id });
    return;
  }

  if (tab.url.includes("sesimi.app") || tab.url.includes("myadboxapp")) {
    icon = "danger";
  } else if (tab.url.includes("sesimi.io") || tab.url.includes("adboxapp")) {
    icon = "warning";
  } else {
    icon = "safe";
  }
  chrome.action.setIcon({ path: `assets/${icon}.png`, tabId: tab.id });
}

updateIcon();
