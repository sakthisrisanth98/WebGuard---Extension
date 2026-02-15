# 🛡️ WebGuard - AI Privacy Intelligence

A professional cybersecurity-grade Chrome extension for real-time browser privacy monitoring with behavioral anomaly detection and threat intelligence.

![Version](https://img.shields.io/badge/version-3.0-blue)
![Manifest](https://img.shields.io/badge/manifest-v3-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 🚀 Features

### Core Capabilities
- **Real-time Privacy Monitoring** - Tracks localStorage, sessionStorage, fetch, and XHR requests
- **Behavioral Anomaly Detection** - Identifies aggressive tracking patterns and suspicious behavior
- **Domain Intelligence System** - Built-in threat intelligence database with 15+ tracker categories
- **Data Exposure Detection** - Scans for sensitive parameters (passwords, tokens, sessions)
- **Dynamic Risk Scoring** - 0-100 scale with color-coded visualization (Green/Yellow/Red)
- **Multi-layer Notifications** - Smart alerts for high-risk activities

### Advanced Features
- 🎯 **Clickable Metric Cards** - Filter logs by category (Trackers, Third-Party, Storage, Sensitive)
- 🔍 **Domain Intelligence Panel** - Shows top domains with categories and risk levels
- 🚨 **Anomaly Alerts** - Detects aggressive tracking, excessive storage access, data exposure
- 📊 **Privacy Score Ring** - Animated circular progress with dynamic colors
- 💡 **AI Risk Explanation** - Generates detailed risk analysis with recommendations
- 🔄 **Session-based Storage** - Logs reset on browser restart (no persistence)

## 📸 Screenshots

*(Add screenshots of your extension here)*

## 🛠️ Installation

### For Development
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/webguard-extension.git
cd webguard-extension
```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `webguard-extension` folder

### For Users
*(Coming soon to Chrome Web Store)*

## 🏗️ Architecture

```
webguard-extension/
├── manifest.json           # Extension configuration
├── background.js          # Service worker (orchestration)
├── content/
│   ├── content.js        # Message bridge
│   └── inject.js         # API interception
├── popup/
│   ├── popup.html        # Dashboard UI
│   ├── popup.css         # Professional styling
│   └── popup.js          # UI controller
└── utils/
    ├── behavior-analyzer.js      # Anomaly detection
    ├── domain-intelligence.js    # Threat intel
    ├── data-exposure-detector.js # Sensitive data scanner
    ├── risk-engine.js            # Scoring algorithm
    └── tracker-database.js       # Known trackers
```

## 🎯 How It Works

1. **Injection Layer** - `inject.js` runs in page context and intercepts browser APIs
2. **Bridge Layer** - `content.js` relays events to background via `window.postMessage`
3. **Analysis Layer** - Background worker analyzes events using multiple detection engines
4. **Visualization Layer** - Popup displays real-time risk scores and detailed logs

## 🔒 Privacy & Security

- ✅ **Manifest V3 Compliant** - Uses latest Chrome extension standards
- ✅ **No External API Calls** - All analysis happens locally
- ✅ **No Data Collection** - Logs are session-based and never leave your browser
- ✅ **Open Source** - Full transparency, audit the code yourself

## 📊 Risk Scoring Model

| Event Type | Points | Risk Level |
|------------|--------|------------|
| Sensitive Data | +15 | Critical |
| Tracker Domain | +10 | High |
| localStorage | +5 | Medium |
| Third-Party | +4 | Medium |
| sessionStorage | +3 | Low |

**Risk Levels:**
- 🟢 **Low Risk** (0-39): Safe browsing
- 🟡 **Medium Risk** (40-69): Moderate tracking
- 🔴 **High Risk** (70-100): Aggressive tracking

## 🧪 Testing

Visit any website and:
1. Click the WebGuard icon
2. Watch the privacy score update in real-time
3. Click metric cards to filter by category
4. Expand domain groups to see detailed logs
5. Click "Explain Risk" for AI-generated analysis

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### Version 3.0 (Current)
- ✅ Behavioral anomaly detection engine
- ✅ Domain intelligence system
- ✅ Data exposure detector
- ✅ Multi-layer notifications
- ✅ Clickable metric filters
- ✅ Professional UI redesign

### Version 2.0
- ✅ Risk scoring system
- ✅ Tracking detector mode
- ✅ Export functionality

### Version 1.0
- ✅ Basic monitoring (localStorage, fetch, XHR)
- ✅ Simple dashboard

## 🎓 Technical Highlights

- **Behavioral Analysis** - Time-window pattern recognition (5-second windows)
- **Threat Intelligence** - Embedded domain categorization database
- **Anomaly Detection** - Statistical analysis of request patterns
- **Risk Scoring** - Weighted algorithm with dynamic thresholds
- **State Management** - Stable expand/collapse with Set() data structure

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your Profile](https://linkedin.com/in/YOUR_PROFILE)

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Inspired by privacy-focused browser extensions
- Developed with assistance from Amazon Q

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/YOUR_USERNAME/webguard-extension/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/YOUR_USERNAME/webguard-extension/issues)
- 📧 **Contact**: your.email@example.com

---

⭐ **Star this repo if you find it useful!**
