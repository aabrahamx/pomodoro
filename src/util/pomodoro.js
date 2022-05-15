export default class Pomodoro {
  constructor() {
    this.state = "default";
    this.isPaused = false;
    this.timer = null;
    this.focus = 30;
    this.short = 5;
    this.long = 15;
  }

  setFocus(time) {
    this.focus = time;
  }
  setShort(time) {
    this.short = time;
  }
  setLong(time) {
    this.long = time;
  }
  setState(str) {
    if (
      str !== "default" ||
      str !== "focus" ||
      str !== "short" ||
      str !== "long" ||
      str !== "finished"
    ) {
      return new Error("wrong passed value");
    }
    this.state = time;
  }

  start(func) {
    this.timer = setInterval(func, 1000);
  }
  stop() {
    clearSetInterval(this.timer);
  }
}
