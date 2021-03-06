const DrawCard = require('../../drawcard.js');

class UtakuTetsuko extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: context => context.source.isAttacking(),
            targetType: 'player',
            targetController: 'opponent',
            effect: ability.effects.increaseCost({
                amount: 1,
                playingType: 'playFromHand'
            })
        });
    }
}

UtakuTetsuko.id = 'utaku-tetsuko';

module.exports = UtakuTetsuko;
