import React, { useEffect, useState } from "react";
import "../index.css";
import CaptureSvg from "../assets/Capture.svg"; // Import the SVG file
import "bootstrap/dist/css/bootstrap.min.css";
import { createCard, getCards } from "../api/api";
import Card from "../components/Card";

function CardMaker() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      // Load all cards
      const cards = await getCards();
      setCards(cards);
    }
    loadCards();
  }, []);

  function createCardHandle() {
    console.log("creating card");
    let name = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let cost = document.getElementById("cost").value;
    let health = document.getElementById("health").value;
    let attack = document.getElementById("attack").value;
    const newCard = {
      id: cards.length + 1,
      name: name,
      description: description,
      cost: cost,
      health: health,
      attack: attack,
    };
    console.log(newCard);
    createCard(newCard);
    setCards([...cards, newCard]);
  }

  return (
    <>
      <h1>Card Maker</h1>
      <hr></hr>
      <div className="row">
        <div className="col-sm-3" style={{ marginLeft: 150 }}></div>
        <div className="col-sm-4">
          <div className="card" style={{ width: "18rem" }}>
            <img src={CaptureSvg} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">
                <input
                  type="number"
                  className="form-control"
                  id="cost"
                  placeholder="cost"
                ></input>
                <label htmlFor="title">Name:</label>
                <input type="text" className="form-control" id="title"></input>
              </h5>
              <p className="card-text">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                ></textarea>
              </p>
              <p>
                {" "}
                Health:{" "}
                <input
                  type="number"
                  className="form-control"
                  id="health"
                ></input>
                Attack:{" "}
                <input
                  type="number"
                  className="form-control"
                  id="attack"
                ></input>
              </p>
              <button className="btn btn-primary" onClick={createCardHandle}>
                Create card
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Existing cards</h2>
      <hr></hr>
      <div className="row">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

export default CardMaker;
