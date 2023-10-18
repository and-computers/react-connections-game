import React from "react";
import Header from "../Header";
import Game from "../Game";
import { sample } from "../../utils";
import { CONNECTION_GAMES } from "../../data";
function App() {
  const [gameData, setGameData] = React.useState(sample(CONNECTION_GAMES));
  return (
    <div className="wrapper">
      <Header />
      <div className="game-wrapper">
        <Game gameData={gameData} setGameData={setGameData} />
      </div>
    </div>
  );
}

export default App;
