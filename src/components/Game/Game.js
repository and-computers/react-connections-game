import React from "react";
import { sleep } from "../../utils";
import { MAX_MISTAKES } from "../../constants";
import {
  shuffleGameData,
  isGuessRepeated,
  isGuessCorrect,
} from "../../game-helpers";
import GameGrid from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { useToast } from "../ui/use-toast";

import { Shuffle, Undo, SendHorizontal } from "lucide-react";

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

  const { toast } = useToast();

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
      toast({
        label: "Notification",
        title: "Repeated Guess",
        description: "You previously made this guess!",
      });

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
      toast({
        label: "Notification",
        title: "Close Guess",
        description:
          "You we're one guess away from correctly guessing a category!",
      });
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
      <h4 className="text-md">
        Create {numCategories} groups of {categorySize}
      </h4>
      <GameGrid
        solvedGameData={solvedGameData}
        gameRows={shuffledRows}
        submittedGuesses={submittedGuesses}
        guessCandidate={guessCandidate}
        setGuessCandidate={setGuessCandidate}
        isGameOver={isGameOver}
      />
      <Separator />
      <NumberOfMistakesDisplay
        maxMistakes={MAX_MISTAKES}
        numMistakesUsed={numMistakesUsed}
      />
      <div className="grid grid-cols-3 gap-4">
        <Button
          disabled={isGameOver}
          variant="secondary"
          onClick={() => setShuffledRows(shuffleGameData({ gameData }))}
        >
          <Shuffle className="h-4 w-4 mr-2" strokeWidth={1} />
          Shuffle
        </Button>
        <Button disabled={isGameOver} variant="secondary" onClick={deselectAll}>
          <Undo className="h-4 w-4 mr-2" strokeWidth={1} />
          Deselect All
        </Button>
        <Button
          variant="submit"
          onClick={submitCandidateGuess}
          disabled={isGameOver || guessCandidate.length !== categorySize}
        >
          <SendHorizontal className="h-4 w-4 mr-2" strokeWidth={1} />
          Submit
        </Button>
      </div>
    </>
  );
}

export default Game;
