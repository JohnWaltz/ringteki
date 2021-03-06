const StrongholdCard = require('../../strongholdcard.js');
const { Durations } = require('../../Constants');

class KyudenBayushi extends StrongholdCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Ready a dishonored character',
            cost: ability.costs.bowSelf(),
            target: {
                cardtype: 'character',
                controller: 'self',
                cardCondition: card => card.isDishonored,
                gameAction: [
                    ability.actions.ready(),
                    ability.actions.cardLastingEffect(context => ({
                        target: context.player.honor <= 6 ? context.target : [],
                        duration: Durations.UntilEndOfPhase,
                        effect: ability.effects.modifyBothSkills(1)
                    }))
                ]
            }
        });
    }
}

KyudenBayushi.id = 'kyuden-bayushi';

module.exports = KyudenBayushi;
