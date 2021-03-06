const DrawCard = require('../../drawcard.js');
const { Locations } = require('../../Constants');

class AncestralArmory extends DrawCard {
    setupCardAbilities(ability) { // eslint-disable-line no-unused-vars
        this.action({
            title: 'Return a weapon attachment in your conflict discard pile to your hand',
            cost: ability.costs.sacrificeSelf(),
            target: {
                activePrompt: 'Choose a weapon attachment from your conflict discard pile',
                cardCondition: card => card.hasTrait('weapon'),
                location: [Locations.ConflictDiscardPile],
                controller: 'self',
                gameAction: ability.actions.returnToHand({ location: Locations.ConflictDiscardPile }) // revisit implementation once returnToHand game action is rewritten.
            }
        });
    }
}

AncestralArmory.id = 'ancestral-armory';

module.exports = AncestralArmory;
