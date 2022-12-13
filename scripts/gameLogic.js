const shuffleDeck = (deck = []) => {
  // Create a copy of the array so we don't modify the original
  let deckCopy = deck.slice();
  // Loop through the array and randomly swap each element with another element in the array
  for (let i = 0; i < deckCopy.length; i++) {
    let randomIndex = Math.floor(Math.random() * deckCopy.length);
    let temp = deckCopy[i];
    deckCopy[i] = deckCopy[randomIndex];
    deckCopy[randomIndex] = temp;
  }
  // Return the randomized array
  return deckCopy;
};

const dealStartingHands = (deck) => {
  const firstCard = deck.pop();
  const secondCard = deck.pop();
  return [firstCard, secondCard];
};

const createCardElements = (cards, playerHTMLContainer) => {
  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardImg = document.createElement("img");
      cardImg.src = `./images/${card.rank}_of_${card.suit}.png`;
      if (playerHTMLContainer.id === "dealer-hand") {
        cardImg.classList = "back";
      }
      playerHTMLContainer.append(cardImg);
    });
  }
};

const createPointElements = (score, playerHTMLElement) => {
  playerHTMLElement.innerText = score;
};

const calculateScore = (hand) => {
  let score = 0;
  for (const card of hand) {
    switch (card.rank) {
      case "queen":
        score += 10;
        break;
      case "king":
        score += 10;
        break;
      case "jack":
        score += 10;
        break;
      case "ace":
        if (score > 21) score += 1;
        if (score <= 10) score += 11;
        break;
      default:
        score += card.rank;
        break;
    }
  }
  return score;
};

export const gameLogic = (playerScore, dealerScore) => {
  if (playerScore > 21) return false;
  if (dealerScore >= 21) return false;
  if (dealerScore >= playerScore && dealerScore < 21) return false;
  return true;
};

export const startingLogic = (deck) => {
  const dealerHand = document.getElementById("dealer-hand");
  const playerHand = document.getElementById("player-hand");
  const dealerSpan = document.getElementById("dealer-points");
  const playerSpan = document.getElementById("player-points");
  const gameDeck = shuffleDeck(deck);
  const playersCards = dealStartingHands(gameDeck);
  const dealersCards = dealStartingHands(gameDeck);
  let playerScore = calculateScore(playersCards);
  let dealerScore = calculateScore(dealersCards);

  createCardElements(playersCards, playerHand);
  createCardElements(dealersCards, dealerHand);
  createPointElements(dealerScore, dealerSpan);
  createPointElements(playerScore, playerSpan);
};
