import characterCalculations from './character/character-calculations';
import rollsCalculations from "./rolls/rolls-calculations";

const calcService = {
  character: characterCalculations,
  rolls: rollsCalculations
};

export default calcService;