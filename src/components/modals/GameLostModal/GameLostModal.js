import React from "react";
import BaseModal from "../BaseModal";
import { SolvedWordRow } from "../../GameGrid";
import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";

function GameLostModal({ open, submittedGuesses }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title="You lost."
      initiallyOpen={open}
      footerElements={
        <ShareScoreButton
          gameData={gameData}
          submittedGuesses={submittedGuesses}
        />
      }
      continueButtonText="Done"
    >
      <p>{"Better luck next time."}</p>
      <div className="grid gap-y-2">
        <p>The correct answers are below.</p>
        {gameData.map((obj) => (
          <SolvedWordRow key={obj.category} {...obj} />
        ))}
      </div>
      <CountdownToNextPuzzle />
    </BaseModal>
  );
}

export default GameLostModal;
