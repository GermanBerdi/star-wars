export interface IAbilityConstitutionRow {
  id: number;
  ability_score: number;
  hit_point_adjustment: number;
  warrior_hit_point_adjustment: number;
  hit_dice_min: number;
  system_shock: number;
  resurrection_survival: number;
  poison_save: number;
  regeneration: number;
  notes: string;
  updated_at: Date;
  created_at: Date;
}
