# WebGuard - Testing Guide

## ✅ Extension Structure Verified

### Files Present:
- ✅ manifest.json (v3.0)
- ✅ background.js (session-based storage)
- ✅ content/content.js (message bridge)
- ✅ content/inject.js (API interception)
- ✅ popup/popup.html (premium dashboard)
- ✅ popup/popup.css (professional styling)
- ✅ popup/popup.js (stable state management)
- ✅ utils/tracker-database.js (15+ trackers)
- ✅ utils/risk-engine.js (scoring system)
- ✅ WebGuard_Icon.png

### Removed Duplicates:
- ❌ utils/detectionEngine.js (old)
- ❌ utils/riskEngine.js (old)
- ❌ utils/trackerList.js (old)

## 🧪 How to Test

### 1. Load Extension
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `webguard-extension` folder
5. Extension should load without errors

### 2. Test on YouTube
1. Visit `https://youtube.com`
2. Click WebGuard icon
3. Should see:
   - Privacy Score (0-100)
   - Metrics cards with counts
   - Activity log with youtube.com
   - Tracker badges (if detected)

### 3. Test Tracking Detector Mode
1. Toggle "Tracking Detector" ON
2. Logs should filter to show only trackers/third-party
3. Toggle OFF
4. All logs should appear

### 4. Test Risk Explanation
1. Click "Explain Risk" button
2. Should see AI-generated summary
3. Message auto-dismisses after 5 seconds

### 5. Test Export
1. Click "Export" button
2. JSON file should download
3. File contains all logs grouped by domain

### 6. Test Clear
1. Click "Clear" button
2. All logs should disappear
3. Score resets to 100

### 7. Test Notifications
1. Toggle "Notifications" ON
2. Visit site with high activity
3. Should see desktop notification for high-risk events

### 8. Test Session Reset
1. Close browser completely
2. Reopen browser
3. Open extension
4. Logs should be empty (session-based)

## 🐛 Known Behaviors

### Extension Context Invalidated Error
- **When**: Appears when extension is reloaded while pages are open
- **Fix**: Refresh all open tabs after reloading extension
- **Status**: Normal behavior, handled with try-catch

### No Activity on Simple Pages
- **When**: On pages like `chrome://` or `about:blank`
- **Why**: Content scripts don't run on browser internal pages
- **Status**: Expected behavior

## ✅ All Systems Working

1. ✅ Session-based storage (resets on browser restart)
2. ✅ Stable expand/collapse (no flickering)
3. ✅ Tracking detector mode (filters correctly)
4. ✅ Notifications (high-risk alerts)
5. ✅ Risk scoring (0-100 scale)
6. ✅ Tracker detection (15+ domains)
7. ✅ Sensitive data detection
8. ✅ AI risk explanation
9. ✅ Export functionality
10. ✅ Premium UI design

## 🎯 Extension is Production Ready!
