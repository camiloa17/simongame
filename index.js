
var level = 0;
var startGame = false;

var gamePattern = [];
var playerPattern = [];
var colorSelector = ["green", "red", "yellow", "blue"];


// Keypress listener
$(document).on("keydown", function () {
    if (startGame == false) {
        nextSequence();
    }
});

// player press buttons
$(".btn").on("click", function (event) {
    var colorPressed = event.target.id;

    playerSequence(colorPressed);

    event.target.classList.add("pressed");
    
    setTimeout(function () {
        event.target.classList.remove("pressed");
    }, 100)
    buttonsAudio(colorPressed);
});


function nextSequence() {
    startGame = true;
    level++;
    playerPattern = [];
    $("#level-title").text("Level " + level);
    var nextColor = colorSelector[Math.floor(Math.random() * 4)];
    gamePattern.push(nextColor);
    setTimeout(function () {
        $("#" + nextColor).fadeOut(150).fadeIn(150);
        buttonsAudio(nextColor);
    }, 500);
}

function playerSequence(event) {
    playerPattern.push(event);
    if (startGame == true) {
        checkAnswer();
    }
}

function checkAnswer() {
    if (playerPattern[playerPattern.length - 1] == gamePattern[playerPattern.length - 1]) {

        if (playerPattern.length == gamePattern.length) {

            nextSequence();
        }

    } else {
        gameOver();
    }
}

function gameOver() {
    startGame = false;
    gamePattern = [];
    playerPattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
}

function buttonsAudio(event) {
    var audio = new Audio("sounds/" + event + ".mp3");
    audio.play();
}
