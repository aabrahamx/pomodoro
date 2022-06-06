export const minToSec = (min) => min * 60;

export const secToMin = (sec) => {
  const minute = Math.floor(sec / 60);
  const second = Math.floor(sec % 60);
  return [minute, second];
};

export const formatTime = (sec) => {
  let [minute, second] = secToMin(sec);
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return ` ${minute} : ${second} `;
};
