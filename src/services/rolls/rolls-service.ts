import { Dice } from "./rolls-enums";

const diceParse = (diceString: Dice): [number, number] => {
  const match = diceString.match(/^(\d+)D(\d+)$/);
  if (!match) throw new Error(`Invalid dice format: ${diceString}`);
  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);
  return [count, sides];
};

const rollNumber = (sides: number): number => {
  return Math.floor(Math.random() * sides) + 1;
};

const rollDices = (dice: Dice): number => {
  let total = 0;
  const [count, sides] = diceParse(dice);
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
};

const rollAbility = () => {
  return rollDices(Dice._3D6);
};

const service = {
  rollNumber,
  rollDices,
  rollAbility,
};

export default service;
