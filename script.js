const mainContainer = document.querySelector(".main-container");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const starterPage = document.querySelector(".starter-page");
const endScreen = document.querySelector(".end-screen")
const startButton = document.querySelector(".start-button");
const pickCharacter = document.querySelector('.pick-character');
const pickWeapon = document.querySelector('.pick-weapon')
const playerCharacterImg = document.querySelector('.player-character img');
const results = document.querySelector('.results');
const resultsButton = document.querySelector('.result-button');
const winnerMessage = document.querySelector('.winner');
const showResults = document.querySelector('.show-results');
const firstEndMessage = document.querySelector('.first-end-message');
const endScreenImg = document.querySelector('.end-screen img');
const secondEndMessage = document.querySelector('.second-end-message');
const rematchButton = document.querySelector('.rematch-button');
const updatePlayerScore = document.querySelector('.player-info span');
const updateComputerScore = document.querySelector('.computer-info span');
const updateDrawScore = document.querySelector('.draw-info .player-score');
const updateRoundCount = document.querySelector('.playerArena-round #round-count');

const choices = ['rock','paper','scissors']

    let player = 0;
    let computer = 0;
    let draw = 0;
    let playerScore = 0;
    let computerScore = 0;
    let drawScore = 0;
    let roundCount = 0;
    let roundResult = '';

const addClassToDiv = (target, divElement) =>{
    target.classList.add(`${divElement}`)
}

const removeClassFromDiv = (target, divElement) => {
    target.classList.remove(`${divElement}`)
}

(function starterScreen(){
    addClassToDiv(mainContainer,'hide');
    addClassToDiv(header,'hide');
    addClassToDiv(footer,'hide');
    addClassToDiv(pickCharacter,'hide');
    addClassToDiv(endScreen,'hide');

})();

const startGame = () => {
    addClassToDiv(starterPage,'hide');

    removeClassFromDiv(mainContainer, 'hide');
    removeClassFromDiv(header,'hide');
    removeClassFromDiv(footer,'hide');
    addClassToDiv(results,'hide');
}

rematchButton.addEventListener('click', () => {
    removeClassFromDiv(pickWeapon,'hide');
    startGame();
})

startButton.addEventListener('click',() => {
    addClassToDiv(startButton,'hide');
    removeClassFromDiv(pickCharacter ,'hide');
})

document.querySelectorAll('.characters-list img').forEach((item) => {
    item.addEventListener('click',(e) => {
       const playerCharacter = e.target.id;
        playerCharacterImg.src = `./assets/images/characters/${playerCharacter+'.png'}`;
        startGame();
    })
})

const computerPlay = () => {
    return choices[Math.floor(Math.random() * choices.length)]
}

const endGame = () => {
    addClassToDiv(mainContainer,'hide');
    if(playerScore > computerScore){
        firstEndMessage.innerHTML = "You Won!"
        endScreenImg.src = './assets/images/gameStatus/win.png'
        secondEndMessage.innerHTML = "You defeated the computer"
    } else if(playerScore < computerScore){
        firstEndMessage.innerHTML = "You Lost!"
        endScreenImg.src = './assets/images/gameStatus/lose.png'
        secondEndMessage.innerHTML = "The computer defeated you"
    } else {
        firstEndMessage.innerHTML = "Its a Draw"
        endScreenImg.src = './assets/images/gameStatus/draw.png'
        secondEndMessage.innerHTML = "You draw with the computer"
    }
    removeClassFromDiv(endScreen,'hide');
    updateRoundCount.innerHTML = 1 + '/5';
    updatePlayerScore.innerHTML = 0;
    updateComputerScore.innerHTML = 0;
    updateDrawScore.innerHTML = 0;
    player = 0, computer = 0, draw = 0, playerScore = 0, computerScore = 0;
    drawScore = 0, roundCount = 0;
}


resultsButton.addEventListener('click', () => {
    console.log(roundResult);
    removeClassFromDiv(results,roundResult);
    addClassToDiv(results,'hide');
    removeClassFromDiv(pickWeapon,'hide');
})

document.querySelectorAll('.weapons img').forEach((item) => {
    item.addEventListener('click',(e) => {
        e.preventDefault();
        if(roundCount < 5){
            const playerSelection = e.target.id;
            const computerSelection = computerPlay();
            let value = playRound(playerSelection, computerSelection);
            
            roundCount++;
            updateRoundCount.innerHTML = roundCount + '/5';
            addClassToDiv(pickWeapon,'hide');
            showResults.innerHTML = `You selected: ${playerSelection}, Computer selected: ${computerSelection}`;
            if(value == 'player'){
                winnerMessage.innerHTML = 'You Won the Round!';
                removeClassFromDiv(results,'hide');
                addClassToDiv(results,'win');

                roundResult = 'win';
            } else if(value == 'computer'){
                winnerMessage.innerHTML = 'Computer Won the Round!';
                removeClassFromDiv(results,'hide');
                addClassToDiv(results,'lose');
                roundResult = 'lose';
            } else {
                winnerMessage.innerHTML = 'Its a tie!';
                removeClassFromDiv(results,'hide');
                addClassToDiv(results,'tie');
                roundResult = 'tie';
            }
            if(roundCount == 5){
                endGame();
            }
        }
    })
})

const updateScore = (type) => {
    if(type === 'player'){
        updatePlayerScore.innerHTML = playerScore;
    } else if(type === 'computer'){
        updateComputerScore.innerHTML = computerScore;
    } else{
        updateDrawScore.innerHTML = drawScore;
    }
}

const playRound = (playerSelection, computerSelection) => {
    switch(playerSelection + computerSelection){
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            playerScore++;
            updateScore('player');
            return 'player';

        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            computerScore++
            updateScore('computer');
           return 'computer';

        case 'paperpaper':
        case 'scissorsscissors':
        case 'rockrock':
            drawScore++;
            updateScore('draw');
          return 'draw';
    }
}
