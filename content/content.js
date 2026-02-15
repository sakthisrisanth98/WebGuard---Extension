(function () {
  try {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("content/inject.js");
    script.onload = function() { this.remove(); };
    (document.head || document.documentElement).appendChild(script);
  } catch (e) {
    return;
  }
})();

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (!event.data || event.data.source !== "webguard") return;

  try {
    chrome.runtime.sendMessage({
      type: event.data.type,
      detail: event.data.detail,
      url: location.hostname,
      time: new Date().toLocaleTimeString()
    });
  } catch (e) {
    // Extension context invalidated
  }
});
