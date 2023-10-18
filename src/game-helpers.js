import {
  shuffle,
  chunk,
  doArraysHaveSameValues,
  differenceOfArrays,
} from "./utils";

export function shuffleGameData({ gameData }) {
  const categorySize = gameData[0].words.length;
  const numCategories = gameData.length;
  let allWords = [];
  for (let i = 0; i < numCategories; i++) {
    allWords.push(gameData[i].words);
  }

  return chunk(categorySize, shuffle(allWords.flat()));
}

export function isGuessCorrect({ gameData, guessCandidate }) {
  let isCorrect = false;
  let correctWords = "";
  let correctCategory = "";
  let isGuessOneAway = false;
  let correctDifficulty = null;
  const differencesOfArrays = [];
  for (let i = 0; i < gameData.length; i++) {
    correctWords = gameData[i].words;
    correctCategory = gameData[i].category;
    correctDifficulty = gameData[i].difficulty;

    if (doArraysHaveSameValues(guessCandidate, correctWords)) {
      console.log("correct guess!");
      isCorrect = true;
      return {
        isCorrect,
        correctWords,
        correctCategory,
        isGuessOneAway,
        correctDifficulty,
      };
    } else {
      // check size of difference, were doing this twice, but no need to optimize for tiny arrays
      const differenceLength = differenceOfArrays(
        guessCandidate,
        correctWords
      ).length;
      // store how far off their guess was from category
      differencesOfArrays.push(differenceLength);
    }
  }

  isGuessOneAway = Math.min(...differencesOfArrays) === 1;

  return { isCorrect, correctWords, correctCategory, isGuessOneAway };
}

export function isGuessRepeated({ submittedGuesses, guessCandidate }) {
  for (let i = 0; i < submittedGuesses.length; i++) {
    const prevGuess = submittedGuesses[i];

    if (doArraysHaveSameValues(guessCandidate, prevGuess)) {
      return true;
    }
  }

  return false;
}
