import calcService from "../calculations/calc-service";
import fightsService from "../fights/fights-service";
import participantsService from "../participants/participants-service";
import abilitiesService from "../abilities/abilities-service";

import { Dice } from "../calculations/rolls/rolls-enums";
import { FightStatus } from "../fights/fights-enums";

import type { IPerformActionReq, IPerformActionRes } from "./actions-interfaces";
import type { IUpdateFightReq } from "../fights/fights-interfaces";

const calculateDamage = (damageAdjustment: number): number => {
  return calcService.rolls.rollDices(Dice._1D6) + damageAdjustment;
};

const performAction = async (action: IPerformActionReq): Promise<IPerformActionRes> => {
  try {
    const fight = await fightsService.getById(action.fightId);
    const actorParticipant = await participantsService.getByIdAndFightId(action.actorParticipantId, action.fightId);
    if (!participantsService.isAlive(actorParticipant))
      throw new Error(`Participant ${actorParticipant.id} is not alive.`);
    if (!fightsService.isParticipantTurn(actorParticipant.id, fight.pending_participants))
      throw new Error(`It's not participant ${actorParticipant.id}'s turn.`);
    const actorStrength = await abilitiesService.strength.getById(actorParticipant.strength_id);
    const targetParticipant = await participantsService.getByIdAndFightId(action.targetParticipantId, action.fightId);
    const hitRoll = calcService.rolls.rollDices(Dice._1D20);
    const hit = hitRoll >= actorParticipant.thac0 - targetParticipant.armor_class;
    const damage = hit ? calculateDamage(actorStrength.damage_adjustment) : 0;
    const targetParticipantUpdated = await participantsService.takeDamage(targetParticipant, damage);
    const participantsToRemove = [actorParticipant.id];
    if (!participantsService.isAlive(targetParticipantUpdated)) participantsToRemove.push(targetParticipant.id);
    const reviewedPendingParticipants = await fightsService.reviewPendingParticipants(
      fight.id,
      fight.pending_participants,
      participantsToRemove,
    );
    const updateFightReq: IUpdateFightReq = {
      id: fight.id,
      pending_participants: reviewedPendingParticipants,
    };
    const fightWinner = await fightsService.checkFightWinner(fight.id, fight.fight_status);
    if (fightWinner) {
      (updateFightReq.winner_id = fightWinner), (updateFightReq.fight_status = FightStatus.FINISHED);
    }
    const fightUpdated = await fightsService.update(updateFightReq);
    const performActionRes: IPerformActionRes = {
      fight: {
        id: fightUpdated.id,
        currentTurn: fightUpdated.turn,
        pendingParticipants: fightUpdated.pending_participants,
        status: fightUpdated.fight_status,
        winnerId: fightUpdated.winner_id,
      },
      participants: {
        actor: {
          id: actorParticipant.id,
          name: actorParticipant.participant_name,
        },
        target: {
          id: targetParticipantUpdated.id,
          name: targetParticipantUpdated.participant_name,
        },
      },
      actionInfo: {
        hitRoll,
        thac0: actorParticipant.thac0,
        armorClass: targetParticipant.armor_class,
        hit,
        damage,
      },
      effects: {
        target: {
          previousHp: targetParticipant.hp,
          currentHP: targetParticipantUpdated.hp,
        },
      },
    };
    return performActionRes;
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
