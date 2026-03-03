# Peek - Vue 3 Card Game

A memory card matching game built with Vue 3, TypeScript, and Vite. This application demonstrates modern Vue 3 development practices using `<script setup>` Single File Components and Composables for state management.

## About the Game

Peek is an interactive memory card matching game where the objective is to find all matching pairs of cards on the board as quickly and efficiently as possible.

### Features

- **Responsive Gameplay:** A 4x4 grid of cards randomized each round.
- **Customizable Settings:**
  - **Time Limit:** Players have a customizable amount of time to find all the matches. A warning pulses when time is running low!
  - **Attempt Limit:** Players have a set maximum number of unsuccessful matches before it's game over.
  - **Settings Modal:** Click the gear icon during the game to configure custom time limits and attempts, or toggle the limits on/off.
- **Dynamic Feedback:** Real-time remaining time and attempts are always visible alongside the matches you've secured.
- **End of Game Overlay:** Clean UI alerts for "You Win!", "Time's Up!", or "Out of Attempts!" preventing further interaction until the game resets.

## How to Play

1. Click any card to reveal its image.
2. Click a second card to see if it matches the first.
3. If they match, they stay revealed! If they don't, they flip back after a brief delay.
4. Keep an eye on the clock and your attempts counter.
5. To change the difficulty, click the Settings button (gear icon) at the top of the page.
6. Click the shape-shifting button at the bottom at any time to explicitly restart the game and shuffle the deck.

---

_Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup)._
