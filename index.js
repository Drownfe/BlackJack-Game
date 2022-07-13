function Card() { //Card constructor start
    let name;
    let suit;
    let value;
    this.setValue = function() {
        let readlineSync = require('readline-sync');
        if (/^[A-Za-z]+$/.test(name)) {
            switch (name) {
                case 'J':
                case 'Q':
                case 'K':
                    value = 10;
                    break;
                default:
                    let aceChoice = readlineSync.question('\n You just receive an A \n Please choose the value that you want to be \n 1. A = 1 \n 2. A = 11 \n')
                    switch (Number(aceChoice)) {
                        case 1:
                            value = 1;
                            break;
                        default:
                            value = 11;
                            break;
                    }
            }
        } else { value = Number(name) }
    }
    Object.defineProperty(this, 'name', {
        get: function() {
            return name;
        },
        set: function(value) {
            if (String(value)) {
                name = value;
            }
        }
    });
    Object.defineProperty(this, 'suit', {
        get: function() {
            return suit;
        },
        set: function(value) {
            if (String(value)) {
                suit = value;
            }
        }
    });
    Object.defineProperty(this, 'value', {
        get: function() {
            return value;
        }
    });
}

function Player(name) { //Player constructor start
    this.name = name;
    this.reward = reward;
    this.cards = [];
    this.cardSummatory = function() {
        let sum = 0;
        this.cards.forEach(element => {
            sum += element.value;
        })
        return sum;
    }
    this.cardAdding = function(card) {
        this.cards.push(card);
    }
    this.rewardAdding = function(reward) {
        this.reward += reward;
    }
}

function Round() { //Round constructor start
    let player = new player();
    let cardName = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['♣', '♦', '♥', '♠'];
    let award = 1000;
    this.start = function() {
        let readlineSync = require('readline-sync');
        console.log("Welcome to Sofka's BlackJack");
        let userName = readlineSync.question('Please type your name: ');
        player.name = userName;
        console.log('Lets play ' + player.name + '!!!');
        firstRound();
        anotherRound();
    }
    let playAgain = function() {
        console.log(player.name + ", Lets play again");
        player.cards = [];
        firstRound();
        anotherRound();
    }
    let firstRound = function() {
        newCard();
        newCard();
        console.log("-------------------------");
        console.log('\nThese are your cards for this game: ');
        player.cards.forEach(card => {
            console.log(card.name + card.suit);
        })
    }
    let anotherRound = function() {
        let controlVariable = checkIsInGame();
        if (controlVariable) {
            newCard();
            console.log('\nThese are your cards for this game: ')
            player.cards.forEach(card => {
                console.log(card.name + card.suit);
            })
            anotherRound();
        }
        if (!controlVariable) {
            let readlineSync = require('readline-sync');
            let newGame = readlineSync.question("Do you want to try it again? (Y/N):");
            switch (newGame.toLowerCase()) {
                case 'y':
                    playAgain();
                    break;
                default:
                    console.log('-------------------------\n')
                    console.log("It was a pleasure!!! Please come back!!!");
                    console.log("This is your reward" + player.reward);
                    break;
            }
        }
    }
    let checkIsInGame = function() {
        let sum = player.sumCards();
        let isInGame;
        if (sum < 18) {
            console.log("Your cards are:  " + sum);
            console.log("-------------------------");
            let readlineSync = require('readline-sync');
            let anotherCard = readlineSync.question('\nWould you like another card? (Y/N): ');
            switch (anotherCard.toLowerCase()) {
                case 'y':
                    isInGame = true;
                    break;
                default:
                    isInGame = false;
                    console.log("-------------------------\n")
                    console.log("Your cards are: " + sum);
                    console.log("We're sorry. You lost, try it again!!!");
                    console.log("This is your reward: " + player.reward);
                    break;
            }
        }
    }
    if (sum >= 18 && sum <= 21) {
        isInGame = false;
        console.log("-------------------------\n")
        console.log("\nYour cards are: " + sum);
        console.log("You won!!! you can play again!!!");
        player.addPrize(prize);
        console.log("Your acumulated prize is" + player.reward);
        console.log("-------------------------\n")
    }
    if (sum > 21) {
        console.log("-------------------------\n")
        console.log("\nYour cards are: " + sum);
        console.log("\nWe're sorry. You lost, try it again!!!");
        console.log("Your acumulated prize is" + player.prize);
        console.log("-------------------------\n")
        isInGame = false;
        return isInGame;
    }
    let newCard = function() {
        let card = new Card();
        card.name = getRandomItem(cardNames);
        card.suit = getRandomItem(suits);
        card.setValue();
        if (!sameCard(card.name, card.suite)) {
            player.addCard(card);
        } else {
            newCard()
        }
    }
    let getRandomItem = function(item) {
        return item[Math.floor(Math.random() * item.length)]
    }
    let sameCard = function(drawCardName, drawCardSuit) {
        let isSameCard = false;
        if (player.cards.length !== 0) {
            player.cards.forEach(userCard => {
                if (userCard.name === drawCardName && userCard.suit === drawCardSuit) {
                    isSameCard = true;
                }
            })
        };
        return isSameCard;
    }
}
const round = new Round();
round.startGame();