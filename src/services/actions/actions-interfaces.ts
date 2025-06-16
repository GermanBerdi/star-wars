import { ICombatant } from "../fights/fights-interfaces";
import { WinnerId } from "../fights/fights-enums";

export interface IPerformActionReq {
  fightId: number;
  combatantId: number;
  type: string;
}

export interface IActorAndTarget {
  actor: ICombatant;
  target: ICombatant;
}

export interface IPerformActionRes {
  fightId: number;
  type: string;
  message: string;
  winnerId: WinnerId;
  winnerLabel: string;
  actor: ICombatant;
  target: ICombatant;
  effects: {
    damage: number;
    targetUpdatedHp?: number;
  };
}
