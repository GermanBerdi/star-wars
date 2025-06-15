import { ICombatant } from "../fights/fights-interfaces";

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
  actor: ICombatant;
  target: ICombatant;
  effects: {
    damage: number;
    targetUpdatedHp: number;
  };
  state: {
    winnerId: number;
  };
}
