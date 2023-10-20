import React from "react";
import { puzzleAnswers } from "../../lib/time-utils";

export const PuzzleDataContext = React.createContext();

function PuzzleDataProvider({ children }) {
  const [gameData, setGameData] = React.useState(puzzleAnswers);

  return (
    <PuzzleDataContext.Provider value={{ gameData }}>
      {children}
    </PuzzleDataContext.Provider>
  );
}

export default PuzzleDataProvider;
