const DrawCard = require('../../drawcard.js');
const { Durations } = require('../../Constants');

class Ofushukai extends DrawCard {
    setupCardAbilities(ability) { // eslint-disable-line no-unused-vars
        this.grantedAbilityLimits = {};
        this.whileAttached({
            match: card => card.hasTrait('champion'),
            effect: ability.effects.gainAbility('action', {
                title: 'Send a character home',
                condition: context => context.source.isParticipating(),
                printedAbility: false,
                target: {
                    cardType: 'character',
                    controller: 'any',
                    cardCondition: card => card.isParticipating(),
                    gameAction: [
                        ability.actions.sendHome(),
                        ability.actions.cardLastingEffect({
                            duration: Durations.UntilEndOfPhase,
                            effect: ability.effects.cannotParticipateAsAttacker()
                        })
                    ]
                }
            })
        });
    }

    canAttach(card, context) {
        if(card.controller !== context.player) {
            return false;
        }
        return card.isUnique() && card.isFaction('phoenix') ? super.canAttach(card, context) : false;
    }
}

Ofushukai.id = 'ofushikai';

module.exports = Ofushukai;
