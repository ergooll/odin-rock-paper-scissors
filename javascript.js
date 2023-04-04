const choices = ['Rock', 'Paper', 'Scissors'];
let winners = [];

function resetGame() {
    winners = [];
    document.querySelector(".playerScore").textContent = "Player Wins: 0";
    document.querySelector(".computerScore").textContent = "Computer Wins: 0";
    document.querySelector(".ties").textContent = "Ties: 0";
    document.querySelector(".winner").textContent = "Game has been reset!";
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".computerChoice").textContent = "";
    document.querySelector(".roundWinner").textContent = "";
    document.querySelector(".selections").style.display = "none";
    document.querySelector(".reset").style.display = "none";
    document.querySelector(".winner-div").style.display = "none";
}

function startGame() {
    let btns = document.querySelectorAll('button');
    btns.forEach((button) => 
        button.addEventListener('click', () => {
            if (button.id) {
                playRound(button.id);
            }
        })
    );

    playRound();
}

function playRound(playerChoice) {
    let wins = checkWinner();
    if (wins >= 5) {
        return;
    }

    playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
    const computerChoice = computerSelection();

    const winner = checkWinner(playerChoice, computerChoice);
    winners.push(winner);
    tallyWins();
    displayRound(playerChoice, computerChoice, winner);
    wins = checkWins();
    if (wins == 5) {
        displayEnd();
    }
}

function displayEnd() {
    let playerWins = winners.filter((item) => item == 'Player').length;

    if (playerWins == 5) {
        document.querySelector('.winner').textContent =
            'You won 5 games, Good job!';
    } else {
        document.querySelector('.winner').textContent =
            'The Computer won 5 times, you lose.';
    }
    document.querySelector('.winner-div').style.display = 'flex';
    document.querySelector('.reset').style.display = 'inline';
}

function displayRound(playerChoice, computerChoice, winner) {
    document.querySelector(".selections").style.display = "block";
    document.querySelector('.computerChoice').textContent = `The Computer chose ${computerChoice}`;
    document.querySelector('.playerChoice').textContent = `You chose ${playerChoice}`;
    document.querySelector('.roundWinner').textContent = `The ${winner} won this round!`;
}

function tallyWins() {
    let playerWins = winners.filter((item) => item == 'Player').length;
    let computerWins = winners.filter((item) => item == 'Computer').length;
    let ties = winners.filter((item) => item == 'Tie').length;
    document.querySelector('.playerScore').textContent = `Player Wins: ${playerWins}`;
    document.querySelector('.computerScore').textContent = `Computer Wins: ${computerWins}`;
    document.querySelector('.ties').textContent = `Ties: ${ties}`;
}

//get input from computer
function computerSelection() {
    const choice = choices[Math.floor(Math.random() * choices.length)];

    return choice;
}

function checkWins() {
    let playerWins = winners.filter((item) => item == 'Player').length;
    let computerWins = winners.filter((item) => item == 'Computer').length;
    return Math.max(playerWins, computerWins);
}

function checkWinner(choicePlayer, choiceComputer) {
    if (choicePlayer === choiceComputer) {
        return 'Tie';
    } else if (
        (choicePlayer === 'Rock' && choiceComputer === 'Scissors') ||
        (choicePlayer === 'Paper' && choiceComputer === 'Rock') ||
        (choicePlayer === 'Scissors' && choiceComputer === 'Paper')
        ) {
        return 'Player';
    } else {
        return 'Computer';
    }
}

function setWins() {
    const playerWins = winners.filter((item) => item == 'Player').length;
    const computerWins = winners.filter((item) => item == 'Computer').length;
    const ties = winners.filter((item) => item == 'Tie').length;
}

startGame();