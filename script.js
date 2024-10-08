console.log("SBA 316");

const userLanguage = navigator.language;
console.log(`User language: ${userLanguage}`);

const cardsContainer = document.querySelector(".cards");
const colors = ["blue", "orange", "red", "gray", "yellow", "green", "brown", "teal", "purple"];
const colorsPicklist = [...colors, ...colors];
const cardCount = colorsPicklist.length;

// Game State Start
let revealedCount = 0;
let selectedCard = null;
let awaitingEndOfMove = false;

function makeCard(color) {
	const element = document.createElement("div");

    element.style.borderRadius = "12px";
    
    element.style.padding = "10px";

	element.classList.add("card");

	element.setAttribute("data-color", color);

	element.setAttribute("data-revealed", "false");

    // element.addEventListener("mouseover", () => {
    //     element.classList.add("highlight");
    // })
    // element.addEventListener("mouseout", () => {
    //     element.classList.remove("highlight");
    // })

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == selectedCard
		) {
			return;
		}

		// Display this card color
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

            progressElement.innerText = "...keep going...";


			if (revealedCount === cardCount) {
				alert(`Fine. I won't do what I was gonna do... (Refresh to play again)`);
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			selectedCard.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			selectedCard = null;
		}, 200);
	});

	return element;
}

// Make the cards
for (let i = 0; i < cardCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const card = makeCard(color);

	colorsPicklist.splice(randomIndex, 1);
	cardsContainer.appendChild(card);
    
}

const titleElement = document.getElementById("title");
    titleElement.style.color = "gray";
    titleElement.style.textAlign = "center";
    titleElement.style.fontSize = "100px";

const instructionElement = document.querySelectorAll("p");
instructionElement.forEach((element) => {
    element.style.color = "gray";
    element.style.fontSize = "32px";
    element.style.textAlign = "center";
});
    

const wicked = document.getElementById("wicked");
wicked.addEventListener("mouseover", () => {
    wicked.style.color = "red";
})
wicked.addEventListener("mouseout", () => {
    wicked.style.color = "";
})

const progressElement = document.getElementById("progress");
    progressElement.style.color = "gray";
    progressElement.style.fontSize = "24px";
    progressElement.style.textAlign = "center";
    // progressElement.innerText = "...keep going..."

const greetingElement = document.getElementById("greeting");

const tellMe = document.getElementById("button");
    tellMe.style.fontSize = "30px";

const enterName = document.getElementById("input");
    enterName.style.fontSize = "30px";

const playerName = document.getElementById("playerName");
    playerName.style.textAlign = "center";
    playerName.style.fontSize = "40px";
    playerName.style.color = "gray";
    playerName.style.padding = "20px";

const playerNameInput = document.getElementById("input");
const outputDiv = document.getElementById("output");

    playerName.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        
    const playerID = playerNameInput.value;
        greetingElement.innerText = `Greetings, ${playerID}`;

        window.addEventListener("submit", () => {
            window.alert(`Don't Mess This Up, ${playerID}!`);

            playerNameForm.style.display = "none";
        });
    });
