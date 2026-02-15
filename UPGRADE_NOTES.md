# WebGuard 2.0 – Professional Cybersecurity-Grade Browser Monitoring

## 🚀 New Features

### 1. Risk Scoring System
- Dynamic risk calculation per event
- Scores based on: event type, third-party status, tracker detection, suspicious patterns
- Risk levels: Low (0-3), Medium (4-7), High (8+)

### 2. Tracking Detector Mode
- Toggle to show only third-party and tracker requests
- Filters out same-origin activity
- Professional privacy analysis

### 3. Suspicious Pattern Detection
- Detects long URLs (>200 chars)
- Identifies sensitive keywords (token, auth, session, analytics)
- Monitors rapid repeated requests
- Rule-based anomaly detection engine

### 4. Domain Grouping
- Logs organized by website domain
- Collapsible domain groups
- Per-domain risk assessment
- Tracker badges for known tracking domains

### 5. Desktop Notifications
- Real-time alerts for High-Risk events
- Shows domain and event type
- Can be toggled on/off

### 6. Export Functionality
- Export logs as JSON
- Export logs as CSV with full metadata
- Includes risk scores and classifications

### 7. Configurable Monitoring
- Toggle localStorage monitoring
- Toggle network monitoring
- Selective event tracking
- Settings persist across sessions

### 8. Known Tracker Detection
- Pre-configured list of 15+ tracking domains
- Automatic tracker identification
- Visual tracker badges

## 🏗️ Architecture

```
inject.js (Page Context)
    ↓ Intercepts APIs
    ↓ window.postMessage
content.js (Bridge)
    ↓ chrome.runtime.sendMessage
background.js (Service Worker)
    ↓ Risk Analysis (detectionEngine.js)
    ↓ Risk Scoring (riskEngine.js)
    ↓ Tracker Detection (trackerList.js)
    ↓ chrome.storage.local (Grouped by domain)
popup.js (Dashboard)
    ↓ Displays grouped logs with risk levels
```

## 📦 File Structure

```
webguard-extension/
├── manifest.json (v2.0)
├── background/
│   └── background.js (Risk analysis + notifications)
├── content/
│   ├── content.js (Bridge layer)
│   └── inject.js (API interception)
├── popup/
│   ├── popup.html (Enhanced UI)
│   ├── popup.css (Professional styling)
│   └── popup.js (Grouped logs + export)
└── utils/
    ├── trackerList.js (Known trackers)
    ├── riskEngine.js (Risk scoring)
    └── detectionEngine.js (Anomaly detection)
```

## 🔧 Installation

1. Download/clone the extension
2. Add a 128x128 PNG icon named `icon.png` to root directory
3. Open `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the `webguard-extension` folder

## 🎯 Usage

1. **Monitor Activity**: Extension runs automatically on all websites
2. **View Logs**: Click extension icon to open dashboard
3. **Enable Tracking Mode**: Toggle to see only suspicious domains
4. **Configure Settings**: Enable/disable specific monitoring features
5. **Export Data**: Use JSON or CSV export for analysis
6. **Clear Logs**: Reset all stored data

## 🛡️ Security Features

- ✅ Manifest V3 compliant
- ✅ Secure page-context injection
- ✅ Message validation
- ✅ No eval() or inline scripts
- ✅ Isolated execution contexts
- ✅ Minimal permissions

## 📊 Risk Scoring Model

| Event Type | Base Score |
|------------|-----------|
| localStorage read/write | +1 |
| sessionStorage write | +1 |
| XHR request | +2 |
| fetch request | +2 |
| Clipboard access | +3 |
| Third-party domain | +3 |
| Known tracker | +5 |
| Suspicious pattern | +3 |
| Long URL (>200) | +2 |

## 🎓 Educational Value

WebGuard 2.0 demonstrates:
- Browser security internals
- Manifest V3 architecture
- Risk assessment algorithms
- Privacy monitoring techniques
- Secure extension development
- Real-time event processing

## 🔮 Future Enhancements

- Machine learning-based classification
- Custom tracker domain lists
- Historical trend analysis
- Per-site privacy scores
- Cookie monitoring
- IndexedDB tracking
- WebRTC detection

## 📝 License

Educational/Research Project

---

**WebGuard 2.0** – Making browser privacy transparent.
