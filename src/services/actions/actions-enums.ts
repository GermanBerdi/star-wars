export enum ActionMessages {
  NotYourTurn = "Patience, $name. It's not your turn to strike.",
  FightAlreadyEnded = "It's over, $name. The battle has ended.",
  ActionEffect = "$actor hits! $target takes $damage damage. HP: $currentHP($maxHP).",
}

export enum FightMessages {
  Winner = "There can be only one — and that one is $name",
  Draw = "Blades clashed, wills broke — yet none prevailed. It's a draw.",
  NoWinner = "The Game is not yet over. The immortals still fight.",
}
