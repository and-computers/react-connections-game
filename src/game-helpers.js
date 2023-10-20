import { UAParser } from "ua-parser-js";

import {
  shuffle,
  chunk,
  doArraysHaveSameValues,
  differenceOfArrays,
} from "./utils";

export function shuffleGameData({ gameData }) {
  let categorySize;
  if (gameData[0]?.words) {
    categorySize = gameData[0].words.length;
  } else {
    categorySize = gameData[0].length;
  }

  const numCategories = gameData.length;
  let allWords = [];
  for (let i = 0; i < numCategories; i++) {
    if (gameData[i]?.words) {
      allWords.push(gameData[i].words);
    } else {
      allWords.push(gameData[i]);
    }
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

// Share logic from here: https://github.com/cwackerfuss/react-wordle/blob/main/src/lib/share.ts
const webShareApiDeviceTypes = ["mobile", "smarttv", "wearable"];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

const GAME_TITLE = "Black Connections";
const solutionIndex = 1;

export const shareStatus = (
  gameData,
  submittedGuesses,
  handleShareToClipboard,
  handleShareFailure
) => {
  const textToShare =
    `${GAME_TITLE} #${solutionIndex}\n\n` +
    generateEmojiGrid(gameData, submittedGuesses, getEmojiTiles());

  const shareData = { text: textToShare };

  let shareSuccess = false;

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData);
      shareSuccess = true;
    }
  } catch (error) {
    shareSuccess = false;
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure);
      } else {
        handleShareFailure();
      }
    }
  } catch (error) {
    handleShareFailure();
  }
};

export const generateEmojiGrid = (
  gameData,
  submittedGuesses,
  tiles = getEmojiTiles()
) => {
  const wordToDifficultyMap = {};

  const numCategories = gameData.length;
  const allWords = [];
  for (let i = 0; i < numCategories; i++) {
    allWords.push(gameData[i].words);

    let difficulty = gameData[i].difficulty;
    gameData[i].words.map((word) => (wordToDifficultyMap[word] = difficulty));
  }

  const allEmojiRowsArray = [];

  for (let i = 0; i < submittedGuesses.length; i++) {
    const submittedGuess = submittedGuesses[i];

    let wordDifficultiesArray = submittedGuess.map(
      (word) => wordToDifficultyMap[word]
    );

    const emojiRowForGuess = wordDifficultiesArray
      .map((wordDifficulty) => {
        switch (wordDifficulty) {
          case 1:
            return tiles[0];
          case 2:
            return tiles[1];
          case 3:
            return tiles[2];
          case 4:
            return tiles[3];
        }
      })
      .join("");

    allEmojiRowsArray.push(emojiRowForGuess);
  }

  return allEmojiRowsArray.join("\n");
};

const attemptShare = (shareData) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf("FIREFOX") === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? "") !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  );
};

const getEmojiTiles = () => {
  let tiles = [];
  tiles.push("🟩");
  tiles.push("🟨");
  tiles.push("🟪");
  tiles.push("🟦");
  return tiles;
};
