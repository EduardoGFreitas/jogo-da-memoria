let card = $(".card");
let cards = [...card];
let iniciarJogo = false;
let cardsVirados = []; //
let numeroJogadas= 0;
let seg = 0;
let cardsEncontrados = 0;
let cronometro;
let currentTimer;
let timer = document.querySelector('#timer');


$(function() {

    $('.card').click(game.selecionarCard);
    $('.restart').click(game.reset)
    game.initGame();

});


class Game{

    initGame(){
        game.populateCards();
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
        if (numeroJogadas === 12 || numeroJogadas === 18 ){
            game.removeEstrela();
        }
    }
   

    populateCards(){
        cards = game.shuffle(cards);
        for(var i=0; i<cards.length; i++) {
            document.querySelector(".deck").innerHTML = "";
            [].forEach.call(cards, function(item) {
                document.querySelector(".deck").appendChild(item);
            });
            //cards[i].classList.remove("show", "open", "match", "disabled");
        }
    }

    shuffle(array) {
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
            cronometro = setTimeout(game.iniciarCronometro(), 500);
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
        currentTimer = setInterval(() => {
            timer.textContent= `${seg}`
            seg++;
        }, 1000);
    }

    reset(){
        location.reload(currentTimer);
    }

    finalizarJogo(){
        let stars = $(".fa-star");
        clearInterval(currentTimer)
        swal({
            title: 'Parabéns',
            text: `Você terminou o jogo em  ${seg} segundos e com ${stars.length} de 3 estrelas.
            Deseja jogar novamente? `,
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#2A4B66',
            cancelButtonColor: '#FF231C',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
          }).then((result) => {
            if (result.value) {
                setTimeout(game.reset, 500)
            }
          })
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