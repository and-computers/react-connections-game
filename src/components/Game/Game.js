import React from "react";
import { MAX_MISTAKES } from "../../constants";
import {
  shuffleGameData,
  isGuessRepeated,
  isGuessCorrect,
} from "../../game-helpers";
import GameGrid from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";

function Game({ gameData, setGameData }) {
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const [submittedGuesses, setSubmittedGuesses] = React.useState([]);
  const [shuffledRows, setShuffledRows] = React.useState(
    shuffleGameData({ gameData })
  );
  const [solvedGameData, setSolvedGameData] = React.useState([]);
  const [isGameOver, setIsGameOver] = React.useState(false);

  const categorySize = gameData[0].words.length;
  const numCategories = gameData.length;
  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;

  // use effect to update Game Grid after a row has been correctly solved
  // end game if all rows have been solved
  React.useEffect(() => {
    if (solvedGameData.length === gameData.length) {
      window.alert("You Won!");
      setIsGameOver(true);
      return;
    }
    const categoriesToRemoveFromRows = solvedGameData.map(
      (data) => data.category
    );
    const dataLeftForRows = gameData.filter((data) => {
      return !categoriesToRemoveFromRows.includes(data.category);
    });
    setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
  }, [solvedGameData]);

  // use effect to check if all mistakes have been used and end the game accordingly
  React.useEffect(() => {
    if (numMistakesUsed >= MAX_MISTAKES) {
      window.alert("You lost :(");
      setIsGameOver(true);
      return;
    }
  }, [submittedGuesses]);

  function deselectAll() {
    setGuessCandidate([]);
  }

  function submitCandidateGuess() {
    // check that its a valid guess by size
    if (guessCandidate.length !== categorySize) {
      return;
    }
    // check that the guess hasnt already been submitted previously
    if (isGuessRepeated({ submittedGuesses, guessCandidate })) {
      window.alert("You previously made this guess!");
      return;
    }
    // add guess to state
    setSubmittedGuesses([...submittedGuesses, guessCandidate]);
    // check if the guess is correct
    const { isCorrect, correctWords, correctCategory, isGuessOneAway } =
      isGuessCorrect({
        guessCandidate,
        gameData,
      });

    console.log({ isCorrect, correctWords, correctCategory, isGuessOneAway });

    if (isGuessOneAway) {
      window.alert("one guess away");
    }

    // if the guess is correct:
    // set it as solved in game data
    if (isCorrect) {
      setSolvedGameData([
        ...solvedGameData,
        { category: correctCategory, words: correctWords },
      ]);
      const dataLeftForRows = gameData.filter((dataObj) => {
        return dataObj.category !== correctCategory;
      });
      setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
    }

    setGuessCandidate([]);
  }

  return (
    <>
      <p>
        Create {numCategories} groups of {categorySize}
      </p>
      <GameGrid
        solvedGameData={solvedGameData}
        gameRows={shuffledRows}
        submittedGuesses={submittedGuesses}
        guessCandidate={guessCandidate}
        setGuessCandidate={setGuessCandidate}
        isGameOver={isGameOver}
      />
      <NumberOfMistakesDisplay
        maxMistakes={MAX_MISTAKES}
        numMistakesUsed={numMistakesUsed}
      />
      <div>
        <button onClick={() => setShuffledRows(shuffleGameData({ gameData }))}>
          Shuffle
        </button>
        <button onClick={deselectAll}>Deselect All</button>
        <button
          onClick={submitCandidateGuess}
          disabled={guessCandidate.length !== categorySize}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Game;
