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

const createElement = (list, url) => {
  const li = document.createElement("li");
  li.textContent = url;
  const button = document.createElement("button");
  button.classList.add("remove-button");
  button.textContent = "x";
  button.addEventListener("click", () => {
    chrome.storage.sync.get([list], (data) => {
      const updatedUrls = data[list].filter((item) => item !== url);
      chrome.storage.sync.set({ [list]: updatedUrls }, () => {
        populateUrls();
      });
    });
  });
  li.appendChild(button);
  return li;
};

const populateUrls = () => {
  const dangerList = document.getElementById("danger-list");
  const warningList = document.getElementById("warning-list");

  dangerList.innerHTML = "";
  warningList.innerHTML = "";

  chrome.storage.sync.get(["dangerUrls", "warningUrls"], (data) => {
    if (data.dangerUrls) {
      data.dangerUrls.forEach((url) => {
        let item = createElement("dangerUrls", url);
        console.log(item);
        dangerList.appendChild(item);
      });
    }
    if (data.warningUrls) {
      data.warningUrls.forEach((url) => {
        let item = createElement("warningUrls", url);
        console.log(item);
        warningList.appendChild(item);
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

  const accordions = document.getElementsByClassName("accordion-section");
  Array.from(accordions).forEach((item) => {
    item
      .getElementsByClassName("accordion-title")[0]
      .addEventListener("click", (e) => {
        let classes = item.classList;
        if (classes.contains("active")) {
          item.classList.remove("active");
        } else {
          item.classList.add("active");
        }
      });
  });
};

document.addEventListener("DOMContentLoaded", initialize);
