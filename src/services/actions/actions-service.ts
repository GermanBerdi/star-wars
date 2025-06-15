import { ICombatant } from "../fights/fights-interfaces";
import { IActorAndTarget, IPerformActionReq, IPerformActionRes } from "./actions-interfaces";
import fightService from "../fights/fights-service";

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

const calculatRemainingHP = (currentHp: number, damage: number): number => {
  return currentHp - damage;
};

const performAction = async (action: IPerformActionReq): Promise<IPerformActionRes> => {
  try {
    const fightPopulated = await fightService.getByIdPopulated(action.fightId);
    const actorAndTarget = getActorAndTarget(action.combatantId, fightPopulated.combatant1, fightPopulated.combatant2);
    const actor = actorAndTarget.actor;
    const target = actorAndTarget.target;
    const damage = calculateActionDamage();
    const remainingHp = calculatRemainingHP(target.hp, damage);
    await fightService.updateCombatantHp(fightPopulated.id, target.id, remainingHp);
    const actionPerformed: IPerformActionRes = {
      fightId: action.fightId,
      type: action.type,
      actor: actor,
      target: target,
      effects: {
        damage,
        remainingHp,
      },
    };
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
