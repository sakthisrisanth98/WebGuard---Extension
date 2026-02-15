class RiskEngine {
  constructor() {
    this.baseScore = 0;
  }

  calculateScore(logs) {
    let score = this.baseScore;
    let deductions = {
      localStorage: 0,
      sessionStorage: 0,
      thirdParty: 0,
      trackers: 0,
      sensitive: 0
    };

    logs.forEach(log => {
      if (log.type.includes('LocalStorage')) {
        score += 5;
        deductions.localStorage += 5;
      }
      if (log.type.includes('SessionStorage')) {
        score += 3;
        deductions.sessionStorage += 3;
      }
      if (log.isThirdParty) {
        score += 4;
        deductions.thirdParty += 4;
      }
      if (log.isTracker) {
        score += 10;
        deductions.trackers += 10;
      }
      if (log.hasSensitive) {
        score += 15;
        deductions.sensitive += 15;
      }
    });

    return {
      score: Math.max(0, Math.min(100, score)),
      deductions,
      level: this.getLevel(score),
      color: this.getColor(score)
    };
  }

  getLevel(score) {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  }

  getColor(score) {
    if (score >= 70) return '#ef4444';
    if (score >= 40) return '#f59e0b';
    return '#22c55e';
  }

  generateExplanation(logs, metrics) {
    const parts = [];
    const eventCount = logs.length;
    
    if (metrics.trackers > 0) {
      parts.push(`connected to ${Math.floor(metrics.trackers / 10)} known tracking domains`);
    }
    if (metrics.thirdParty > 0) {
      parts.push(`made ${Math.floor(metrics.thirdParty / 4)} third-party requests`);
    }
    if (metrics.localStorage > 0) {
      parts.push(`accessed localStorage ${Math.floor(metrics.localStorage / 5)} times`);
    }
    if (metrics.sensitive > 0) {
      parts.push(`detected sensitive data patterns`);
    }

    const level = this.getLevel(metrics.trackers + metrics.thirdParty + metrics.localStorage + metrics.sessionStorage + metrics.sensitive);
    
    if (parts.length === 0) {
      return `This website is rated Low risk with no suspicious activity detected.`;
    }

    return `This website is rated ${level} risk because it ${parts.join(', ')}.`;
  }
}

const riskEngine = new RiskEngine();
