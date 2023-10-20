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

  //const fontSizeByWordLength = 9characters works with 0.6rem

  function getFontSize(word) {
    const baseLength = 7;
    const wordLength = word.length;
    let fontSize = 1;
    if (wordLength > baseLength) {
      const numExtraChars = wordLength - baseLength;
      console.log("num Extra Chars: ", numExtraChars);
      fontSize = fontSize - numExtraChars * 0.1;
      fontSize = Math.max(0.5, fontSize);
      console.log("font size", fontSize);
      return `${fontSize}em`;
    } else {
      return null;
    }
  }
  // word = "washingtonian";
  return (
    <Toggle
      className={`${styles.growShrink} select-none`}
      variant="outline"
      pressed={isSelected}
      onClick={flipSelection}
    >
      <p
        style={{ fontSize: getFontSize(word) }}
        className="font-space-mono uppercase sm:text-xs md:text-xs"
      >
        {word}
      </p>
    </Toggle>
  );
}

export default WordButton;
