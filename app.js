/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, ActivePlayers, Gamestatus, lastDice;
Gamestatus = true;
init();
function init(){
	scores = [0,0];
	roundScore = 0;
	ActivePlayers = 0;

	hideDice();

	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	Gamestatus = true;
}

function hideDice (){
	document.querySelector('#dice-1').style.display = 'none';
	document.querySelector('#dice-2').style.display = 'none';
}



function nextPlayer (){

		ActivePlayers === 0 ? ActivePlayers = 1 : ActivePlayers = 0 ;
		roundScore = 0;
		document.querySelector('#current-0').textContent = '0';
		document.querySelector('#current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		hideDice();
	
}

function displayNone (){
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', ()=>{
	if(Gamestatus){
	// 1. Random number
	const dice1 = Math.floor(Math.random() * 6) + 1;
	const dice2 = Math.floor(Math.random() * 6) + 1;

	//2. Display the result
	document.querySelector('#dice-1').style.display = 'block';
	document.querySelector('#dice-2').style.display = 'block';
	document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
	document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
	//3.Update the round score IF the rolled number was NOT a 1
	if (dice1 !== 1 && dice2 !== 1){
		//Add score
		roundScore += dice1 + dice2;
		document.querySelector('#current-' + ActivePlayers).textContent = roundScore;
	}else {
		//Next Player
		nextPlayer();
	}
	/*
	if (dice === 6 && lastDice === 6){
		// Players Lose score
		scores[ActivePlayers] = 0;
		document.querySelector('#score-' + ActivePlayers).textContent = '0';
		nextPlayer();
	}else if (dice !== 1){
		//Add score
		roundScore += dice;
		document.querySelector('#current-' + ActivePlayers).textContent = roundScore;
	}else {
		//Next Player
		nextPlayer();
	}
	lastDice = dice;
	*/
}
});

document.querySelector('.btn-hold').addEventListener('click',()=>{
	if(Gamestatus){
	// Add CURRENT score to GLOBAL score
	scores[ActivePlayers] += roundScore;

	// Update the UI
	document.querySelector('#score-' + ActivePlayers).textContent = scores[ActivePlayers];

	let input = document.querySelector('.final-score').value;
	let winningScore;
	// Undefined, 0 , null or "" are COERCED to false
	// Anything else is COERCED to true
	if(input){
		 winningScore = input;
	}else {
		winningScore = 10;
	}

	// Check if player won the game
	if (scores[ActivePlayers] >= winningScore){
		document.querySelector('#name-'+ ActivePlayers).textContent = 'Winner!';
		hideDice();
		document.querySelector('.player-' + ActivePlayers + '-panel').classList.add('winner');
		document.querySelector('.player-' + ActivePlayers + '-panel').classList.remove('active');
		Gamestatus = false;
	}else{
	// Next Player
	nextPlayer();
	}
}
});

document.querySelector('.btn-new').addEventListener('click', init);


// const x = document.querySelector('#score-0').textContent;