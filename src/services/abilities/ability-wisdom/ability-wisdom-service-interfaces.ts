export interface IAbilityWisdomRow {
  id: number;
  ability_score: number;
  magical_defense_adjustment: number;
  bonus_spells: number[];
  chance_of_spell_failure: number;
  spell_immunity: string;
  notes: string;
  updated_at: Date;
  created_at: Date;
}
