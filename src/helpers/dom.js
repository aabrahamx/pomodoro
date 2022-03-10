

function displayElement(cssSelector) {
    const domElement = document.querySelector(cssSelector);
    domElement.style.display = 'block';
};

function hideElement(cssSelector) {
    const domElement = document.querySelector(cssSelector);
    domElement.style.display = 'none';
}


// Audio Notification
function playNotification(cssSelector) {
    const domAudioElement = document.querySelector(cssSelector);
    domAudioElement.play();
}

function displaySession(cssSelector, string) {
    const domElement = document.querySelector(cssSelector);
    domElement.innerHTML = string;
}

export { displayElement, hideElement, playNotification, displaySession } 