import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function Game() {
  const id = useParams().id;
  return (
    <>
      <h1>Game {id}</h1>
    </>
  );
}

export default Game;
