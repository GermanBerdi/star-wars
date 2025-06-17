import fightService from "../fights/fights-service";
import { ICharacterRow } from "../characters/characters-interfaces";
import { ICombatant, IActorAndTarget, IPerformActionReq, IPerformActionRes } from "./actions-interfaces";
import { IFightPopulatedRow } from "../fights/fights-interfaces";
import { WinnerId } from "../fights/fights-enums";
import { StateMessages } from "./actions-enums";

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

const getStateMessages = (winnerId: WinnerId): string => {
  switch (winnerId) {
    case WinnerId.Combatant1:
    case WinnerId.Combatant2:
    case WinnerId.Draw:
      return StateMessages.FightAlreadyEnded;
    case WinnerId.NoWinner:
    default:
      return StateMessages.FightContinues;
  }
};

const composeWinnerLabel = (winnerId: WinnerId, character1Name: string, character2Name: string): string => {
  switch (winnerId) {
    case WinnerId.Combatant1:
      return `There can be only one — and that one is ${character1Name}.`;
    case WinnerId.Combatant2:
      return `There can be only one — and that one is ${character2Name}.`;
    case WinnerId.Draw:
      return "Blades clashed, wills broke — yet none prevailed. It's a draw.";
    case WinnerId.NoWinner:
    default:
      return "The Game is not yet over. The immortals still fight.";
  }
};

const performAction = async (action: IPerformActionReq): Promise<IPerformActionRes> => {
  try {
    const fightPopulated = await fightService.getByIdPopulated(action.fightId);
    const { actor, target } = getActorAndTarget(action.combatantId, fightPopulated);
    const actionPerformed: IPerformActionRes = {
      fightId: action.fightId,
      type: action.type,
      message: "",
      winnerId: fightPopulated.fight.winner_id,
      winnerLabel: "",
      actor: actor,
      target: target,
      effects: {
        damage: 0,
      },
    };
    if (!fightService.isFinished(fightPopulated.fight.winner_id)) {
      const damage = calculateActionDamage();
      const targetUpdatedHp = calculateHPAfterDamage(target.hp, damage);
      const finalFightState = await fightService.applyActionEffects(
        fightPopulated.fight,
        target.combatantId,
        targetUpdatedHp,
      );
      actionPerformed.effects.damage = damage;
      actionPerformed.effects.targetUpdatedHp = targetUpdatedHp;
      actionPerformed.winnerId = finalFightState.winner_id;
    }
    actionPerformed.message = getStateMessages(actionPerformed.winnerId);
    actionPerformed.winnerLabel = composeWinnerLabel(
      actionPerformed.winnerId,
      fightPopulated.character1.name,
      fightPopulated.character2.name,
    );
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
