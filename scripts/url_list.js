const addUrl = () => {
  const urlInput = document.getElementById("url-input");
  const typeSelect = document.getElementById("label-select");
  const url = urlInput.value.trim();
  const type = typeSelect.value;

  if (url) {
    if (type === "danger") {
      chrome.storage.sync.get(["dangerUrls"], (data) => {
        const updatedDangerUrls = data.dangerUrls
          ? [...data.dangerUrls, url]
          : [url];
        chrome.storage.sync.set({ dangerUrls: updatedDangerUrls }, () => {
          urlInput.value = "";
          populateUrls();
        });
      });
    } else if (type === "warning") {
      chrome.storage.sync.get(["warningUrls"], (data) => {
        const updatedWarningUrls = data.warningUrls
          ? [...data.warningUrls, url]
          : [url];
        chrome.storage.sync.set({ warningUrls: updatedWarningUrls }, () => {
          urlInput.value = "";
          populateUrls();
        });
      });
    }
  }
};

const populateUrls = () => {
  const dangerList = document.getElementById("danger-list");
  const warningList = document.getElementById("warning-list");

  dangerList.innerHTML = "";
  warningList.innerHTML = "";

  chrome.storage.sync.get(["dangerUrls", "warningUrls"], (data) => {
    if (data.dangerUrls) {
      data.dangerUrls.forEach((url) => {
        const li = document.createElement("li");
        li.textContent = url;
        dangerList.appendChild(li);
      });
    }
    if (data.warningUrls) {
      data.warningUrls.forEach((url) => {
        const li = document.createElement("li");
        li.textContent = url;
        warningList.appendChild(li);
      });
    }
  });
};

function loadLinks() {
  chrome.storage.sync.get(["dangerUrls", "warningUrls"], (data) => {
    if (data.dangerUrls) {
      dangerUrls = data.dangerUrls;
    }
    if (data.warningUrls) {
      warningUrls = data.warningUrls;
    }
    populateUrls();
  });
}

const initialize = () => {
  loadLinks();
  document.getElementById(`add`).addEventListener("click", () => addUrl());
};

document.addEventListener("DOMContentLoaded", initialize);
