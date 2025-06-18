import fightService from "../fights/fights-service";
import stringUtils from "../../utils/string-utils";
import { ICharacterRow } from "../characters/characters-interfaces";
import { ICombatant, IActorAndTarget, IPerformActionReq, IPerformActionRes } from "./actions-interfaces";
import { IFightPopulatedRow } from "../fights/fights-interfaces";
import { WinnerId } from "../fights/fights-enums";
import { ActionMessages, FightMessages } from "./actions-enums";

const characterToCombatant = (combatantId: number, character: ICharacterRow, combatantHp: number): ICombatant => {
  const combatant: ICombatant = {
    combatantId,
    characterId: character.id,
    name: character.name,
    hp: combatantHp,
    maxHp: character.hp,
    strength: character.strength,
    defense: character.defense,
    speed: character.speed,
  };
  return combatant;
};

const getActorAndTarget = (combatantId: number, fightPopulated: IFightPopulatedRow): IActorAndTarget => {
  if (combatantId === 1)
    return {
      actor: characterToCombatant(1, fightPopulated.character1, fightPopulated.fight.combatant1_hp),
      target: characterToCombatant(2, fightPopulated.character2, fightPopulated.fight.combatant2_hp),
    };
  return {
    actor: characterToCombatant(2, fightPopulated.character2, fightPopulated.fight.combatant2_hp),
    target: characterToCombatant(1, fightPopulated.character1, fightPopulated.fight.combatant1_hp),
  };
};

const calculateActionDamage = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const calculateHPAfterDamage = (currentHp: number, damage: number): number => {
  return currentHp - damage;
};

const composeFightMessage = (winnerId: WinnerId, character1Name: string, character2Name: string): string => {
  switch (winnerId) {
    case WinnerId.Combatant1:
      return stringUtils.applyTemplate(FightMessages.Winner, { name: character1Name });
    case WinnerId.Combatant2:
      return stringUtils.applyTemplate(FightMessages.Winner, { name: character2Name });
    case WinnerId.Draw:
      return FightMessages.Draw;
    case WinnerId.NoWinner:
    default:
      return FightMessages.NoWinner;
  }
};

const performAction = async (action: IPerformActionReq): Promise<IPerformActionRes> => {
  try {
    const fightPopulated = await fightService.getByIdPopulated(action.fightId);
    const { actor, target } = getActorAndTarget(action.combatantId, fightPopulated);
    const actionPerformed: IPerformActionRes = {
      actionInfo: {
        performed: false,
        type: action.type,
        message: "",
      },
      fightInfo: {
        fightId: action.fightId,
        turn: fightPopulated.fight.turn,
        ended: fightService.isFinished(fightPopulated.fight.winner_id),
        winnerId: fightPopulated.fight.winner_id,
        message: "",
      },
      actor: actor,
      target: target,
      effects: {
        damage: 0,
      },
    };
    if (fightService.isFinished(fightPopulated.fight.winner_id)) {
      actionPerformed.actionInfo.message = stringUtils.applyTemplate(ActionMessages.FightAlreadyEnded, {
        name: actor.name,
      });
      actionPerformed.fightInfo.message = composeFightMessage(
        actionPerformed.fightInfo.winnerId,
        fightPopulated.character1.name,
        fightPopulated.character2.name,
      );
      return actionPerformed;
    }
    if (action.combatantId !== fightPopulated.fight.turn) {
      actionPerformed.actionInfo.message = stringUtils.applyTemplate(ActionMessages.NotYourTurn, { name: actor.name });
      actionPerformed.fightInfo.message = composeFightMessage(
        actionPerformed.fightInfo.winnerId,
        fightPopulated.character1.name,
        fightPopulated.character2.name,
      );
      return actionPerformed;
    }
    const damage = calculateActionDamage();
    const targetUpdatedHp = calculateHPAfterDamage(target.hp, damage);
    const finalFightState = await fightService.applyActionEffects(
      fightPopulated.fight,
      target.combatantId,
      targetUpdatedHp,
    );
    actionPerformed.actionInfo.performed = true;
    actionPerformed.fightInfo.winnerId = finalFightState.winner_id;
    actionPerformed.effects.damage = damage;
    actionPerformed.effects.targetUpdatedHp = targetUpdatedHp;
    actionPerformed.actionInfo.message = stringUtils.applyTemplate(ActionMessages.ActionEffect, {
      actor: actor.name,
      target: target.name,
      damage: `${damage}`,
      currentHP: `${targetUpdatedHp}`,
      maxHP: `${target.maxHp}`,
    });
    actionPerformed.fightInfo.message = composeFightMessage(
      finalFightState.winner_id,
      fightPopulated.character1.name,
      fightPopulated.character2.name,
    );
    actionPerformed.fightInfo.ended = fightService.isFinished(finalFightState.winner_id);
    return actionPerformed;
  } catch (error) {
    const errorMessage = `Error in performAction at action service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  performAction,
};

export default service;
