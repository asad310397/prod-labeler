// Example: Change the background color of the active tab's body
document.body.style.backgroundColor = "lightblue";

// Example: Log the page title to the console
console.log("Active tab title:", document.title);

// You can also send messages back to the background script or popup
chrome.runtime.sendMessage({ action: "pageAnalyzed", title: document.title });
