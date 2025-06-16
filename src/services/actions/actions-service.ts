import { ICombatant } from "../fights/fights-interfaces";
import { IActorAndTarget, IPerformActionReq, IPerformActionRes } from "./actions-interfaces";
import fightService from "../fights/fights-service";
import { StateMessages } from "./actions-enums";
import { WinnerId } from "../fights/fights-enums";

const getActorAndTarget = (combatantId: number, combatant1: ICombatant, combatant2: ICombatant): IActorAndTarget => {
  if (combatantId === 1) {
    const actorAndTarget: IActorAndTarget = {
      actor: combatant1,
      target: combatant2,
    };
    return actorAndTarget;
  }
  const actorAndTarget: IActorAndTarget = {
    actor: combatant2,
    target: combatant1,
  };
  return actorAndTarget;
};

const calculateActionDamage = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const calculatHPAfterDamage = (currentHp: number, damage: number): number => {
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

const composeWinnerLabel = (winnerId: WinnerId, winnerName: string): string => {
  switch (winnerId) {
    case WinnerId.Combatant1:
    case WinnerId.Combatant2:
      return `There can be only one — and that one is ${winnerName}.`;
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
    const actorAndTarget = getActorAndTarget(action.combatantId, fightPopulated.combatant1, fightPopulated.combatant2);
    const actor = actorAndTarget.actor;
    const target = actorAndTarget.target;
    const actionPerformed: IPerformActionRes = {
      fightId: action.fightId,
      type: action.type,
      message: "",
      winnerId: fightPopulated.winner_id,
      winnerLabel: "",
      actor: actor,
      target: target,
      effects: {
        damage: 0,
      },
    };
    if (!fightService.isFinished(fightPopulated.winner_id)) {
      const damage = calculateActionDamage();
      const targetUpdatedHp = calculatHPAfterDamage(target.hp, damage);
      const fightAfterDamage = await fightService.updateCombatantHp(fightPopulated.id, target.id, targetUpdatedHp);
      const finalFightState = await fightService.updateIfFinished(fightAfterDamage);
      actionPerformed.effects.damage = damage;
      actionPerformed.effects.targetUpdatedHp = targetUpdatedHp;
      actionPerformed.winnerId = finalFightState.winner_id;
    }
    actionPerformed.message = getStateMessages(actionPerformed.winnerId);
    actionPerformed.winnerLabel = composeWinnerLabel(actionPerformed.winnerId, actor.name);
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
