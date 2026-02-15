let port;
let allLogs = {};
let settings = {};
let expandedDomains = new Set();
let currentDomain = '';
let activeFilter = null;
let notificationShown = false;

// Get current tab domain
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    try {
      currentDomain = new URL(tabs[0].url).hostname;
      document.getElementById('currentDomain').textContent = currentDomain;
    } catch (e) {
      document.getElementById('currentDomain').textContent = 'N/A';
    }
  }
});

// Connect to background
function connectPort() {
  port = chrome.runtime.connect({ name: 'popup' });
  
  port.onMessage.addListener((response) => {
    allLogs = response.logs || {};
    settings = response.settings || {};
    updateUI();
  });
  
  port.onDisconnect.addListener(() => {
    setTimeout(connectPort, 100);
  });
  
  port.postMessage({ action: 'getLogs' });
}

connectPort();

// Calculate metrics
function calculateMetrics(logs) {
  let trackers = 0, thirdParty = 0, storage = 0, sensitive = 0;
  
  Object.values(logs).flat().forEach(log => {
    if (log.isTracker) trackers++;
    if (log.isThirdParty) thirdParty++;
    if (log.type.includes('Storage')) storage++;
    if (log.hasSensitive) sensitive++;
  });
  
  return { trackers, thirdParty, storage, sensitive };
}

// Update privacy score ring with correct color logic
function updateScoreRing(score) {
  const circle = document.getElementById('scoreCircle');
  const circumference = 314;
  const offset = circumference - (score / 100) * circumference;
  
  // Color logic: Higher score = Higher risk
  let color, level;
  if (score >= 70) {
    color = '#ef4444'; // Red - High Risk
    level = 'High';
  } else if (score >= 40) {
    color = '#f59e0b'; // Yellow - Medium Risk
    level = 'Medium';
  } else {
    color = '#22c55e'; // Green - Low Risk
    level = 'Low';
  }
  
  circle.style.strokeDashoffset = offset;
  circle.style.stroke = color;
  
  document.getElementById('scoreValue').textContent = score;
  document.getElementById('scoreLabel').textContent = `${level} Risk`;
  
  // Trigger notification for high risk (once per session)
  if (score >= 70 && !notificationShown && settings.notifications) {
    notificationShown = true;
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../WebGuard_Icon.png',
      title: 'High Privacy Risk Detected',
      message: `Privacy score reached ${score}. Review activity immediately.`,
      priority: 2
    });
  }
}

// Calculate risk score
function calculateRisk(logs) {
  let score = 0;
  logs.forEach(log => {
    if (log.type.includes('LocalStorage')) score += 5;
    if (log.type.includes('SessionStorage')) score += 3;
    if (log.isThirdParty) score += 4;
    if (log.isTracker) score += 10;
    if (log.hasSensitive) score += 15;
  });
  
  return Math.max(0, Math.min(100, score));
}

// Update UI
function updateUI() {
  // Filter logs based on tracking mode
  let filteredLogs = {};
  Object.keys(allLogs).forEach(domain => {
    const logs = allLogs[domain].filter(log => {
      if (settings.trackingMode && !log.isTracker && !log.isThirdParty) return false;
      return true;
    });
    if (logs.length > 0) filteredLogs[domain] = logs;
  });

  // Apply metric filter
  if (activeFilter) {
    const temp = {};
    Object.keys(filteredLogs).forEach(domain => {
      const logs = filteredLogs[domain].filter(log => {
        if (activeFilter === 'tracker') return log.isTracker;
        if (activeFilter === 'thirdparty') return log.isThirdParty;
        if (activeFilter === 'storage') return log.type.includes('Storage');
        if (activeFilter === 'sensitive') return log.hasSensitive;
        return true;
      });
      if (logs.length > 0) temp[domain] = logs;
    });
    filteredLogs = temp;
  }

  // Calculate risk for current domain
  const currentLogs = allLogs[currentDomain] || [];
  const score = calculateRisk(currentLogs);
  updateScoreRing(score);

  // Update metrics
  const metrics = calculateMetrics(allLogs);
  document.getElementById('trackerCount').textContent = metrics.trackers;
  document.getElementById('thirdPartyCount').textContent = metrics.thirdParty;
  document.getElementById('storageCount').textContent = metrics.storage;
  document.getElementById('sensitiveCount').textContent = metrics.sensitive;

  // Update toggles
  document.getElementById('trackingMode').checked = settings.trackingMode || false;
  document.getElementById('notifications').checked = settings.notifications !== false;

  // Render activity log
  renderActivityLog(filteredLogs);
}

