import { minToSec } from '@/helpers/formatters.js';

export default class Pomodoro {
  constructor(settings) {
    this.setting = settings;
    this.timerID = null;
    this.time = null;
    this.startingTime = null;
    this.paused = null;
    this.sessCount = 0;
    this.state = 'idle';
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.time = this.sessRunner();
    this.startingTime = this.time;
    this.timerID = setInterval(() => {
      this.time > 0 ? this.time-- : this.handleTimerFinish();
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.timerID);
    if (this.time > 0) {
      this.paused = this.time;
    }
  }

  handleTimerFinish() {
    this.stop();
    const allSessDone = this.sessCount === this.setting.sessions;
    const longBreakDone = this.state === 'long';
    if (allSessDone && longBreakDone) {
      this.reset();
    } else {
      this.start();
    }
  }

  sessRunner() {
    if (this.paused) {
      const paused = this.paused;
      this.paused = null;
      return paused;
    }

    if (this.sessCount === this.setting.sessions) {
      this.state = 'long';
      return minToSec(this.setting.long);
    }

    if (this.state === 'idle' || this.state === 'short') {
      this.sessCount++;
      this.state = 'focus';
      return minToSec(this.setting.focus);
    }

    if (this.state === 'focus') {
      this.state = 'short';
      return minToSec(this.setting.short);
    }
  }

  reset() {
    clearInterval(this.timerID);
    this.time = null;
    this.startingTime = null;
    this.paused = null;
    this.sessCount = 0;
    this.state = 'idle';
    this.isRunning = false;
  }
}
