/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

let iniciarJogo = false;
let cardsVirados = []; //
let numeroJogadas= 0;
let seg = 0;
let cardsEncontrados = 0;
let cronometro;
let timer = document.querySelector('#timer');


$(function() {

    $('.card').click(game.selecionarCard);
    $('.restart').click(game.reset)
     game.iniciarCronometro();

});




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



class Game{

    constructor(){

    }

    
    verificaCardsVirados(cardsVirados){

      //  let cardsVirados = [];
        let card1 =  game.obterImagemDoCard(cardsVirados[0]);
        let card2 =  game.obterImagemDoCard(cardsVirados[1])

        if ( card1 === card2){
            cardsEncontrados++;
            cardsVirados.forEach(function(card){
                card.animateCss('tada', function(){
                    card.toggleClass("open show match");
                });
            });
        } else {
            cardsVirados.forEach(function(card){
                card.animateCss('shake', function(){
                    card.toggleClass("open show");
                });
            });
        }

        if (cardsEncontrados === 8){

            game.finalizarJogo()
        }
    }
    atualizarNumeroDeJogadas(){
        numeroJogadas++;
        let numJogadas = $('.moves');
        numJogadas.text(numeroJogadas);
        if (numeroJogadas === 10 || numeroJogadas === 20 || numeroJogadas === 30){
            game.removeEstrela();
        }
    }

    removeEstrela(){
        let stars = $(".fa-star");
        $(stars[stars.length-1]).toggleClass("fa-star fa-star-o"); 
        
    }

    selecionarCard(){

        let card= $(this);

        if (card.hasClass('open show') || card.hasClass("match")){
            return;
        }
        if (!iniciarJogo) {
            iniciarJogo = true;
            cronometro = setTimeout(this.iniciarCronometro, 1000);
        }

        if (cardsVirados.length < 2){
            $(this).toggleClass("open show");
            cardsVirados.push($(this));
        }

        if (cardsVirados.length === 2){
            game.verificaCardsVirados(cardsVirados)
            cardsVirados = [];
        }

        game.atualizarNumeroDeJogadas();

    }
    
    obterImagemDoCard(card){
      return card[0].firstChild.nextSibling.classList[1];
    }

    iniciarCronometro() {
    
        let currentTimer = setInterval(() => {
            timer.textContent= `${seg}`
            seg++;
        }, 1000);
    }

    reset(){
        location.reload();
    }

    finalizarJogo(){
        let stars = $(".fa-star");
        Swal(`Parabéns`,
             `Você terminou o jogo em  ${seg} segundos e com  ${stars.length}/3 estrelas.`,
             'success');
             setTimeout(game.reset, 2000)
    }

}

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

let game = new Game();