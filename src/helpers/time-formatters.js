

function changeMinuteToSecond(minute) {
    return minute * 60;
}

function formattedTime(InSeconds) {
    let minute = Math.floor(InSeconds / 60);
    let second = Math.floor(InSeconds % 60);
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    return ` ${minute} : ${second} `
}

export { changeMinuteToSecond, formattedTime }