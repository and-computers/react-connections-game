import React from "react";
import Header from "../Header";
import Game from "../Game";

import { Toaster } from "../ui/toaster";
import PuzzleDataProvider from "../../providers/PuzzleDataProvider";

function App() {
  return (
    <PuzzleDataProvider>
      <div className="wrapper">
        <Toaster />
        <Header />
        <Game />
      </div>
    </PuzzleDataProvider>
  );
}

export default App;
