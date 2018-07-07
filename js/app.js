/*
	Timer courtesy of https://github.com/ryanwaite28/script-store/blob/master/js/stop-watch.js

  Usage
  ---
  let watch = new StopWatch();
                                   // starts the watch timer
  watch.startTimer(function(){
    // you can even run a callback
    // for each interval, like updating the DOM!
  });
  watch.stopTimer();              // stops the watch timer
  watch.resetTimer();             // resets the watch timer
  watch.getTimeString();          // returns the time as a string like so ---> "00:01:17"
*/

const StopWatch = function StopWatch() {
  const self = this;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let timer;
  let on = false;

  self.startTimer = function(callback) {
    if(on === true) { return; }
    on = true;
    timer = setInterval(function(){
      seconds++;
      if(seconds === 60) {
        seconds = 0;
        minutes++;
        if(minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      if(callback && callback.constructor === Function) {
        callback();
      }
    }, 1000);
    console.log('timer started');
  }

  self.stopTimer = function() {
    clearInterval(timer);
    on = false;
    console.log('timer ended: ', self.getTimeString());
  }

  self.resetTimer = function() {
    self.stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  self.getTimeString = function() {
    let hour = hours > 9 ? String(hours) : '0' + String(hours);
    let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let timeString = hour + ':' + minute + ':' + second;
    return timeString;
  }

  self.getHours = function() {
    return hours;
  }

  self.getMinutes = function() {
    return minutes;
  }

  self.getSeconds = function() {
    return seconds;
  }
}


let watch = new StopWatch();

// the ul element with class deck
let deck = document.querySelector('.deck');
// all the cards
let allCards = deck.querySelectorAll('li.card');

let resetButton = document.getElementById('resetButton');
let counterText = document.getElementById('counter-text');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// listening to each card and upon click, add classes open and show
allCards.forEach(function(card) {
	card.addEventListener('click', function() {
		card.classList.add('open', 'show');
	});
});



// reset button to initialize game
function gameInitailize() {
	// turn cards face down
	allCards.forEach(function(card) {
		card.classList.remove('open', 'show');
	});
}

// upon click of reset button, call gameInitialize
resetButton.addEventListener('click', gameInitailize);

// TODO: display counter text in #count-text


