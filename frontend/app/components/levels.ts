export const TRACK_MAX = 6; // positions 0..6 (7 tiles, 82px apart in the design)
export const STAR_REWARD = 10;

export type Level = {
  id: number;
  title: string;
  prompt: string;
  start: number;
  flag: number;
  hint: string;
  /** Optional rule the code must satisfy (beyond reaching the flag). */
  requirement?: { test: RegExp; message: string };
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Move Maya!",
    prompt: "Write a JavaScript block to move the square to the flag.",
    start: 0,
    flag: 6,
    hint: "moveRight(steps) walks Maya to the right.\nThe flag is 6 steps away:\n\nmoveRight(6);",
  },
  {
    id: 2,
    title: "Loop it!",
    prompt: "Use a for loop to walk Maya to the flag, one step at a time.",
    start: 0,
    flag: 5,
    hint: "for (let i = 0; i < 5; i++) {\n  moveRight(1);\n}",
    requirement: { test: /\b(for|while)\s*\(/, message: "this level needs a loop." },
  },
  {
    id: 3,
    title: "Turn around!",
    prompt: "The flag is behind Maya this time. Move the square back to it.",
    start: 6,
    flag: 2,
    hint: "moveLeft(steps) walks Maya to the left.\n\nmoveLeft(4);",
  },
  {
    id: 4,
    title: "Remember it",
    prompt: "Store the distance in a variable, then use it to move Maya.",
    start: 1,
    flag: 6,
    hint: "const steps = 5;\nmoveRight(steps);",
    requirement: { test: /\b(const|let|var)\s+\w+/, message: "this level needs a variable." },
  },
];
