(function () {
  function send(type, detail) {
    window.postMessage({ source: "webguard", type, detail: String(detail) }, "*");
  }

  // Clipboard
  if (navigator.clipboard?.readText) {
    const orig = navigator.clipboard.readText;
    navigator.clipboard.readText = function () {
      send("Clipboard Access", "Read attempt");
      return orig.apply(this, arguments);
    };
  }

  // localStorage
  const origSet = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    send("LocalStorage Write", `Key: ${key}`);
    return origSet.apply(this, arguments);
  };

  const origGet = localStorage.getItem;
  localStorage.getItem = function (key) {
    send("LocalStorage Read", `Key: ${key}`);
    return origGet.apply(this, arguments);
  };

  // sessionStorage
  const origSess = sessionStorage.setItem;
  sessionStorage.setItem = function (key, value) {
    send("SessionStorage Write", `Key: ${key}`);
    return origSess.apply(this, arguments);
  };

  // Fetch
  const origFetch = window.fetch;
  window.fetch = function (input) {
    const url = typeof input === 'string' ? input : input?.url || 'unknown';
    send("Network Request", url);
    return origFetch.apply(this, arguments);
  };

  // XHR
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    send("XHR Request", String(url));
    return origOpen.apply(this, arguments);
  };
})();
