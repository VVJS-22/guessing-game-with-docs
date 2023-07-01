"use strict"

let randomNumber = getRandomNumber(); // generate initial randomNumber
let remainingChances = 5; // initialize number of chances
let isWin = 0; // set flag to find if the user is won or not

/**
 * Helps to generate a random number between 1 and 100.
 * @returns {Number} randomNumber - a random number between 1 and 100.
 */
function getRandomNumber() {
    return Math.ceil(Math.random()*100);
}


/**
 * Adds history to notify user their previous guesses and it's range.
 * @param {Number} guess - A number guessed by user
 * @param {String} range - The range related to randomNumber (low, high or equal to number)
 */
function addHistory(guess, range) {
    if (range) {
        document.querySelector("#history").innerText += `You guessed ${guess}, ${range}.\n`
    } else {
        document.querySelector("#history").innerText += `You guessed ${guess}.\n`
    }
    
}

/**
 * Reset the game to start again
 */
function resetGame() {
    randomNumber = getRandomNumber(); // reset randomNumber
    remainingChances = 5; // reset remainingChances
    document.querySelector("#history").innerText = ''; // clear history
    setGameStatus(''); // clear gameStatus
    const numberInput = document.querySelector("form").number;

    // clear form
    numberInput.value = "";
    enableInput();
    numberInput.focus();
}

/**
 * Set game status
 * @param {String} status - The game status to set
 */
function setGameStatus(status) {
    document.querySelector("#status").innerText = status;
}

/**
 * Disables the number input field
 */
function disableInput() {
    document.querySelector("form").number.disabled = true;
}

/**
 * Enables the number input field
 */
function enableInput() {
    document.querySelector("form").number.disabled = false;
}

/**
 * A void function which reset the game onpress keyR
 */
void function resetGameOndownR() {
    document.addEventListener("keydown", ({key}) => {
        if (key === 'r') resetGame();
    })
}()

/**
 * Checks user input to the computer generated randomNumber
 * @param {Number} number - A guessed number to check
 */
function checkNumber(number) {
    let numberRange = ''; // initialize number range to empty string at every function call.
    if (remainingChances > 0) {
        number = +number // convert number param to Number type (suppose it isn't).
        if (!isWin && number === randomNumber) {
            disableInput();
            remainingChances = 0; // If user won, remainingChances would be left.
            isWin = 1;
            setGameStatus("You Won, reset game to restart"); 
        } else if ((remainingChances === 1) && (number !== randomNumber)) {
            setGameStatus(`GAME OVER, reset game to restart. My guess is ${randomNumber}`);
            disableInput();
        } else if (number < randomNumber) {
            numberRange = "Your guess is too low";
        } else {
            numberRange = "Your guess is too high";
        }
        addHistory(number, numberRange); // append number and numberRange and print.
        remainingChances--; // reduce a chance.
    }

}