document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("input");
  const submitButton = document.querySelector("button");
  const guessesContainer = document.querySelector(".previous-guesses");
  const guessesTitle = guessesContainer.querySelector(".title");
  const guessesList = guessesContainer.querySelector(".guesses");
  const answerStatusContainer = document.querySelector(
    ".answer-status-container"
  );
  const status = answerStatusContainer.querySelector(".answer-status");
  const startBtn = answerStatusContainer.querySelector(".start");

  let previousGuesses = [];
  const target = Math.floor(Math.random() * 100) + 1;
  let guessCounter = 0;

  function updateGuessesUI() {
    if (previousGuesses.length > 0) {
      guessesTitle.textContent = "Previous Guesses:";
      guessesList.innerHTML = previousGuesses
        .map((guess) => `<li>${guess}</li>`)
        .join(", ");
    }
  }

  function updateStatusUI(msg, clr) {
    status.textContent = msg;
    status.style.backgroundColor = clr;
  }

  function showNewGameBtn() {
    startBtn.style.display = "block";
  }

  function reset() {
    previousGuesses = [];
    input.value = "";
    guessesContainer.style.display = "none";
    status.style.display = "none";
    guessCounter = 0;
    input.disabled = false;
    startBtn.style.display = "none";
    input.focus();
  }

  function evaluateGuessFeedback(guess) {
    const difference = target - guess;

    const highGuess =
      (guess > target && difference >= -10) || difference > target;

    const tooHighGuess =
      (guess > target && difference < -10) || difference > target;

    const nearGuess = guess < target && difference <= 10;

    const tooLowGuess =
      (guess < target && difference < 0) ||
      (difference < target && difference > 10);

    const limitExceeded = previousGuesses.length >= 9;

    switch (true) {
      case limitExceeded:
        updateStatusUI("Game over!", "red");
        submitButton.disabled = true;
        showNewGameBtn();
        break;
      case difference === 0:
        updateStatusUI("Congratulations! You got it right!", "green");
        showNewGameBtn();
        break;
      case tooLowGuess:
        updateStatusUI("Last guess was too low!", "red");
        break;
      case nearGuess:
        updateStatusUI("Last guess was near!", "yellow");
        break;
      case tooHighGuess:
        updateStatusUI("Last guess was too high!", "red");
        break;
      case highGuess:
        updateStatusUI("Last guess was high!", "red");
        break;
      default:
        return undefined;
    }
  }

  function assessNumber() {
    const guess = parseInt(input.value.trim());

    if (guess) {
      previousGuesses.push(guess);
      guessCounter += 1;
      input.value = "";
      guessesContainer.style.display = "block";
      status.style.display = "block";

      updateGuessesUI();

      if (guessCounter >= 9) {
        showNewGameBtn();
        input.disabled = true;
      }
    }

    evaluateGuessFeedback(guess);
  }

  submitButton.addEventListener("click", assessNumber);
  startBtn.addEventListener("click", reset);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") assessNumber();
  });
});
