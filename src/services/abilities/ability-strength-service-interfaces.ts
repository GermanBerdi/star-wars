export interface IAbilityStrengthRow {
  id: string;
  ability_score: number;
  exceptional_strength_min: number;
  exceptional_strength_max: number;
  hit_probability: number;
  damage_adjustment: number;
  weight_allowance: number;
  maximum_press: number;
  open_doors: number;
  open_locked_doors: number;
  bend_bars_lift_gates: number;
  notes: string;
  updated_at: Date;
  created_at: Date;
}
