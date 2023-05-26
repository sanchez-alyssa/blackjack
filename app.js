let messageEl = document.getElementById('message-el')
let cardsEl = document.getElementById('cards-el')
let sumEl = document.getElementById('sum-el')
let playerEL = document.getElementById('player-el')
let newGameBtn = document.getElementById('new-game')
let startGameBtn = document.getElementById('start-game')
let newCardBtn = document.getElementById('new-card')

let sum = 0
let cards = []
let message = ''
let player = {
	name: 'Player',
	chips: 150,
}
let chips = player.chips
playerEL.textContent = `${player.name}: $${player.chips}`

//get randomNumber
function getRandomNumber() {
	let randomNumber = Math.floor(Math.random() * 13) + 1
	// 10 and above = 10
	//  1 = 11
	if (randomNumber > 10) {
		return 10
	} else if (randomNumber === 1) {
		return 11
	} else {
		return randomNumber
	}
}

function startGame() {
	let firstCard = getRandomNumber()
	let secondCard = getRandomNumber()
	cards = [firstCard, secondCard]
	sum = firstCard + secondCard
	renderGame()
}

function renderGame() {
	// display cards
	cardsEl.textContent = 'Cards: '
	for (let i = 0; i < cards.length; i++) {
		cardsEl.textContent += cards[i] + ' '
	}
	// display sum
	sumEl.textContent = 'Sum: ' + sum
	if (sum < 21) {
		message = 'Do you want a new card?'
		messageEl.style.color = '#ffafcc'
	} else if (sum === 21) {
		message = 'You got BLACKJACK 🥳'
		messageEl.style.color = '#ff9e00'
		messageEl.style.borderBottom = 'none'
		// add 300 chips
		chips += 300
		player.chips = chips
		playerEL.textContent = `${player.name}: $${player.chips}`
	} else if (sum > 21) {
		message = 'You are out of the game!'
		messageEl.style.color = '#660708'
		messageEl.style.borderBottom = 'none'
		// decrement chips
		chips -= 50
		player.chips = chips // update the player's chips value
		playerEL.textContent = `${player.name}: $${player.chips}`
		if (player.chips === 0) {
			message = 'New game! You have no chips'
			newGameBtn.style.display = 'block' // show the new game button
			startGameBtn.style.display = 'none'
			newCardBtn.style.display = 'none'
		}
	}
	messageEl.textContent = message
}

function newCard() {
	if (sum < 21 && sum != 21) {
		let newCard = getRandomNumber()
		cards.push(newCard)
		sum += newCard
		renderGame()
	}
}

function newGame() {
	location.reload()
	cards = []
	cardsEl.textContent = 'Cards: '
	sumEl.textContent = 'Sum: '
}
