const DrawCard = require('../../drawcard.js');
const { Locations } = require('../../Constants');

class ShosuroActress extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put an opponent\'s character into play',
            cost: ability.costs.sacrificeSelf(),
            target: {
                cardType: 'character',
                location: [Locations.ConflictDiscardPile, Locations.DynastyDiscardPile],
                controller: 'opponent',
                cardCondition: card => card.costLessThan(4) && !card.hasTrait('shinobi'),
                // TODO make this take control
                gameAction: ability.actions.putIntoConflict()
            }
        });
    }
}

ShosuroActress.id = 'shosuro-actress';

module.exports = ShosuroActress;
