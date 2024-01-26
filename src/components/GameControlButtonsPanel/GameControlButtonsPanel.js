import React, { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Shuffle, Undo, SendHorizontal } from "lucide-react";
import {
  isGuessCorrect,
  isGuessRepeated,
  shuffleGameData,
} from "../../lib/game-helpers";

import { GameStatusContext } from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";

function GameControlButtonsPanel({
  shuffledRows,
  setShuffledRows,
  setGridShake,
}) {
  const {
    isGameOver,
    guessCandidate,
    setGuessCandidate,
    submittedGuesses,
    setSubmittedGuesses,
    solvedGameData,
    setSolvedGameData,
    puzzleCreator,
    seenOnNYT,
    setPuzzleCreator,
    setSeenOnNYT,
  } = React.useContext(GameStatusContext);
  const { gameData, categorySize } = React.useContext(PuzzleDataContext);
  const { toast } = useToast();
  // const [puzzleCreator, setPuzzleCreator] = useState("Human");
  // const [seenOnNYT, setSeenOnNYT] = useState("Yes");


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
    const {
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
      correctImageSrc,
    } = isGuessCorrect({
      guessCandidate,
      gameData,
    });

    // if the guess is correct:
    // set it as solved in game data
    if (isCorrect) {
      setSolvedGameData([
        ...solvedGameData,
        {
          category: correctCategory,
          words: correctWords,
          difficulty: correctDifficulty,
          imageSrc: correctImageSrc,
        },
      ]);
      setGuessCandidate([]);
    } else {
      // Shake the grid to give feedback that they were wrong
      setGridShake(true);
      if (isGuessOneAway) {
        toast({
          label: "Notification",
          title: "Close Guess",
          description:
            "You were one guess away from correctly guessing a category!",
        });
      }
    }
  }

  return (
    
<div className="controls-container">
<div className="grid grid-cols-3 gap-4">
        {/* Existing buttons here */}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div>
          <label htmlFor="puzzleCreator" className="block text-sm font-medium text-gray-700">Puzzle Created By:</label>
          <select
            id="puzzleCreator"
            value={puzzleCreator}
            onChange={(e) => setPuzzleCreator(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Human">Human</option>
            <option value="AI">AI</option>
          </select>
        </div>
        {puzzleCreator === "Human" && (
          <div>
            <label htmlFor="seenOnNYT" className="block text-sm font-medium text-gray-700">Seen before on NYT?</label>
            <select
              id="seenOnNYT"
              value={seenOnNYT}
              onChange={(e) => setSeenOnNYT(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
      </div>
      <div className="button-row">
        <Button
          disabled={isGameOver}
          variant="secondary"
          onClick={() => setShuffledRows(shuffleGameData({ gameData: shuffledRows }))}
        >
          <Shuffle className="h-4 w-4 mr-2" strokeWidth={1} />
          <p className="select-none">Shuffle</p>
        </Button>
        <Button
          disabled={isGameOver}
          variant="secondary"
          onClick={deselectAll}
        >
          <Undo className="h-4 w-4 mr-2" strokeWidth={1} />
          <p className="select-none">Deselect All</p>
        </Button>
        <Button
          variant="submit"
          onClick={submitCandidateGuess}
          disabled={isGameOver || guessCandidate.length !== categorySize}
        >
          <SendHorizontal className="h-4 w-4 mr-2" strokeWidth={1} />
          <p className="select-none">Submit</p>
        </Button>
      </div>
    </div>
  );
}

export default GameControlButtonsPanel;




