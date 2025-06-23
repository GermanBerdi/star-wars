import { Dice } from "./rolls-enums";

const parseDice = (diceString: Dice): [number, number] => {
  const match = diceString.match(/^(\d+)D(\d+)$/);
  if (!match) throw new Error(`Invalid dice format: ${diceString}`);

  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);

  return [count, sides];
};

const roll = (dice: Dice): number => {
  let total = 0;
  const [count, sides] = parseDice(dice);
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
};

const service = {
  roll,
};

export default service;
