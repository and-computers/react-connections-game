import React from "react";
import styles from "./WordButton.module.css";

import { Toggle } from "../ui/toggle";

function WordButton({
  word,
  setGuessCandidate,
  guessCandidate,
  fullCandidateSize,
}) {
  const [isSelected, setIsSelected] = React.useState(
    !!guessCandidate.includes(word)
  );

  React.useEffect(() => {
    setIsSelected(!!guessCandidate.includes(word));
  }, [guessCandidate]);

  function flipSelection() {
    if (isSelected) {
      // remove from candidateGuess
      const updatedGuessCandidate = guessCandidate.filter((w) => {
        return w !== word;
      });
      setGuessCandidate(updatedGuessCandidate);
      // set state to *not* selected
      setIsSelected(false);
    } else {
      if (guessCandidate.length < fullCandidateSize) {
        // add to candidateGuess array
        setGuessCandidate([...guessCandidate, word]);
        // set state to *selected*
        setIsSelected(true);
      }
    }
  }
  return (
    <Toggle variant="outline" pressed={isSelected} onClick={flipSelection}>
      {word}
    </Toggle>
  );
}

export default WordButton;
