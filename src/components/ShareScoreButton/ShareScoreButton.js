import React from "react";
import Sparkles from "../Sparkles";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { shareStatus } from "../../game-helpers";

function ShareScoreButton({ gameData, submittedGuesses }) {
  const { toast } = useToast();
  function handleShareToClipboard() {
    toast({
      label: "Notification",
      title: "",
      description: "Copied to clipboard!",
    });
  }
  function handleShareFailure() {
    toast({
      label: "Notification",
      title: "",
      description: "Was unable to copy to clipboard / share.",
    });
  }
  return (
    <Sparkles>
      <Button
        variant="share"
        onClick={() =>
          shareStatus(
            gameData,
            submittedGuesses,
            handleShareToClipboard,
            handleShareFailure
          )
        }
      >
        Share
      </Button>
    </Sparkles>
  );
}

export default ShareScoreButton;
