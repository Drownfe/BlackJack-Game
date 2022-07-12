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