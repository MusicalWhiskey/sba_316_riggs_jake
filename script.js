console.log("SBA 316");

const cardsContainer = document.querySelector(".cards");
const colors = ["blue", "orange", "red", "white", "yellow", "green", "brown", "teal", "purple"];
const colorsPicklist = [...colors, ...colors];
const cardCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let selectedCard = null;
let awaitingEndOfMove = false;

function makeCard(color) {
	const element = document.createElement("div");

	element.classList.add("card");

	element.setAttribute("data-color", color);

	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == selectedCard
		) {
			return;
		}

		// Display this color card
		element.style.backgroundColor = color;

		if (!selectedCard) {
			selectedCard = element;

			return;
		}

		const colorToMatch = selectedCard.getAttribute("data-color");

		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			selectedCard.setAttribute("data-revealed", "true");

			selectedCard = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === cardCount) {
				alert("You win! Refresh to start again.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			selectedCard.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			selectedCard = null;
		}, 1000);
	});

	return element;
}

// Build up cards
for (let i = 0; i < cardCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const card = makeCard(color);

	colorsPicklist.splice(randomIndex, 1);
	cardsContainer.appendChild(card);
}

const titleElement = document.getElementById("title").style.color = "white";
titleElement.style.textAlign = "center";