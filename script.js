let containerEl;
let cursor;
let square;
let counterEl;
let timerEl;
let startButton;
let scoreDiv;
let scoreEl;

const cursorRadius = 25;

let finalscore = 0;
let gameCounter = 0;
let setGameTimer = 10;
let gameTimer = setGameTimer;
let isPlaying = false;

let currentXPosition;
let currentYPosition;
let windowWidth;
let windowHeight;

let handleMousemove = (event) => {
    if (isPlaying) {
        moveCursor(event);
        checkForCollision();
    }
}

// moves the circle div to the current cursor position
let moveCursor = (event) => {

    // check if the whole circle div would be located inside the container
    // if moved to the cursor's current position
    if (event.clientX <= (windowWidth - (cursorRadius + 10)) && event.clientX >= cursorRadius) {
        const xPosition = event.clientX - 25
        currentXPosition = xPosition;
    }

    if (event.clientY <= (windowHeight - (cursorRadius + 10)) && event.clientY >= cursorRadius) {
        const yPosition = event.clientY - 25
        currentYPosition = yPosition;
    }

    cursor.style.transform = `translate(${currentXPosition}px, ${currentYPosition}px)`;

}

// check if the circle div (cursor) overlaps with the square div
let checkForCollision = () => {

    const squareBCR = square.getBoundingClientRect();

    if (
        ((currentYPosition + 55) >= squareBCR.top && (currentYPosition + 5) <= squareBCR.bottom)
        && ((currentXPosition + 55) >= squareBCR.left && (currentXPosition + 5) <= squareBCR.right)) {

        moveSquare();

        gameCounter += 100;
        counterEl.innerHTML = gameCounter;
    }
}

// move the square to a random location inside the browser window
// and give it a random background color
let moveSquare = () => {
    const newXPos = Math.floor(Math.random() * ((windowWidth - 110) - 105)) + 105;
    const newYPos = Math.floor(Math.random() * ((windowHeight - 110) - 105)) + 105;

    square.style.backgroundColor = `rgb(${getRandomColor()})`;
    square.style.transform = `translate(${newXPos}px, ${newYPos}px)`;
}


// on start game button clicked
var startGame = () => {
    

    isPlaying = true;

    startButton.style.visibility = 'hidden';
    scoreDiv.style.visibility = 'hidden';
    containerEl.style.cursor = 'none';
    square.style.visibility = 'visible';
    cursor.style.visibility = 'visible';

    moveSquare();

    let gameInterval = setInterval(() => {
        if (gameTimer >= 1) {
            gameTimer -= 1;
            timerEl.innerHTML = gameTimer;
        } else {
            endGame();
            clearInterval(gameInterval);
        }
    }, 1000);
}

let endGame = () => {

    cursor.style.visibility = 'hidden';
    square.style.visibility = 'hidden';
    startButton.style.visibility = 'visible';
    containerEl.style.cursor = 'default';

    isPlaying = false;

    gameTimer = setGameTimer;
    timerEl.innerHTML = gameTimer;

    finalScore = gameCounter;
    gameCounter = 0;
    counterEl.innerHTML = 0;

    scoreEl.innerHTML = finalScore;
    scoreDiv.style.visibility = 'visible';

}

// returns a randow RGB color as a string e.g. '254, 155, 115'
let getRandomColor = () => {
    let newColor = '';
    for (let i = 0; i < 3; i++) {
        newColor += Math.floor(Math.random() * ((255) - 0)) + 0;
        i < 2 ? newColor += ',' : '';
    }
    return newColor;
}

// initialize on window loaded
document.addEventListener("DOMContentLoaded", (event) => {

    containerEl = document.getElementById('container');
    cursor = document.getElementById('cursor');
    square = document.getElementById('square');
    counterEl = document.getElementById('counter');
    timerEl = document.getElementById('timer');
    startButton = document.getElementById('startButton');
    scoreDiv = document.getElementById('scoreDiv');
    scoreEl = document.getElementById('score');

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    counterEl.innerHTML = gameCounter;
    timerEl.innerHTML = gameTimer;

    // handle the mousemove event. called here, so it only runs once
    document.onmousemove = handleMousemove;

})


// on window resize, get the current browser window size
window.addEventListener('resize', function () {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}, true);
