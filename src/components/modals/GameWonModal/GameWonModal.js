import React from "react";
import BaseModal from "../BaseModal";
import Sparkles from "../../Sparkles";

import { generateEmojiGrid } from "../../../game-helpers";
import ShareScoreButton from "../../ShareScoreButton";

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
      </div>
    </BaseModal>
  );
}

export default GameWonModal;
