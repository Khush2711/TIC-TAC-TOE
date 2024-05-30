const boxes = document.querySelectorAll('.box');
const playerinfo = document.querySelector('.player-info');
const newGame = document.querySelector('.newGameBtn');
const line = document.querySelectorAll('.line');

let currentPlayer;
let gameGrid;
let player;
let count;
let gameOver;

const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

init();
function init() {
    currentPlayer = "O";
    count = 0;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGame.classList.remove('active');
    playerinfo.innerText = `Current Player - ${currentPlayer}`;
    line.forEach((div)=>{
        div.classList.remove('active');
        div.classList.remove('col-active');
        div.classList.remove('diagonal1-active');
        div.classList.remove('diagonal2-active');
    })
    gameOver = false;
}

function swapPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerinfo.innerText = `Current Player - ${currentPlayer}`;
}

function markLine(index) {
    if (index <= 2) {
        line[index].classList.add('active');
    }
    else if (index <= 5) {
        line[index].classList.add('col-active');
    }
    else if(index == 6){
        line[index].classList.add('diagonal1-active');
    }
    else if(index == 7){
        line[index].classList.add('diagonal2-active');
    }
}

function checkGameOver(index) {

    winningPos.forEach((arr, line) => {
        let count = 0;
        if (arr.includes(index)) {
            arr.forEach((i) => {
                if (gameGrid[i] === currentPlayer) {
                    count++;
                }
                if (count === 3) {
                    newGame.classList.add('active');
                    markLine(line);
                    gameOver = true;
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    });
                }
            });
        }
    });
}

function handleClick(index) {
    if(gameOver) return;
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        gameOver = checkGameOver(index);
        swapPlayer();
        boxes[index].style.pointerEvents = "none";
        count++;
    }

    if (count === 9) {
        newGame.classList.add('active');
    }

}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});

newGame.addEventListener('click', () => {
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        box.style.pointerEvents = "all";
        box.style.backgroundColor = "";
    });
    init();
    newGame.classList.remove('active');
})