const searchInput = document.getElementById('search');
const generateCardButton = document.getElementById('generate-card');
const generateMultipleCardsButton = document.getElementById('generate-multiple-cards');
const cardsContainer = document.getElementById('cards');

const fetchCard = async (character) => {
	try {
		const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${character}`);
		if (!response.ok) {
			throw new Error('Error');
		}
		const data = await response.json();
		return data[0];
	} catch (error) {
		console.error('Error al realizar la operación:', error);
	}
};

const generateCardForCharacter = async () => {
	const character = searchInput.value.trim();
	if (character === '') {
		alert('Por favor ingresa el nombre de un personaje.');
		return;
	}
	const card = await fetchCard(character);
	if (card) {
		const cardHTML = document.createElement('div');
		cardHTML.classList.add('card');
		const img = document.createElement('img');
		img.src = card.image;
		img.alt = card.character;
		const h2 = document.createElement('h2');
		h2.textContent = card.character;
		const p = document.createElement('p');
		p.textContent = card.quote;
		cardHTML.appendChild(img);
		cardHTML.appendChild(h2);
		cardHTML.appendChild(p);
		cardsContainer.innerHTML = '';
		cardsContainer.appendChild(cardHTML);
	}
};

const generateMultipleCards = async () => {
	const numberOfCards = parseInt(prompt('Cuantas cartas quieres generar?'), 10);
	if (isNaN(numberOfCards) || numberOfCards <= 0) {
		alert('Por favor ingresa un número válido.');
		return;
	}
	cardsContainer.innerHTML = ''; // Clear existing cards
	for (let i = 0; i < numberOfCards; i++) {
		try {
			const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
			if (!response.ok) {
				throw new Error('Error');
			}
			const data = await response.json();
			const card = data[0];
			const cardHTML = document.createElement('div');
			cardHTML.classList.add('card');
			const img = document.createElement('img');
			img.src = card.image;
			img.alt = card.character;
			const h2 = document.createElement('h2');
			h2.textContent = card.character;
			const p = document.createElement('p');
			p.textContent = card.quote;
			cardHTML.appendChild(img);
			cardHTML.appendChild(h2);
			cardHTML.appendChild(p);
			cardsContainer.appendChild(cardHTML);
		} catch (error) {
			console.error('Hubo un error en la operación:', error);
		}
	}
};

generateCardButton.addEventListener('click', generateCardForCharacter);
generateMultipleCardsButton.addEventListener('click', generateMultipleCards);