function renderActivityLog(logs) {
  const container = document.getElementById('activityLog');
  container.innerHTML = '';

  const domains = Object.keys(logs);
  if (domains.length === 0) {
    container.innerHTML = '<div class="empty">No activity detected</div>';
    return;
  }

  // Sort: current domain first
  domains.sort((a, b) => {
    if (a === currentDomain) return -1;
    if (b === currentDomain) return 1;
    return a.localeCompare(b);
  });

  domains.forEach(domain => {
    const domainLogs = logs[domain];
    const hasTrackers = domainLogs.some(l => l.isTracker);
    const isExpanded = expandedDomains.has(domain);

    const groupDiv = document.createElement('div');
    groupDiv.className = 'domain-group';

    const header = document.createElement('div');
    header.className = 'domain-header';
    header.innerHTML = `
      <div class="domain-name">
        <span>${domain}${domain === currentDomain ? ' (Current)' : ''}</span>
        ${hasTrackers ? '<span class="tracker-badge">TRACKER</span>' : ''}
      </div>
      <span class="log-count">${domainLogs.length} events</span>
    `;

    const logsDiv = document.createElement('div');
    logsDiv.className = `logs ${isExpanded ? 'expanded' : ''}`;

    // Render ALL logs (no slice limit)
    domainLogs.forEach(log => {
      const logItem = document.createElement('div');
      logItem.className = `log-item ${log.isTracker ? 'tracker' : ''} ${log.hasSensitive ? 'sensitive' : ''}`;
      logItem.innerHTML = `
        <div class="log-type">${log.type}</div>
        <div class="log-detail">${log.detail}</div>
      `;
      logsDiv.appendChild(logItem);
    });

    header.addEventListener('click', () => {
      if (expandedDomains.has(domain)) {
        expandedDomains.delete(domain);
        logsDiv.classList.remove('expanded');
      } else {
        expandedDomains.add(domain);
        logsDiv.classList.add('expanded');
      }
    });

    groupDiv.appendChild(header);
    groupDiv.appendChild(logsDiv);
    container.appendChild(groupDiv);
  });
}

// Metric card click handlers
document.querySelectorAll('.metric-card').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.filter;
    
    if (activeFilter === filter) {
      activeFilter = null;
      card.classList.remove('active');
    } else {
      document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active'));
      activeFilter = filter;
      card.classList.add('active');
    }
    
    updateUI();
  });
});

// Helper function to safely send message
function sendMessage(action, data = {}) {
  try {
    if (port) {
      port.postMessage({ action, ...data });
    }
  } catch (e) {
    // Port disconnected, ignore
  }
}

// Event listeners
document.getElementById('trackingMode').addEventListener('change', (e) => {
  settings.trackingMode = e.target.checked;
  sendMessage('updateSettings', { settings });
});

document.getElementById('notifications').addEventListener('change', (e) => {
  settings.notifications = e.target.checked;
  sendMessage('updateSettings', { settings });
});

document.getElementById('clearBtn').addEventListener('click', () => {
  expandedDomains.clear();
  activeFilter = null;
  notificationShown = false;
  document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active'));
  sendMessage('clearLogs');
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allLogs, null, 2));
  const a = document.createElement('a');
  a.href = dataStr;
  a.download = `webguard_${Date.now()}.json`;
  a.click();
});

document.getElementById('explainBtn').addEventListener('click', () => {
  const currentLogs = allLogs[currentDomain] || [];
  const score = calculateRisk(currentLogs);
  const metrics = calculateMetrics({ [currentDomain]: currentLogs });
  
  let level = score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low';
  
  let explanation = `This site is rated ${level} Risk (score: ${score}/100). `;
  
  const issues = [];
  if (metrics.trackers > 0) issues.push(`${metrics.trackers} tracking domains detected`);
  if (metrics.thirdParty > 0) issues.push(`${metrics.thirdParty} third-party requests`);
  if (metrics.storage > 0) issues.push(`${metrics.storage} storage accesses`);
  if (metrics.sensitive > 0) issues.push(`${metrics.sensitive} sensitive data patterns`);
  
  if (issues.length > 0) {
    explanation += `Activity includes: ${issues.join(', ')}. `;
    
    if (level === 'High') {
      explanation += 'Excessive third-party requests may expose browsing behavior to tracking networks. Consider using privacy mode or blocking trackers.';
    } else if (level === 'Medium') {
      explanation += 'Moderate tracking activity detected. Monitor this site for privacy concerns.';
    }
  } else {
    explanation = 'This website shows no suspicious activity. Safe to use.';
  }
  
  const explainDiv = document.getElementById('explanation');
  explainDiv.textContent = explanation;
  explainDiv.style.display = 'block';
  
  setTimeout(() => {
    explainDiv.style.display = 'none';
  }, 10000);
});
