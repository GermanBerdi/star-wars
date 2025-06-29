import { ClassGroup } from "./character-classes-enums";

export interface ICharacterClassRow {
  id: number;
  class_name: string;
  class_group: ClassGroup;
  hit_dice: number;
  hit_dice_limit: number;
  hit_fixed: number;
  updated_at: Date;
  created_at: Date;
}
