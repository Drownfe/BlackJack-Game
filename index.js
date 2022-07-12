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
                    let aceChoice = readlineSync.question('\n Acabas de recibir un As \n Ingrese 1 o 2 para elegir que valor deseas darle \n 1. A = 1 \n 2. A = 11 \n')
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

//Player constructor start
function Player(name) {
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