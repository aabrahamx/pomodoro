import { minToSec } from '@/helpers/formatters.js';

/**
 * Focus - the amount of time user allocated for productivty.
 * Short - the amount of time user allocated for shot breaks.
 * Long - the amount of time user allocated for long breaks.
 * Sessions - the amount of focus sessions a user wants to do.
 * this.setting - is an object with all the mentioned properties in it.
 */

export default class Pomodoro {
  constructor(setting) {
    this.setting = setting;
    this.timerID = null;
    this.sessions = [];
    this.initialized = false;

    this.isRunning = false;
    this.startingTime = null;
    this.runningTime = null;
    this.sessionProgress = 0;

    this.pausedTime = null;
    this.state = 'idle';
  }

  // user click handlers ⤵
  handleStartClick() {
    if (!this.initialized) this.initialize();
    this.runPomodoro();
  }

  handlePauseClick() {
    this.stop();
    this.isRunning = false;
    if (this.runningTime > 0) {
      this.pausedTime = this.runningTime;
    }
  }

  handleSkipClick() {
    this.stop();
    this.runPomodoro();
  }

  handleResetClick() {
    this.stop();
    this.reset();
  }

  // internal methods ⤵
  runPomodoro() {
    if (this.pausedTime > 0) {
      this.runningTime = this.pausedTime;
    }

    if (this.pausedTime > 0 !== true) {
      const current = this.sessions.pop();
      const { sessionTime, sessionType, sessionProgress } = current;
      this.state = sessionType;
      this.sessionProgress = sessionProgress;
      this.startingTime = sessionTime;
      this.runningTime = sessionTime;
    }

    this.isRunning = true;
    this.timerID = setInterval(() => {
      this.runningTime > 0 ? this.runningTime-- : this.handleTimerIdDone();
    }, 1000);
  }

  runningTimeDone() {
    this.stop();
    if (this.sessions.peek()) {
      this.startingTime = null;
      this.runPomodoro();
    } else {
      this.reset();
    }
  }

  stop() {
    clearInterval(this.timerID);
  }

  reset() {
    this.sessions = [];
    this.initialized = false;
    this.isRunning = false;
    this.runningTime = null;
    this.startingTime = null;
    this.pausedTime = null;
    this.sessionProgress = 0;
    this.state = 'idle';
  }

  initialize() {
    this.initialized = true;
    const { focus, short, long, sessions } = this.setting;
    const allSess = sessions * 2; // to account for breaks

    for (let i = allSess; i > 0; i--) {
      if (i === allSess) {
        this.sessions.push(getData('long', i, long));
      } else {
        if (i % 2 === 0) {
          this.sessions.push(getData('short', i, short));
        } else {
          this.sessions.push(getData('focus', i, focus));
        }
      }
    }

    function getData(type, i, time) {
      return {
        sessionType: type,
        sessionProgress: Math.ceil(i / 2),
        sessionTime: minToSec(time),
      };
    }
  }
}
