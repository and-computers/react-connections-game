import React from "react";
import { puzzleAnswers } from "../../lib/time-utils";

export const PuzzleDataContext = React.createContext();

function PuzzleDataProvider({ children }) {
  const [gameData, setGameData] = React.useState(puzzleAnswers);
  const categorySize = gameData[0].words.length;
  const numCategories = gameData.length;
  return (
    <PuzzleDataContext.Provider
      value={{ gameData, numCategories, categorySize }}
    >
      {children}
    </PuzzleDataContext.Provider>
  );
}

export default PuzzleDataProvider;
