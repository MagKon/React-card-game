import React, { useEffect, useState } from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { getCardById, getGameById } from "../api/api";
import Card from "../components/Card";

function Game() {
  const id = useParams().id;
  const [game, setGame] = useState(JSON.parse(sessionStorage.getItem("game")));
  const [player] = useState(
    game.players.find(
      (player) => player.uid === JSON.parse(sessionStorage.getItem("user")).id
    )
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      // Load all cards
      const cards = await getCards();
      setCards(cards);
    }
    loadCards();
  }, []);

  async function getCards() {
    const cards = [];
    for (let i = 0; i < player.hand.length; i++) {
      cards.push(await getCardById(player.hand[i]));
    }
    return cards;
  }

  function playCard() {
    console.log("playing card");
  }

  return (
    <>
      <h1>Game {id}</h1>
      <h2>{game.name}</h2>
      <div className="container">
        <div className="row">{/* Place opponents board */}</div>
        <div className="row">{/* Place players board */}</div>
        <div className="row">
          {/* Place players hand */}
          <p>
            {player.hand}
            <div className="row">
              {cards.map((card) => (
                <Card
                  card={card}
                  actionButton={{ title: "Play", onClick: playCard }}
                  key={card.id}
                />
              ))}
            </div>
          </p>
        </div>
      </div>
    </>
  );
}

export default Game;
