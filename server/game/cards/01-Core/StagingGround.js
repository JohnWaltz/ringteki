const DrawCard = require('../../drawcard.js');
const { Locations } = require('../../Constants');

class StagingGround extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Flip up to 2 dynasty cards',
            target: {
                mode: 'upTo',
                numCards: 2,
                activePromptTitle: 'Choose up to 2 cards',
                location: Locations.Provinces,
                controller: 'self',
                gameAction: ability.actions.flipDynasty()
            }
        });
    }
}

StagingGround.id = 'staging-ground';

module.exports = StagingGround;
