import "./styles.css";
import React, { useState } from "react";
import Game from "./Game";

const App = () => {
  const [game, setGame] = useState(null);

  return (
    <>
      <Game game={game} setGame={setGame} />
    </>
  );
};

export default App;
