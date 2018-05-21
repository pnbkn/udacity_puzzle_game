document.addEventListener("DOMContentLoaded", function(event) {

    function init() {
       
     var $ = function(cssClass) { return document.getElementsByClassName(cssClass);};

    // Declare and instantiate variables for classes
    var deck = $('deck');
    var card = $('card');
    var cardFlipped = $('card-flipped');
    var moves = $('moves');
    var restart = $('restart');
    var fa = $('fa');
    var star = $('fa-star');
    var repeat = $('fa-repeat');
    var diamond = $('fa-diamond');
    var plane = $('fa-paper-plane-o');
    var anchor = $('fa-anchor');
    var bolt = $('fa-bolt');
    var cube = $('fa-cube');
    var leaf = $('fa-leaf');
    var bicycle = $('fa-bicycle');
    var diamond = $('fa-diamond');
    var cardOne = "";
    var cardTwo = "";
    var moveCount = 0;
    var cardArray = [];
    var wrongCard = this.className += " card-flipped";
        
    // Click to restart the game
    restart[0].addEventListener('click', restartGame, false);
        
    // set up Event Listeners for cards    
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener('click', turnCard, false);
    }
    
    function gameOver() {
            for (var i = 0; i < card.length; i++) {
            card[i].removeEventListener('click', turnCard, false);
       
            }
    }
    
    function restartGame() {
        // Reset Star icons
        for(var s = 0; s < star.length; s++) {
            star[s].style.opacity = 1;
        }
        // Reset game elements
        for (var i = 0; i < card.length; i++) {
        card[i].classList.remove('card-flipped');
        card[i].getElementsByTagName('i')[0].style.opacity = 0;
        }

        moves[0].textContent = 3 + " Moves";
        init();
    }
   // Turn Cards 
        
    function turnCard() {
    
        var element = this.getElementsByTagName('i')[0].className;
        var liSelected = this.getElementsByTagName('li');
        var iconSelected = this.getElementsByTagName('i');
        
        //this.className += " card-flipped";
        this.classList.add('card-flipped');
       //liSelected[0].classList.toggle("card-flipped");
        var flipCardBack = this;
        console.log(element);
        
        if (moveCount === 0) {
            cardOne = element;
            iconSelected[0].style.opacity = 1;
            moveCount++;

        }
            
        else if (moveCount === 1) {
            cardTwo = element;
            iconSelected[0].style.opacity = 1;
            moveCount++;

                if(cardOne === cardTwo) {
                    console.log("You Win");
                   
                    moves[0].textContent = "Game Over. You Win!";
                        for(var s = 0; s < star.length; s++) {
                        star[s].style.opacity = 0;
                        }
                    gameOver();
                        
             }
                else {
                    console.log("Wrong Selection");
                    
                    wrongCard;
                    star[2].style.opacity = 0;
                    moves[0].textContent = 2 + " Moves";
                    
                  
                    setTimeout(function(){
                        flipCardBack.classList.remove('card-flipped');
                        iconSelected[0].style.opacity = 0; }, 2000);
                        
                    }
    
        }
        
        else if (moveCount === 2) {
            cardTwo = element;
            iconSelected[0].style.opacity = 1;
            moveCount++;

                if(cardOne === cardTwo) {
       
                    moves[0].textContent = "Game Over. You Win!";
                        for(var s = 0; s < star.length; s++) {
                        star[s].style.opacity = 0;
                        }
                    gameOver();
                }
                else {
                     console.log("Wrong Selection");
                    star[1].style.opacity = 0;
                    moves[0].textContent = 1 + " Move";
                    
                    setTimeout(function(){
                        flipCardBack.classList.remove('card-flipped');
                        iconSelected[0].style.opacity = 0; }, 2000);
                }
        }
        else if (moveCount === 3) {
            cardTwo = element;
            iconSelected[0].style.opacity = 1;
            console.log(moveCount);
            console.log(cardTwo);
                if(cardOne === cardTwo) {
               
                    star[0].style.opacity = 0;
                    moves[0].textContent = "Game Over. You Win!";
                    gameOver();
                }
                else {
                   
                    star[0].style.opacity = 0;
                    moves[0].textContent = "You Lose. Try Again!";
                    gameOver();
                }
         }
        
            

    } 
    //console.log(card.length);
           
}
    
init(); 
  });