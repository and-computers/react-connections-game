import React from "react";
import styles from "./GameGrid.module.css";

import WordButton from "../WordButton";

function WordRow({ words, setGuessCandidate, guessCandidate }) {
  return (
    <div className={styles.flexGrid}>
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
    <div>
      <p>Solved!</p>
      <p>{props.category}</p>
      <p>{JSON.stringify(props.words)}</p>
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
    <div>
      {solvedGameData.map((solvedRowObj) => (
        <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
      ))}
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
  );
}

export default GameGrid;
