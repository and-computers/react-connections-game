import React from "react";

import WordButton from "../WordButton";

import * as styles from "./GameGrid.module.css";

import { useSpring, animated } from "react-spring";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

function WordRow({ words }) {
  return (
    <div className={`grid grid-cols-4 gap-4`}>
      {words.map((word) => (
        <WordButton key={word} word={word} fullCandidateSize={words.length} />
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

  const [hasBeenClicked, setHasBeenClicked] = React.useState(false);

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
  // if there is an image available render it as a popover
  const isImageAvailable = props.imageSrc != null;
  return (
    <animated.div style={springProps}>
      {!isImageAvailable ? (
        <div style={{ backgroundColor: color, borderRadius: 8 }}>
          <p className="font-bold pt-2 pl-4">{props.category}</p>
          <p className="font-thin pb-2 pl-4">{props.words.join(", ")}</p>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="cursor-pointer hover:animate-pulse shadow-md"
              style={{ backgroundColor: color, borderRadius: 8 }}
              onClick={() => setHasBeenClicked(true)}
            >
              {!hasBeenClicked && (
                <Badge className="animate-pulse absolute top-0 right-0 mr-2 mt-2">
                  View More
                </Badge>
              )}
              <p className="font-bold pt-2 pl-4">{props.category}</p>
              <p className="font-thin pb-2 pl-4">{props.words.join(", ")}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <img src={props.imageSrc} />
            </div>
          </PopoverContent>
        </Popover>
      )}
    </animated.div>
  );
}

function GameGrid({ gameRows, shouldGridShake, setShouldGridShake }) {
  const { submittedGuesses, isGameOver, isGameWon, solvedGameData } =
    React.useContext(GameStatusContext);

  const { gameData } = React.useContext(PuzzleDataContext);

  React.useEffect(() => {
    const shakeEffect = window.setTimeout(() => {
      setShouldGridShake(false);
      // this timeout should probably be calculated since it depends on animation values for the grid shake
    }, 2000);

    // cleanup timeout
    return () => window.clearTimeout(shakeEffect);
  }, [submittedGuesses]);

  const isGameOverAndLost = isGameOver && !isGameWon;
  const isGameOverAndWon = isGameOver && isGameWon;
  const isGameActive = !isGameOver;
  const isGameActiveWithAnySolvedRows =
    isGameActive && solvedGameData.length > 0;

  return (
    <div>
      {(isGameOverAndWon || isGameActiveWithAnySolvedRows) && (
        <div className="grid gap-y-2 pb-2">
          {solvedGameData.map((solvedRowObj) => (
            <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
          ))}
        </div>
      )}
      {isGameActive && (
        <div className={`grid gap-y-2 ${shouldGridShake ? styles.shake : ""}`}>
          {gameRows.map((row, idx) => (
            <WordRow key={idx} words={row} />
          ))}
        </div>
      )}
      {/* Show correct answers here after the game is over if they lost */}
      {isGameOverAndLost && (
        <div className="grid gap-y-2 pb-2">
          <p>The answer categories are below.</p>
          {gameData.map((obj) => (
            <SolvedWordRow key={obj.category} {...obj} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameGrid;
