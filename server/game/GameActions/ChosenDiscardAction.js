const PlayerAction = require('./PlayerAction');
const { Locations } = require('../Constants');

class ChosenDiscardAction extends PlayerAction {
    setDefaultProperties() {
        this.amount = 1;
    }

    setup() {
        super.setup();
        this.name = 'discard';
        this.effectMsg = 'discard ' + this.amount + ' cards';
        this.cards = {};
    }

    canAffect(player, context) {
        if(player.hand.size() === 0 || this.amount === 0) {
            return false;
        }
        return super.canAffect(player, context);
    }

    preEventHandler(context) {
        super.preEventHandler(context);
        for(let player of this.target) {
            let amount = Math.min(player.hand.size(), this.amount);
            if(amount > 0) {
                context.game.promptForSelect(player, {
                    activePromptTitle: 'Choose ' + (amount === 1 ? 'a card' : (amount + ' cards')) + ' to discard',
                    context: context,
                    mode: 'exactly',
                    numCards: amount,
                    ordered: true,
                    location: Locations.Hand,
                    controller: player === context.player ? 'self' : 'opponent',
                    onSelect: (player, cards) => {
                        this.cards[player.uuid] = cards;
                        context.game.addMessage('{0} discards {1}', player, cards);
                        return true;
                    }
                });
            }
        }
    }

    getEvent(player, context) {
        return super.createEvent('onCardsDiscardedFromHand', { player: player, cards: this.cards[player.uuid], context: context }, event => {
            for(let card of event.cards) {
                player.moveCard(card, card.isDynasty ? Locations.DynastyDiscardPile : Locations.ConflictDiscardPile);
            }
        });
    }
}

module.exports = ChosenDiscardAction;
