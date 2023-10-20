import React from "react";

import WordButton from "../WordButton";

import * as styles from "./GameGrid.module.css";

import { useSpring, animated } from "react-spring";

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

  const springProps = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0%)",
    },
    delay: 250,
  });
  return (
    <animated.div style={springProps}>
      <div style={{ backgroundColor: color, borderRadius: 8 }}>
        <p className="font-bold pt-2 pl-4">{props.category}</p>
        <p className="font-thin pb-2 pl-4">{props.words.join(", ")}</p>
      </div>
    </animated.div>
  );
}

function GameGrid({
  gameRows,
  submittedGuesses,
  guessCandidate,
  setGuessCandidate,
  solvedGameData,
  isGameOver,
  shouldGridShake,
  setShouldGridShake,
}) {
  React.useEffect(() => {
    const shakeEffect = window.setTimeout(() => {
      console.log("turning off shake");
      setShouldGridShake(false);
      // this timeout should probably be calculated since it depends on animation values
    }, 2000);

    // cleanup timeout
    return () => window.clearTimeout(shakeEffect);
  }, [submittedGuesses]);
  return (
    <div>
      {solvedGameData.length > 0 && (
        <div className="grid gap-y-2">
          {solvedGameData.map((solvedRowObj) => (
            <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
          ))}
        </div>
      )}
      {!isGameOver && (
        <div className={`grid gap-y-2 ${shouldGridShake && styles.shake}`}>
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
      )}
    </div>
  );
}

export default GameGrid;
