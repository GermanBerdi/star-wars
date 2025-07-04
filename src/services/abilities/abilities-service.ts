import abilityStrengthService from "./ability-strength/ability-strength-service";
import abilityDexterityService from "./ability-dexterity/ability-dexterity-service";
import abilityConstitutionService from "./ability-constitution/ability-constitution-service";
import abilityIntelligenceService from "./ability-intelligence/ability-intelligence-service";
import abilityWisdomService from "./ability-wisdom/ability-wisdom-service";
import abilityCharismaService from "./ability-charisma/ability-charisma-service";

const abilitiesService = {
  strength: abilityStrengthService,
  dexterity: abilityDexterityService,
  constitution: abilityConstitutionService,
  intelligence: abilityIntelligenceService,
  wisdom: abilityWisdomService,
  charisma: abilityCharismaService,
};

export default abilitiesService;
