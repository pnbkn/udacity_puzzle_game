document.addEventListener("DOMContentLoaded", function(event) {

    function init() {

        var $ = function(cssClass) {
            return document.getElementsByClassName(cssClass);
        };

        // Declare and instantiate variables for classes
        var card = $('card');
        var cardFlipped = $('card-flipped');
        var moves = $('moves');
        var restart = $('restart');
        var star = $('fa-star');
        var repeat = $('fa-repeat');
        var gameTimer = $('gameTimer');
        var cardOne = ""; // 1st card turned goes here
        var cardTwo = ""; //
        var moveCount = 0;
        var moveCounter = 0;
        var numMoves = 0;
        var numClicks = 0; // Whether it is card 1 or card 2
        var numMatches = 0; // Counts the number of card matches 
        var starRating = 3; // Counts number of stars left
        var seconds = 0; // Start timer at 0 seconds
        var minutes = 0; // Start timer at zero minutees
        var stopWatch; //
        var checkTimer = false;
        var flipped1 = "";
        var flipped2 = "";
        var icon1 = "";
        var icon2 = "";
        moves[0].textContent = moveCounter;
        gameTimer[0].textContent = "0" + minutes + ":" + "0" + seconds;
        // Click to restart the game
        restart[0].addEventListener('click', gameOver, false);

        // set up Event Listeners for cards    
        for (var i = 0; i < card.length; i++) {
            card[i].addEventListener('click', turnCard, false);
            //console.log(card[1]);
        }

        // Shuffle Cards - Stack Overflow
        //https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
        var ul = document.getElementsByTagName('ul')[1];
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }

        //called when game has finished.   
        function gameOver() {
            
            if (this.className != "restart") {
                // Pop up when game is over - https://sweetalert2.github.io/
                swal({
                        type: 'success',
                        showCancelButton: true,
                        cancelButtonText: 'OK',
                        confirmButtonClass: "primary",
                        confirmButtonText: "Play Again",
                        text: 'Your Star Rating is: ' + starRating + ' | Number of Moves: ' + moveCounter + " | Time: " + gameTimer[0].textContent,
                    },
                    restartGame()
                     
                );

            }
            else {
                restartGame();
            }

            for (var i = 0; i < card.length; i++) {
                card[i].removeEventListener('click', turnCard, false);

            }


        }
        //User clicks refresh icon to reset the game to play again  
        function restartGame() {
            // Stop Timer
           clearTimeout(stopWatch);
            // Reset Star icons
            for (var s = 0; s < star.length; s++) {
                star[s].style.opacity = 1;
            }

            for (var i = 0; i < card.length; i++) {
                card[i].classList.remove('card-flipped');
                card[i].getElementsByTagName('i')[0].style.opacity = 0;
            }
            //Reset number of moves text
            setTimeout(function() {
                init();

            }, 100);
            
        }

        // Turn Cards     
        function turnCard() {
            //Start Timer
            if (checkTimer === false) {
                checkTimer = true;
                gameDuration();
            }

            starCount(); //Checks the star count on every card click
            numClicks++;
            var element = this.getElementsByTagName('i')[0].className;
            var liSelected = this.getElementsByTagName('li');
            var iconSelected = this.getElementsByTagName('i');
            // Flip Card
            this.classList.add('card-flipped');
            var flipCardBack = this;

            // Get first card selected        
            if (numClicks === 1) {
                cardOne = element;
                flipped1 = this;
                icon1 = iconSelected[0];
                icon1.style.opacity = 1;
                flipped1.removeEventListener('click', turnCard, false);
                console.log(flipped1);

            }

            // Get second card selected 
            else if (numClicks === 2) {
                cardTwo = element;
                flipped2 = this;
                icon2 = iconSelected[0];
                icon2.style.opacity = 1;
                moveCounter++;
                moves[0].textContent = moveCounter;
                console.log(moveCounter);
                console.log(flipped2);
                // If cards match            
                if (cardOne === cardTwo) {
                    numClicks = 0;
                    cardOne = "";
                    cardTwo = "";
                    numMatches++;
                    console.log(numMatches);
                    flipped2.removeEventListener('click', turnCard, false);
                    if (numMatches === 8) {
                        gameOver();
                    }
                }

                // If cards don't match           
                else if (cardOne !== cardTwo) {
                    numClicks = 0;
                    flipped1.addEventListener('click', turnCard, false);
                    flipped2.addEventListener('click', turnCard, false);
                    // Flips wrong card back over to default
                    setTimeout(function() {
                        flipped1.classList.remove('card-flipped');
                        flipped2.classList.remove('card-flipped');
                        icon1.style.opacity = 0;
                        icon2.style.opacity = 0;

                    }, 1200);

                }

            }

        }

        // Manages the star count
        function starCount() {
            if (moveCounter === 10) {
                starRating = 2;
                star[2].style.opacity = 0;
            } else if (moveCounter === 20) {
                starRating = 1;
                star[1].style.opacity = 0;
            }
        }

        // Code for timer - JS Fiddle - https://jsfiddle.net/Daniel_Hug/pvk6p/ 
        function getTime() {
            seconds++;
            //Reset seconds and minutes to zero once 60 is reached
            if (seconds >= 60) {
                seconds = 0;
                minutes++;

                if (minutes >= 60) {
                    minutes = 0;

                }
            }
            // If minutes or seconds are under 10, add a zero
            if (minutes < 10) {
                if (seconds < 10) {
                    gameTimer[0].textContent = "0" + minutes + ":" + "0" + seconds;
                } else {
                    gameTimer[0].textContent = "0" + minutes + ":" + seconds;
                }

            } else if (minutes >= 10) {

                if (seconds < 10) {
                    gameTimer[0].textContent = minutes + ":" + "0" + seconds;
                } else {
                    gameTimer[0].textContent = minutes + ":" + seconds;
                }
            }


            gameDuration();
        }

        function gameDuration() {

            stopWatch = setTimeout(getTime, 1000);
            console.log(seconds);
        }


    }

    init();
});