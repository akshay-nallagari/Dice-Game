'use strict';

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const curr0 = document.querySelector("#current--0");
const curr1 = document.querySelector("#current--1");
const dice = document.querySelector('.dice');

let currScore, activePlayer, playing, scores;

const defaultValues = function(){
    scores = [0,0];
    activePlayer = 0;
    playing = true;
    currScore = 0;

    score0.textContent = 0;
    score1.textContent = 0;
    curr0.textContent = 0;
    curr1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

};
defaultValues();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};


document.querySelector(".btn--roll").addEventListener(
    "click", function () {
        if (playing)
        {
            const diceValue = Math.trunc(Math.random() * 6) + 1;
            dice.classList.remove("hidden");
            dice.src = `dice-${diceValue}.png`;
            if (diceValue !== 1)
            {
                currScore += diceValue;
                document.getElementById(`current--${activePlayer}`).textContent = currScore;
            }
            else {
                switchPlayer();
            }
        }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing)
  {
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100)
    {
      playing = false;
      dice.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } 
    else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', defaultValues);