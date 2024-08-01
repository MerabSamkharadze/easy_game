const gameBoard = document.getElementById("gameBoard");

const images = [
  "./images/image1.svg",
  "./images/image2.svg",
  "./images/image3.svg",
  "./images/image4.svg",
  "./images/image5.svg",
  "./images/image6.svg",
  "./images/image7.svg",
  "./images/image8.svg",
];

const cards = [...images, ...images];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(cards);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
  cards.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${image}" alt="image">`;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.innerHTML === secondCard.innerHTML;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
