let dangerUrls = ["sesimi.app", "myadboxapp"];
let warningUrls = ["sesimi.io", "adboxapp"];

const addUrl = (url, type) => {
  if (type === "danger" && !dangerUrls.includes(url)) {
    dangerUrls.push(url);
  } else if (type === "warning" && !warningUrls.includes(url)) {
    warningUrls.push(url);
  }
};

const removeUrl = (url, type) => {
  if (type === "danger") {
    dangerUrls = dangerUrls.filter((item) => item !== url);
  } else if (type === "warning") {
    warningUrls = warningUrls.filter((item) => item !== url);
  }
};

const populateUrls = () => {
  const dangerList = document.getElementById("danger-list");
  const warningList = document.getElementById("warning-list");

  dangerList.innerHTML = "";
  warningList.innerHTML = "";

  dangerUrls.forEach((url) => {
    const li = document.createElement("li");
    li.textContent = url;
    dangerList.appendChild(li);
  });

  warningUrls.forEach((url) => {
    const li = document.createElement("li");
    li.textContent = url;
    warningList.appendChild(li);
  });
};

const getUrls = () => {
  return { dangerUrls, warningUrls };
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "icon_clicked") {
    populateUrls();
  }
});
