const TRACKER_DATABASE = [
  "googleads.com",
  "doubleclick.net",
  "facebook.net",
  "segment.com",
  "googletagmanager.com",
  "analytics.google.com",
  "google-analytics.com",
  "connect.facebook.net",
  "mixpanel.com",
  "hotjar.com",
  "clarity.ms",
  "quantserve.com",
  "scorecardresearch.com",
  "advertising.com",
  "adnxs.com"
];

const SENSITIVE_KEYWORDS = ["token", "auth", "session", "password", "key", "secret", "credential"];

function isTracker(url) {
  try {
    const hostname = new URL(url).hostname;
    return TRACKER_DATABASE.some(tracker => hostname.includes(tracker));
  } catch {
    return false;
  }
}

function isThirdParty(url, currentDomain) {
  try {
    const hostname = new URL(url).hostname;
    return hostname !== currentDomain && !hostname.includes(currentDomain);
  } catch {
    return false;
  }
}

function hasSensitiveData(url) {
  return SENSITIVE_KEYWORDS.some(keyword => url.toLowerCase().includes(keyword));
}
