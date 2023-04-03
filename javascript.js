const choices = ['Rock', 'Paper', 'Scissors'];
const winners = [];

function game() {
    for (let i = 1; i <= 5; i++) {
        playRound(i);
    }
    document.querySelector('button').textContent = 'Play New Game';
    logWins();
    logWinner();
}

function playRound(round) {
    const playerSelection = playerChoice();
    const computerSelection = computerChoice();
    const winner = checkWinner(playerSelection, computerSelection);
    winners.push(winner);
    logRound(playerSelection, computerSelection, winner, round);
}

//get input from player
function playerChoice() {
    let input = prompt('Type Rock, Paper or Scissors');
    while(input == null) {
        input = prompt('Type Rock, Paper or Scissors');
    }
    input = input.charAt(0).toUpperCase() + input.slice(1);
    let check = validateInput(input);
    while(check == false) {
        input = prompt(
            'Type Rock, Paper or Scissors. The spelling needs to be correct, but capitalization doesn\'t matter'
        );
        while(input == null) {
            input = prompt('Type Rock, Paper or Scissors');
        }
        input = input.charAt(0).toUpperCase() + input.slice(1);
        check = validateInput(input);
    }
    return input;
}

//get input from computer
function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function validateInput(choice) {
    return choices.includes(choice);
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

function logWins() {
    let playerWins = winners.filter((item) => item == 'Player').length;
    let computerWins = winners.filter((item) => item == 'Computer').length;
    let ties = winners.filter((item) => item == 'Tie').length;
    console.log('%cResults:', 'color: #4cc464');
    console.log('Player wins:', playerWins);
    console.log('Computer wins:', computerWins);
    console.log('Ties:', ties);
    
}

function logRound(playerChoice, computerChoice, winner, round) {
    console.log('Round:', round);
    console.log('The Player chose', playerChoice + ', the Computer chose', computerChoice);
    console.log('Round winner:', winner);
    console.log('---------------------------------------------------');
}

function logWinner() {
    let playerWins = winners.filter((item) => item == 'Player').length;
    let computerWins = winners.filter((item) => item == 'Computer').length;
    if (playerWins > computerWins) {
        console.log('%cThe Player Won!', 'color: #83c44c');
    } else if (playerWins == computerWins) {
        console.log('%cIt\'s a tie!', 'color: #e3dd5f');
    } else {
        console.log('%cThe Computer Won!', 'color: #c44c4c');
    }
}