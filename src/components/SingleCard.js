import React from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front " src={card.src} alt="card front" />
        <img
          className="back "
          src="/img/cover.png"
          onClick={handleClick}
          alt="card front"
        />
      </div>
    </div>
  );
}

//  <div className={flipped ? "flipped" : ""}>    {/** this means that if its true, we apply the flipped class else nothing */}
// <img className="front " src={card.src} alt="card front" /> {/** the card.src is in the app.js the 6cards */}
