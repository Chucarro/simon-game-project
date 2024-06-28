// Array of Colours
const buttonColours =  ["red", "blue", "green", "yellow"];

// Game Pattern
let gamePattern = [];

// User Clicked pattern
let userClickedPattern = [];

// Game level
let level = 0;

//Not start at the begining
let started = false;

// Start the game on a keypress
document.addEventListener("keydown", function() {
    if(!started) {
        startOver();
        gameSequence();
        started = true;
        document.querySelector("h2").textContent = "Level " + level;
    }
});

// Start the game clicking the button
const startButton = document.querySelector(".game-button");

startButton.addEventListener("click", function() {
    if(!started) {
        startOver();
        gameSequence();
        started = true;
        document.querySelector("h2").textContent = "Level " + level;
    }
});


// Handle button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if(started){
        const userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        button.classList.add('pressed');
        
        setTimeout(() => { 
            button.classList.remove('pressed');
        }, 300);

        flashButton(userChosenColour);

        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length -1);
        }
    })

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                gameSequence();
            }, 1800)
        }

    } else {
        playSound("wrong");
        document.querySelector("h2").textContent = "Game Over! Press Any Key to Restart.";
        document.querySelector(".game-button").classList.remove('hide');
        document.querySelector("body").classList.add('game-over');
        document.querySelector(".game-button").innerHTML = "Restart";
        started = false;
    }
}


function gameSequence (){
    startButton.classList.add('hide');
    userClickedPattern = [];  // Reset the userClickedPattern array
    level++;
    document.querySelector("h2").textContent = "Level " + level;

    // Choosing a random colour
    const randomNum = Math.floor(Math.random() * 4);

    // Random number equal to random chosen colour to choose colour
    const randomChosenColour = buttonColours[randomNum];

    // Pushing the Color to the Game pattern
    gamePattern.push(randomChosenColour);

    flashButtonPattern(randomChosenColour);
    playSound(randomChosenColour);
}

// Calls the parameter colour to add a class flash and -shadow
function flashButton (colour) {

    const button = document.getElementById(colour);

    button.classList.add('flash', colour + '-shadow');

    setTimeout(() => {
        button.classList.remove('flash', colour + '-shadow');
    }, 300);
}


function flashButtonPattern (colour) {

    const button = document.getElementById(colour);

    button.classList.add('flash-pattern');

    setTimeout(() => {
        button.classList.remove('flash-pattern');
    }, 400);
}

// Plays sounds for each button
function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    document.querySelector("body").classList.remove("game-over");
    document.querySelector("h2").textContent = "Press A Key to Start";
}


