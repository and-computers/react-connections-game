import React from "react";
import Header from "../Header";
import Game from "../Game";
import { sample } from "../../utils";
import { CONNECTION_GAMES } from "../../data";
import { Toaster } from "../ui/toaster";
function App() {
  const [gameData, setGameData] = React.useState(sample(CONNECTION_GAMES));
  return (
    <div className="wrapper">
      <Toaster />
      <Header />
      <Game gameData={gameData} setGameData={setGameData} />
    </div>
  );
}

export default App;
