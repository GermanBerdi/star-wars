export interface IAbilityIntelligenceRow {
  id: number;
  ability_score: number;
  num_languages: number;
  spell_level: number;
  chance_to_learn_spell: number;
  max_spells_per_level: number;
  spell_immunity: number;
  notes: string;
  updated_at: Date;
  created_at: Date;
}
