import React from "react";
import "../index.css";
import CaptureSvg from "../assets/Capture.svg"; // Import the SVG file
import "bootstrap/dist/css/bootstrap.min.css";

function Card({ card, actionButton }) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={CaptureSvg} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">
            {card.name} ({card.cost})
          </h5>
          <p className="card-text">{card.description}</p>
          <p className="card-text">
            Health: {card.health} : Attack: {card.attack}
          </p>
          <button className="btn btn-primary" onClick={actionButton.onClick}>
            {actionButton.title}
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
