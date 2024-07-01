let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let heartIconsContainer = document.getElementById("heart-icons");
let numberBox = document.getElementById("number-box");
let guessHistory = document.getElementById("guess-history");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 50) + 1;
    console.log("정답", computerNum);
    numberBox.textContent = computerNum;
}

function updateChanceIcons() {
    let heartIcons = heartIconsContainer.querySelectorAll(".fa-heart");

    heartIcons.forEach((icon, index) => {
        if (index < chances) {
            icon
                .classList
                .remove("fa-regular");
            icon
                .classList
                .add("fa-solid");
        } else {
            icon
                .classList
                .remove("fa-solid");
            icon
                .classList
                .add("fa-regular");
        }
    });
}

function play() {
    let userValue = parseInt(userInput.value);

    if (isNaN(userValue) || userValue < 1 || userValue > 50) {
        resultArea.textContent = "1 ~ 50 사이의 숫자를 입력해 주세요.";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        return;
    }

    chances--;
    updateChanceIcons();

    if (userValue < computerNum) {
        resultArea.textContent = "UP!";
        resultArea.style.color = "#000";
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN!";
        resultArea.style.color = "#000";
    } else {
        resultArea.textContent = "정답입니다!";
        resultArea.style.color = "#000";
        numberBox.textContent = computerNum;
        gameOver = true;
    }

    history.push(userValue);
    updateGuessHistory();

    if (chances < 1 || gameOver) {
        gameOver = true;
        numberBox.textContent = computerNum;
        playButton.disabled = true;
    }
}

function updateGuessHistory() {
    let historyNums = guessHistory.querySelectorAll(".history-num");
    historyNums.forEach((numDiv, index) => {
        if (index < history.length) {
            numDiv.textContent = history[index];
        } else {
            numDiv.textContent = "";
        }
    });
}

function reset() {
    userInput.value = "";
    pickRandomNum();
    resultArea.textContent = "힌트가 표시됩니다.";
    resultArea.style.color = "#ccc";
    numberBox.textContent = "?";
    chances = 3;
    gameOver = false;
    history = [];
    guessHistory.innerHTML = "";
    updateGuessHistory();
    updateChanceIcons();
    playButton.disabled = false;
}

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('infoModal');
    var btn = document.getElementById('info-button');
    var span = document.getElementById('closeModalBtn');

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

pickRandomNum();
