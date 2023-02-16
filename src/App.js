import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// This line here, we create an array of cards and assigne it to cardImages and
// all cards are set to matched: false to indicate that they have not been matched yet.

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

// This line here we Define a function called App that uses the useState hook to set up the
// following state variables:
// cards, turns, choiceOne, choiceTwo, and disabled

function App() {
  const [cards, setCards] = useState([]); // this is the state we store our card in
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  // Here we gonna create a function which will do 3 things for us.
  // First of all, its gonna dupplicate each card once because we need two of each card for the game
  // so that a user can match them together.... so we'd have an array of 12 cards instead of 6..

  // Secondly, its gonna randomize the order of the card in the card using the sort method

  // And then finally, its gonna apply a random ID TO Each of the 12 cards and we'D USE THAT ID as a key for
  // react when we output them later in some kind of list or Grid..

  // The ... is a spread syntax that takes each of the images element and place it inside the array
  // the ...cardImages appearing twice means that the card images will go from 6 to 12.. i.e 2 lots
  // of each of them.. each will appear twice

  // the sort will fire a function for each pair of item in the shuffledCards array.

  // and inside that function, if we return a number less than zero, the order of those items stays the same.
  // number greater than zero, then the order is mixed up, but what we need is a random number. so we use
  // math.random

  // first summary of what we did is, we call the shuffle cards, it'll generate the shuffle cards,
  // and then it'll update our card states to be those shuffled cards (setCards(shuffledCards))

  // ******************************//

  //shuffle cards
  // Creating a function called shuffleCards, which shuffles the cardImages array
  // and sets the state variables to their initial values.

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // we concatenate the card images with itself using the spread operator (...). The resulting array will contain two copies of each card in the original cardImages array. This doubling of the cardImages array is done to ensure that there are two cards with the same image on the game board, which is a requirement for the memory matching game. By doubling the array in this way, the game can ensure that there is a matching card for every card on the board.
      .sort(() => Math.random() - 0.5) // //  this line of code ensures that the cards are shuffled in a random order
      .map((card) => ({ ...card, id: Math.random() })); // creates new unique ids for each card. So, the map() method creates a new object for each card in the cardImages array

    setChoiceOne(null); // // reset the values of choiceOne and choiceTwo to null after the previous round is finished, so that the user can start a new round with two new choices.
    setChoiceTwo(null);
    setCards(shuffledCards); // we update the card state here using setCards and we pass in shuffledCards //  // sets the cards state to the new shuffled cards.
    setTurns(0); // resets the number of turns to zero for the start of a new round.
  };

  //handle choice
  // The first const line, we take in an argument as the card the user has chosen
  // ***************************/
  //handle choice
  // the handleChoice function in this code is responsible for handling a player's choice of cards by
  // setting choiceOne and choiceTwo state variables. When a card is clicked,
  // the handleChoice function is called with the selected card as its argument.

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card); // choice one true, left will run and vice versa
  };
  // compare two selected cards
  // EXPLANATION FROM LINE 66  if (choiceOne.src === choiceTwo.src) {
  // SO if choiceone.src matches choicetwo.src, then we have a match,
  // so we updating the card state, (next line), and take in the previous card state to update the state.
  // because we gonna use that inside it...
  // so we returning a new array.( from the next line down)
  // so we take in the prevCards and we use the map method (and the map method remember returns a new array
  // based on the prevCards array)
  // so wat we did inside the map method is fire a function for each card, and each time we fire a function,
  // we return the object that we wanna place inside the new array//
  // so if the cardonesrc matches the choice one src, i.e what the user selected.
  // then we return a new object where we spread the card property, the src, and the matched property
  // but then we change the match property to be true. and that will be new card object property..
  // if they dont, we return the card unchecked

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // This is used to disable clicking on cards until the turn is complete.
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }; // This will return the new object instead of the original card object that we returned in the array in line 66. return prevCards.map((card) => {
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(
          () => resetTurn(),
          1000
        ); /** this is the delay between the flipped cards. after 1 seconds, return setchoiceone and two */
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  // Inside use Effect, we pass in a function, and we also pass in a dependency array as a second argument.
  // Remember, the useEffect is gonna fire when the component first mounts once automatically, and then
  // it would fire the function again whenever a dependency changes

  useEffect(() => {
    shuffleCards();
  }, []);

  //  When  the New Game button is clicked, it triggers the "shuffleCards" function to shuffle the cards.
  //

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
