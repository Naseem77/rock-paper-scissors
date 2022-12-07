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
const choices = ['rock','paper','scissors'];
    let player = 0;
    let computer = 0;
    let draw = 0;
    let playerScore = 0;
    let computerScore = 0;
    let drawScore = 0;
    let roundCount = 0;
    let roundResult = '';

const setClassAtt = (target, divElement) =>{
    target.classList.add(`${divElement}`)
}

const removeClassAtt = (target, divElement) => {
    target.classList.remove(`${divElement}`)
}

(function starterScreen(){
    setClassAtt(mainContainer,'hide');
    setClassAtt(header,'hide');
    setClassAtt(footer,'hide');
    setClassAtt(pickCharacter,'hide');
    setClassAtt(endScreen,'hide');
})();

const startGame = () => {
    setClassAtt(starterPage,'hide');
    removeClassAtt(mainContainer, 'hide');
    removeClassAtt(header,'hide');
    removeClassAtt(footer,'hide');
    setClassAtt(results,'hide');
    setClassAtt(endScreen,'hide');
}

const computerPlay = () => {
    return choices[Math.floor(Math.random() * choices.length)]
}

const endGame = () => {
    setClassAtt(mainContainer,'hide');
    if(playerScore > computerScore){
        firstEndMessage.textContent = "You Won!"
        endScreenImg.src = './assets/images/gameStatus/win.png'
        secondEndMessage.textContent = "You defeated the computer"
    } else if(playerScore < computerScore){
        firstEndMessage.textContent = "You Lost!"
        endScreenImg.src = './assets/images/gameStatus/lose.png'
        secondEndMessage.textContent = "The computer defeated you"
    } else {
        firstEndMessage.textContent = "Its a Draw"
        endScreenImg.src = './assets/images/gameStatus/draw.png'
        secondEndMessage.textContent = "You draw with the computer"
    }
    removeClassAtt(endScreen,'hide');
    updateRoundCount.textContent = 1 + '/5';
    updatePlayerScore.textContent = 0;
    updateComputerScore.textContent = 0;
    updateDrawScore.textContent = 0;
    player = 0, computer = 0, draw = 0, playerScore = 0, computerScore = 0;
    drawScore = 0, roundCount = 0;
}

const updateScore = (type) => {
    if(type === 'player'){
        updatePlayerScore.textContent = playerScore;
    } else if(type === 'computer'){
        updateComputerScore.textContent = computerScore;
    } else{
        updateDrawScore.textContent = drawScore;
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

const displayWinnerMsg = (value) => {
    if(value === 'player'){
        winnerMessage.textContent = 'You Won the Round!';
        removeClassAtt(results,'hide');
        setClassAtt(results,'win');
        roundResult = 'win';
    } else if(value === 'computer'){
        winnerMessage.textContent = 'Computer Won the Round!';
        removeClassAtt(results,'hide');
        setClassAtt(results,'lose');
        roundResult = 'lose';
    } else {
        winnerMessage.textContent = 'Its a tie!';
        removeClassAtt(results,'hide');
        setClassAtt(results,'tie');
        roundResult = 'tie';
    }
}

const nextRoundDisplay = () => {
    removeClassAtt(results,roundResult);
    setClassAtt(results,'hide');
    removeClassAtt(pickWeapon,'hide');
}

rematchButton.addEventListener('click', () => {
    removeClassAtt(pickWeapon,'hide');
    startGame();
})

startButton.addEventListener('click',() => {
    setClassAtt(startButton,'hide');
    removeClassAtt(pickCharacter ,'hide');
})

resultsButton.addEventListener('click', nextRoundDisplay);

document.querySelectorAll('.characters-list img').forEach((item) => {
    item.addEventListener('click',(e) => {
       const playerCharacter = e.target.id;
        playerCharacterImg.src = `./assets/images/characters/${playerCharacter+'.png'}`;
        startGame();
    })
})

document.querySelectorAll('.weapons img').forEach((item) => {
    item.addEventListener('click',(e) => {
        if(roundCount < 5){
            const playerSelection = e.target.id;
            const computerSelection = computerPlay();
            let value = playRound(playerSelection, computerSelection);
            roundCount++;
            updateRoundCount.textContent = roundCount + '/5';
            setClassAtt(pickWeapon,'hide');
            showResults.textContent = `You selected: ${playerSelection}, Computer selected: ${computerSelection}`;
            displayWinnerMsg(value);
            if(roundCount === 5){
                endGame();
            }
        }
    })
})