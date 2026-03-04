<script setup lang="ts">
import type { ICard } from '../interfaces'

interface Props {
  isCardFlipped: (cardId: number) => boolean
  matchedCards: number[]
  card: ICard
}

const props = defineProps<Props>()
const { isCardFlipped, matchedCards, card } = props
</script>

<template>
  <div
    class="card"
    :class="{
      'is-flipped': isCardFlipped(card.id),
      'is-matched': matchedCards.includes(card.id),
    }"
  >
    <div class="face front">?</div>
    <div
      class="face back"
      :style="{ backgroundImage: `url(${card.nameBack})` }"
    ></div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--border);
  border-radius: 8px;
  font-size: 1.2rem;
}

.back {
  background-color: var(--bg-panel-light);
  color: var(--text-main);
  transform: rotateY(180deg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.front {
  background-color: var(--bg-main);
}

.card.is-matched .face.back {
  background-color: var(--bg-panel);
  border-color: var(--primary);
}
</style>
