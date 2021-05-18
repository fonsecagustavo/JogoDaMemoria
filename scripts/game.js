let game = {
    
    //Se esta sendo verificada as duas cartas
    lockMode: false,
    
    //primeira carta 
    firstCard:null,
    
    //segunda carta
    secondCard: null,
    
    //as tecnologias
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    
    //inicializa o cards para ela ser uma variavel global
    cards: null,
    
    //grava a carta clicada 
    setCard: function(id){
       let card = this.cards.filter(card=>card.id===id)[0];

       //verifica se a carta ja foi clicada ou se esta tendo a verificação dos pares
       if(card.flipped  || this.lockMode){
           return false;
       }

       //olha se ja tem a primeira carta, se não e adicionada 
       if(!this.firstCard) {
          this.firstCard = card;
          this.firstCard.flipped = true; //isso fala que a carta foi selecionada 
          return true;
       }else { // se não adiciona na segunda carta 
           this.secondCard = card;
           this.secondCard.flipped = true;//isso fala que a carta foi selecionada 
           this.lockMode = true;
           return true;
       }
    },
    
    //chaca se as cartas são iguais
    checkMath: function () {
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },
    
    //limpa as duas cartas
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    
    //retira o flipped para que possa ser selecionada novamente 
    unflipCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    
    //checa se todas as cartas ja foram flipped e quando não restar nenhuma e game Over
    checkGameOver: function () {
        
        return this.cards.filter(card=>!card.flipped).length == 0;
    },
    
    //Aqui são feitas as chamadas para a criação de cada carta para cada tecnologia crinado o par
    createCardsFromTechs: function() {

        //declara um array vazio, para que possa ser adicionado 
        this.cards = [];
    
        this.techs.forEach((tech)=> {
            //cria os pares das cartas
            this.cards.push(this.createPairFromTech(tech))
        })
    
        //esta comando faz com que retorne os 20 cartas e não 10 pares de cartas 
        this.cards = this.cards.flatMap(pair => pair);
        //embaralha as cartas
        this.shuffleCards()

        //retorna as cartas ja embaralhas 
        return this.cards;
    },
    
    //criação dos pares de cada tecnologia
    createPairFromTech: function(tech) {
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
    
            },
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            }
        ]
    },
    
    //cria o id para cada carta, os pares não tem id iguais.
    createIdWithTech: function(tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    //aqui são embaralha as cartas
    shuffleCards: function() {
        //começa no fim do array
        let currentIndex = this.cards.length;
        //numero gerado aleatorio
        let randomIndex = 0;
    
        //vai diminuindo ate chegar ao 0 vai embaralhando de tras pra fente
        while(currentIndex !== 0){
            //gera um numero aleatorio ate o index da ultima carta embaralhada 
            randomIndex = Math.floor(Math.random() * currentIndex);
            //diminui o valor da ultima carta
            currentIndex--;
    
            //faz a substituição das cartas
            [this.cards[randomIndex],this.cards[currentIndex]] = [this.cards[currentIndex],this.cards[randomIndex]]
        }
    
    }
    
}