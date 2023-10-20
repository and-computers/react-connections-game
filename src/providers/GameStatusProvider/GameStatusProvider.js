import React from "react";
import { MAX_MISTAKES } from "../../lib/constants";
import { PuzzleDataContext } from "../PuzzleDataProvider";
export const GameStatusContext = React.createContext();

function GameStatusProvider({ children }) {
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isGameWon, setIsGameWon] = React.useState(false);
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const [submittedGuesses, setSubmittedGuesses] = React.useState([]);
  const [solvedGameData, setSolvedGameData] = React.useState([]);

  const { gameData } = React.useContext(PuzzleDataContext);

  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;

  // use effect to check if game is won
  React.useEffect(() => {
    if (solvedGameData.length === gameData.length) {
      setIsGameOver(true);
      setIsGameWon(true);
    }
  }, [solvedGameData]);

  // use effect to check if all mistakes have been used and end the game accordingly
  React.useEffect(() => {
    if (numMistakesUsed >= MAX_MISTAKES) {
      setIsGameOver(true);
      setIsGameWon(false);
    }
  }, [submittedGuesses]);

  return (
    <GameStatusContext.Provider
      value={{
        isGameOver,
        isGameWon,
        numMistakesUsed,
        solvedGameData,
        setSolvedGameData,
        submittedGuesses,
        setSubmittedGuesses,
        guessCandidate,
        setGuessCandidate,
      }}
    >
      {children}
    </GameStatusContext.Provider>
  );
}

export default GameStatusProvider;
