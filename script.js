const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const hintText = document.querySelector(".hint-text b");
const guessText = document.querySelector(".guess-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");
const hangmanImage = document.querySelector(".hangman-box img");

let currentWord;
let incorrectGuesses = 0;
const maxGuesses = 6;
let correctGuesses = [];

const getRandomWord = () => {
  const { word, Hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.innerText = Hint;
  incorrectGuesses = 0;
  correctGuesses = [];
  guessText.innerText = `${incorrectGuesses}/${maxGuesses}`;
  hangmanImage.src = `hangman-${incorrectGuesses}.svg`;
  wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? "You found the word!" : "The correct word was:";
    gameModal.querySelector("h4").innerText = isVictory ? "Congratulations!" : "Game Over!";
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.querySelector("img").src = isVictory ? "victory.gif" : "lost.gif";
    gameModal.classList.add("show");
  }, 300);
}

const updateWordDisplay = (letter) => {
  const letters = document.querySelectorAll(".letter");
  currentWord.split("").forEach((char, index) => {
    if (char.toLowerCase() === letter.toLowerCase()) {
      letters[index].innerText = char;
      if (!correctGuesses.includes(char.toLowerCase())) {
        correctGuesses.push(char.toLowerCase());
      }
    }
  });

  // Check if the player has guessed all letters
  if (correctGuesses.length === new Set(currentWord.toLowerCase()).size) {
    gameOver(true);
  }
}

const initGame = (button, clickedLetter) => {
  button.disabled = true;
  if (currentWord.toLowerCase().includes(clickedLetter.toLowerCase())) {
    updateWordDisplay(clickedLetter);
  } else {
    incorrectGuesses++;
    hangmanImage.src = `hangman-${incorrectGuesses}.svg`;
    guessText.innerText = `${incorrectGuesses}/${maxGuesses}`;
    if (incorrectGuesses === maxGuesses) {
      gameOver(false);
    }
  }
}

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

playAgainButton.addEventListener("click", () => {
  gameModal.classList.remove("show");
  getRandomWord();
  const buttons = keyboardDiv.querySelectorAll("button");
  buttons.forEach(button => button.disabled = false);
});

getRandomWord();
