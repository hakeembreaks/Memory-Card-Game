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

// EXPLANATION
// This page defines a React functional component named SingleCard,
// which takes in four props as an object: card, handleChoice, flipped, and disabled.
// Inside the component, there is a constant function handleClick that is defined to
// handle the click events on the card. This function calls the handleChoice function,
// passing in the card object as an argument, if the disabled prop is not true.
// src={card.src} sets the src attribute of the <img> element to the value of the card.src prop.
// This assumes that the card prop is an object with a src property that contains
// the URL of the image to be displayed.
