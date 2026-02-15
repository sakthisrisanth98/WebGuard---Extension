importScripts('utils/tracker-database.js', 'utils/risk-engine.js');

let sessionLogs = {};
let settings = {
  trackingMode: false,
  notifications: true
};
let notificationSent = {};

chrome.storage.local.get(['settings'], (result) => {
  if (result.settings) settings = { ...settings, ...result.settings };
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!message || !message.type) return;

  const domain = message.url;
  const fullUrl = message.detail;
  
  const logEntry = {
    type: message.type,
    detail: message.detail,
    time: message.time,
    isThirdParty: isThirdParty(fullUrl, domain),
    isTracker: isTracker(fullUrl),
    hasSensitive: hasSensitiveData(fullUrl)
  };

  if (!sessionLogs[domain]) sessionLogs[domain] = [];
  sessionLogs[domain].unshift(logEntry);
  if (sessionLogs[domain].length > 100) sessionLogs[domain].pop();

  // Calculate risk and send notification if high risk
  const risk = riskEngine.calculateScore(sessionLogs[domain]);
  if (risk.score >= 70 && settings.notifications && !notificationSent[domain]) {
    notificationSent[domain] = true;
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'WebGuard_Icon.png',
      title: 'High Privacy Risk Detected',
      message: `${domain} - Privacy score: ${risk.score}/100`,
      priority: 2
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    port.onMessage.addListener((msg) => {
      if (msg.action === 'getLogs') {
        port.postMessage({ logs: sessionLogs, settings });
      } else if (msg.action === 'clearLogs') {
        sessionLogs = {};
        notificationSent = {};
        port.postMessage({ logs: sessionLogs, settings });
      } else if (msg.action === 'updateSettings') {
        settings = { ...settings, ...msg.settings };
        chrome.storage.local.set({ settings });
        port.postMessage({ logs: sessionLogs, settings });
      }
    });
  }
});
