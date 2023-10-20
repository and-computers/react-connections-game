import React from "react";
import Header from "../Header";
import Game from "../Game";

import { Toaster } from "../ui/toaster";
import { solution as puzzleForToday } from "../../lib/time-utils";
function App() {
  const [gameData, setGameData] = React.useState(puzzleForToday);
  return (
    <div className="wrapper">
      <Toaster />
      <Header />
      <Game gameData={gameData} setGameData={setGameData} />
    </div>
  );
}

export default App;
