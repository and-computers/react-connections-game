import React from "react";

import WordButton from "../WordButton";

import { Check } from "lucide-react";

function WordRow({ words, setGuessCandidate, guessCandidate }) {
  return (
    <div className={`grid grid-cols-${words.length} gap-4`}>
      {words.map((word) => (
        <WordButton
          key={word}
          word={word}
          fullCandidateSize={words.length}
          setGuessCandidate={setGuessCandidate}
          guessCandidate={guessCandidate}
        />
      ))}
    </div>
  );
}

function SolvedWordRow({ ...props }) {
  return (
    <div className={` bg-green-300 border-solid`}>
      <p className="font-bold">{props.category}</p>
      <p className="font-thin">{props.words.join(", ")}</p>
    </div>
  );
}

function GameGrid({
  gameRows,
  submittedGuesses,
  guessCandidate,
  setGuessCandidate,
  solvedGameData,
  isGameOver,
}) {
  return (
    <>
      <div className="grid gap-y-4">
        {solvedGameData.map((solvedRowObj) => (
          <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
        ))}
      </div>
      <div className="grid gap-y-4">
        {!isGameOver &&
          gameRows.map((row, idx) => (
            <WordRow
              key={idx}
              setGuessCandidate={setGuessCandidate}
              words={row}
              guessCandidate={guessCandidate}
            />
          ))}
      </div>
    </>
  );
}

export default GameGrid;
