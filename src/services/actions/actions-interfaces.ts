import { FightStatus } from "../fights/fights-enums";

export interface IPerformActionReq {
  fightId: number;
  actorParticipantId: number;
  targetParticipantId: number;
}

export interface IPerformActionRes {
  fight: {
    id: number;
    currentTurn: number;
    pendingParticipants: number[] | null;
    status: FightStatus;
    winnerId: number;
  };
  participants: {
    actor: {
      id: number;
      name: string;
    },
    target: {
      id: number;
      name: string;
    }
  };
  actionInfo: {
    hitRoll: number;
    thac0: number;
    armorClass: number;
    hit: boolean;
    damage: number;
  };
  effects: {
    target: {
      previousHp: number;
      currentHP: number;
    }
  };
}
