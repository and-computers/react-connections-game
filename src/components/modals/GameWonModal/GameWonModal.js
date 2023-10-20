import React from "react";
import BaseModal from "../BaseModal";

import { generateEmojiGrid } from "../../../lib/game-helpers";
import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";

function GameWonModal({ open, gameData, submittedGuesses }) {
  return (
    <BaseModal
      title="You won the game!"
      initiallyOpen={open}
      footerElements={
        <ShareScoreButton
          gameData={gameData}
          submittedGuesses={submittedGuesses}
        />
      }
      continueButtonText="Done"
    >
      <p>{"Great job, share your results!"}</p>
      <div className="justify-center">
        <span style={{ whiteSpace: "pre" }}>
          {"\n"}
          {generateEmojiGrid(gameData, submittedGuesses)}
        </span>
        <CountdownToNextPuzzle />
      </div>
    </BaseModal>
  );
}

export default GameWonModal;
