import {
  shuffle,
  chunk,
  doArraysHaveSameValues,
  differenceOfArrays,
} from "./utils";

function getAllWordsOfGameData({ gameData }) {
  const numCategories = gameData.length;
  let allWords = [];
  for (let i = 0; i < numCategories; i++) {
    if (gameData[i]?.words) {
      allWords.push(gameData[i].words);
    } else {
      allWords.push(gameData[i]);
    }
  }
  return allWords.flat();
}

export function shuffleGameData({ gameData }) {
  let categorySize;
  if (gameData[0]?.words) {
    categorySize = gameData[0].words.length;
  } else {
    categorySize = gameData[0].length;
  }

  const allWordsFlattened = getAllWordsOfGameData({ gameData });

  return chunk(categorySize, shuffle(allWordsFlattened));
}

export function isGuessCorrect({ gameData, guessCandidate }) {
  let isCorrect = false;
  let correctWords = "";
  let correctCategory = "";
  let correctImageSrc = null;
  let isGuessOneAway = false;
  let correctDifficulty = null;
  const differencesOfArrays = [];
  for (let i = 0; i < gameData.length; i++) {
    correctWords = gameData[i].words;
    correctCategory = gameData[i].category;
    correctDifficulty = gameData[i].difficulty;
    correctImageSrc = gameData[i].imageSrc;

    if (doArraysHaveSameValues(guessCandidate, correctWords)) {
      isCorrect = true;
      return {
        isCorrect,
        correctWords,
        correctCategory,
        isGuessOneAway,
        correctDifficulty,
        correctImageSrc,
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

  return {
    isCorrect,
    correctWords,
    correctCategory,
    isGuessOneAway,
    correctImageSrc,
  };
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

export function isGameDataEquivalent({ gd1, gd2 }) {
  if (gd1 == null || gd2 == null) {
    return false;
  }
  if (gd1.length !== gd2.length) {
    return false;
  }
  for (let i = 0; i < gd1.lengthl; i++) {
    if (!doArraysHaveSameValues(gd1.words[i], gd2.words[i])) {
      return false;
    }
  }
  return true;
}

export function isGuessesFromGame({ gameData, submittedGuesses }) {
  const allGameWordsFlattened = getAllWordsOfGameData({ gameData });
  const allGuessesFlattened = getAllWordsOfGameData({
    gameData: submittedGuesses,
  });

  if (submittedGuesses.length === 0) {
    return false;
  }

  const isSubset = allGuessesFlattened.every((val) =>
    allGameWordsFlattened.includes(val)
  );

  return isSubset;
}

export const generateEmojiGrid = (gameData, submittedGuesses) => {
  const wordToDifficultyMap = {};
  const tiles = getEmojiTiles();

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

  return `${allEmojiRowsArray.join("\n")}`;
};

export function getEmojiTiles() {
  let tiles = [];
  tiles.push("🟩");
  tiles.push("🟨");
  tiles.push("🟪");
  tiles.push("🟦");
  return tiles;
}
