<script setup lang="ts">
import { ref } from 'vue'

const selectedCard = ref<number | null>(null)

const cardInfo = [
  { id: 1, name: 'Card 1', nameBack: 'Back 1' },
  { id: 2, name: 'Card 2', nameBack: 'Back 2' },
  { id: 3, name: 'Card 3', nameBack: 'Back 3' },
  { id: 4, name: 'Card 4', nameBack: 'Back 4' },
  { id: 5, name: 'Card 5', nameBack: 'Back 5' },
  { id: 6, name: 'Card 6', nameBack: 'Back 6' },
  { id: 7, name: 'Card 7', nameBack: 'Back 7' },
  { id: 8, name: 'Card 8', nameBack: 'Back 8' },
  { id: 9, name: 'Card 9', nameBack: 'Back 9' },
  { id: 10, name: 'Card 10', nameBack: 'Back 10' },
  { id: 11, name: 'Card 11', nameBack: 'Back 11' },
  { id: 12, name: 'Card 12', nameBack: 'Back 12' },
  { id: 13, name: 'Card 13', nameBack: 'Back 13' },
  { id: 14, name: 'Card 14', nameBack: 'Back 14' },
  { id: 15, name: 'Card 15', nameBack: 'Back 15' },
  { id: 16, name: 'Card 16', nameBack: 'Back 16' },
]
//The toggle is activated in hover, I want to activate it in click, not when hovering the card
const toggleCard = (cardId: number) => {
  if (selectedCard.value === cardId) {
    selectedCard.value = null
  } else {
    selectedCard.value = cardId
  }
}
</script>

<template>
  <div class="board">
    <div
      v-for="card in cardInfo"
      :key="card.id"
      class="card-container"
      @click="toggleCard(card.id)"
    >
      <div class="card" :class="{ 'is-flipped': selectedCard === card.id }">
        <div class="face front">
          {{ card.name }}
        </div>
        <div class="face back">
          {{ card.nameBack }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.card-container {
  aspect-ratio: 3 / 4;
  perspective: 1000px;
}

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
  border: 5px solid #ccc;
  border-radius: 8px;
  font-size: 1.2rem;
}

.back {
  background-color: #42b883;
  color: white;
  transform: rotateY(180deg);
}

.front {
  background-color: #f9f9f9;
}

/* .card-container:hover .card {
  transform: rotateY(180deg);
} */
</style>
