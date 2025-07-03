import abilityStrengthService from "./ability-strength/ability-strength-service";
import abilityDexterityService from "./ability-dexterity/ability-dexterity-service";
import abilityConstitutionService from "./ability-constitution/ability-constitution-service";

const abilitiesService = {
  strength: abilityStrengthService,
  dexterity: abilityDexterityService,
  constitution: abilityConstitutionService,
};

export default abilitiesService;
