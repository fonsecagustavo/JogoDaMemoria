const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";




startGame();

//função para iniciar o jogo
function startGame() {
   initializeCards(game.createCardsFromTechs());
}

//função inicializar a criação das div dos cards
function initializeCards() {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {

        let cardElement = document.createElement('div'); // cria uma div 
        cardElement.id = card.id; //adiciona um id
        cardElement.classList.add(CARD); //adiciona a class 'card'
        cardElement.dataset.icon = card.icon; // adiciona data-icon o icon que seria o nome da tecnologia

        createCardContent(card,cardElement) //cria as divs de front e back

        cardElement.addEventListener('click', flipCard)//adiciona o evento de click

        gameBoard.appendChild(cardElement);//adiciona a div card ao gameBorad
    })
}

//função chama a função para criar o front e back 
function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

//função que cria as divs de front e de back
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else {
        cardElementFace.innerHTML = '&lt/&gt';
    }

    element.appendChild(cardElementFace);

}

//função de click, ela adiciona e retira a classe flip e verifica 
function flipCard() {
   if(game.setCard(this.id)) {
    this.classList.add("flip")
    
    
    if(game.secondCard){
        if(game.checkMath()){
          game.clearCards();  
          if(game.checkGameOver()){
              let gameOverLayer = document.getElementById("gameOver");
              gameOverLayer.style.display = "flex";
          }
        }else {

            setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
    
                firstCardView.classList.remove("flip");
                secondCardView.classList.remove("flip");

                game.unflipCards();  
            },1000)
         
        }
    }
   }
}

//reinicia o jogo 
function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";

}