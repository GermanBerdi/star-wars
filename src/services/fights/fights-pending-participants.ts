import participantsService from "../participants/participants-service";

const isParticipantTurn = (participantId: number, pendingParticipants: number[] | null): boolean =>
  pendingParticipants !== null && pendingParticipants.length > 0 && pendingParticipants[0] === participantId;

const rollInitiatives = async (id: number): Promise<number[]> => {
  try {
    const participants = await participantsService.getByFightId(id);
    const aliveParticipants = participants.filter((participant) => participantsService.isAlive(participant));
    if (aliveParticipants.length === 0) throw new Error(`No alive participants found for fight ${id}`);
    const participantsWithInitiative = aliveParticipants.map((participant) => {
      const initiative = participantsService.rollInitiative(participant);
      return {
        id: participant.id,
        initiative,
      };
    });
    const pendingParticipants = participantsWithInitiative.sort((a, b) => a.initiative - b.initiative).map((p) => p.id);
    return pendingParticipants;
  } catch (error) {
    const errorMessage = `Error in rollInitiatives at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const reviewPendingParticipants = async (
  fightId: number,
  pending_participants: number[] | null,
  participantsToRemove: number[],
): Promise<number[]> => {
  try {
    if (pending_participants === null) throw new Error(`Pending participants has not been set in fight ${fightId}`);
    if (pending_participants.length === 0) throw new Error(`No pending participants to review in fight ${fightId}`);
    const participantsToRemoveSet = new Set(participantsToRemove);
    const reviewedPendingParticipants = pending_participants.filter(
      (participantId) => !participantsToRemoveSet.has(participantId),
    );
    return reviewedPendingParticipants;
  } catch (error) {
    const errorMessage = `Error in reviewPendingParticipants at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const pendingParticipants = {
  isParticipantTurn,
  rollInitiatives,
  reviewPendingParticipants,
};

export default pendingParticipants;
