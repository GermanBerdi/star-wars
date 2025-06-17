import { WinnerId } from "../fights/fights-enums";

export interface IPerformActionReq {
  fightId: number;
  combatantId: number;
  type: string;
}

export interface ICombatant {
  combatantId: number;
  characterId: number;
  name: string;
  hp: number;
  maxHp: number;
  strength: number;
  defense: number;
  speed: number;
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
