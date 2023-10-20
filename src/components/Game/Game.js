import React from "react";
import { MAX_MISTAKES } from "../../lib/constants";
import {
  generateEmojiGrid,
  shuffleGameData,
  isGuessRepeated,
  isGuessCorrect,
  shareStatus,
} from "../../lib/game-helpers";
import GameGrid from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";
import GameLostModal from "../modals/GameLostModal";
import GameWonModal from "../modals/GameWonModal";
import Sparkles from "../Sparkles";
import { SolvedWordRow } from "../GameGrid";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { Shuffle, Undo, SendHorizontal } from "lucide-react";

import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";

function Game() {
  const { gameData } = React.useContext(PuzzleDataContext);
  const {
    guessCandidate,
    setGuessCandidate,
    submittedGuesses,
    setSubmittedGuesses,
    solvedGameData,
    setSolvedGameData,
    isGameOver,
    isGameWon,
  } = React.useContext(GameStatusContext);

  const [shuffledRows, setShuffledRows] = React.useState(
    shuffleGameData({ gameData })
  );
  const [isEndGameModalOpen, setisEndGameModalOpen] = React.useState(false);
  const [gridShake, setGridShake] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const categorySize = gameData[0].words.length;
  const numCategories = gameData.length;

  const { toast } = useToast();

  // use effect to update Game Grid after a row has been correctly solved
  React.useEffect(() => {
    const categoriesToRemoveFromRows = solvedGameData.map(
      (data) => data.category
    );
    const dataLeftForRows = gameData.filter((data) => {
      return !categoriesToRemoveFromRows.includes(data.category);
    });
    if (dataLeftForRows.length > 0) {
      setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
    }
  }, [solvedGameData]);

  // Handle End Game!
  React.useEffect(() => {
    if (!isGameOver) {
      return;
    }

    // extra delay for game won to allow confetti to show
    const modalDelay = isGameWon ? 2000 : 250;

    const delayModalOpen = window.setTimeout(() => {
      setisEndGameModalOpen(true);
      //unmount confetti after modal opens
      setShowConfetti(false);
    }, modalDelay);

    if (isGameWon) {
      setShowConfetti(true);
    }

    return () => window.clearTimeout(delayModalOpen);
  }, [isGameOver]);

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
    <>
      <h4 className="text-xl text-center mt-4">
        Create {numCategories} groups of {categorySize}
      </h4>

      <div className={`game-wrapper`}>
        {isGameOver && isGameWon ? (
          <GameWonModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
          />
        ) : (
          <GameLostModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
          />
        )}
        <GameGrid
          gameRows={shuffledRows}
          shouldGridShake={gridShake}
          setShouldGridShake={setGridShake}
        />
        {showConfetti && isGameOver && (
          <div className="grid place-content-center">
            <ConfettiExplosion
              particleCount={100}
              force={0.8}
              duration={2500}
            />
          </div>
        )}
        <Separator />
        <NumberOfMistakesDisplay />
        <div className="grid grid-cols-3 gap-4">
          <Button
            disabled={isGameOver}
            variant="secondary"
            onClick={() =>
              setShuffledRows(shuffleGameData({ gameData: shuffledRows }))
            }
          >
            <Shuffle className="h-4 w-4 mr-2" strokeWidth={1} />
            <p className="select-none">Shuffle</p>
          </Button>
          <Button
            size="deselectallsize"
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
    </>
  );
}

export default Game;
