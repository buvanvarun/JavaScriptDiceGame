var scores, roundScore, activePlayer, dice1, dice2, gamePlaying, previousRoll1, previousRoll2;
domSet();
console.log("git");

function domSet() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRoll = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        dice1 = Math.ceil(Math.random() * 6);
        dice2 = Math.ceil(Math.random() * 6);
        document.querySelector('#dice-1').style.display = 'block'
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice-2').style.display = 'block'
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
        if ((dice1 == 6 && previousRoll1 == 6) || (dice2 == 6 && previousRoll2 == 6)) {
            document.querySelector('.score-' + activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            roundScore = document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activePlayer = activePlayer == 1 ? 0 : 1;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            displayDOM.style.display = 'none';
            previousRoll1 = 0;
            previousRoll2 = 0;
        } else if (dice1 == 1 || dice2 == 1) {
            roundScore = document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activePlayer = activePlayer == 1 ? 0 : 1;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            previousRoll1 = 0;
            previousRoll2 = 0;

        } else {
            previousRoll1 = dice1;
            previousRoll2 = dice2;
            roundScore = document.querySelector('#current-' + activePlayer).textContent = roundScore + dice1 + dice2;
        }

    }
});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;
        previousRoll1 = 0;
        previousRoll2 = 0;
        var input = document.querySelector('.final-score').value;
        var final;
        if (input)
            final = input;
        else
            final = 100;
        if (scores[activePlayer] >= final) {
            console.log('you win!');
            document.querySelector('#name-' + activePlayer).textContent = 'YOU WIN!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activePlayer = activePlayer == 1 ? 0 : 1;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            roundScore = 0;
        }
    }


});

document.querySelector('.btn-new').addEventListener('click', domSet);