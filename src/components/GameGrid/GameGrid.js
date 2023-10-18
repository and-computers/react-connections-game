import React from "react";

import WordButton from "../WordButton";

import { Check } from "lucide-react";

function WordRow({ words, setGuessCandidate, guessCandidate }) {
  return (
    <div className={`grid grid-cols-4 gap-4`}>
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

export function SolvedWordRow({ ...props }) {
  const DIFFICULTY_COLOR_MAP = {
    1: "rgb(74 222 128)", // green
    2: "rgb(251 191 36)", // amber
    3: "rgb(129 140 248)", //indigo
    4: "rgb(34 211 238)", //cyan
  };

  const color = `${DIFFICULTY_COLOR_MAP[props.difficulty]}`;
  console.log(color);
  return (
    <div style={{ backgroundColor: color, borderRadius: 8 }}>
      <p className="font-bold pt-2 pl-4">{props.category}</p>
      <p className="font-thin pb-2 pl-4">{props.words.join(", ")}</p>
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
      <div className="grid gap-y-2">
        {solvedGameData.map((solvedRowObj) => (
          <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
        ))}
      </div>
      <div className="grid gap-y-2">
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
