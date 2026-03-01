<script setup lang="ts">
import { ref } from 'vue'

interface Card {
  id: number
  name: string
  nameBack: string
}

const choosenCards = ref<Card[]>([])
const matchedCards = ref<number[]>([])
const isBusy = ref(false)

const cardInfo = [
  { id: 1, name: 'Card 1', nameBack: 'Apple' },
  { id: 2, name: 'Card 2', nameBack: 'Apple' },
  { id: 3, name: 'Card 3', nameBack: 'Banana' },
  { id: 4, name: 'Card 4', nameBack: 'Banana' },
  { id: 5, name: 'Card 5', nameBack: 'Orange' },
  { id: 6, name: 'Card 6', nameBack: 'Orange' },
  { id: 7, name: 'Card 7', nameBack: 'Grape' },
  { id: 8, name: 'Card 8', nameBack: 'Grape' },
  { id: 9, name: 'Card 9', nameBack: 'Cherry' },
  { id: 10, name: 'Card 10', nameBack: 'Cherry' },
  { id: 11, name: 'Card 11', nameBack: 'Mango' },
  { id: 12, name: 'Card 12', nameBack: 'Mango' },
  { id: 13, name: 'Card 13', nameBack: 'Berry' },
  { id: 14, name: 'Card 14', nameBack: 'Berry' },
  { id: 15, name: 'Card 15', nameBack: 'Lemon' },
  { id: 16, name: 'Card 16', nameBack: 'Lemon' },
]

const toggleCard = (cardId: number) => {
  if (
    isBusy.value ||
    matchedCards.value.includes(cardId) ||
    choosenCards.value.some((c) => c.id === cardId)
  )
    return

  const card = cardInfo.find((c) => c.id === cardId)
  if (!card) return

  choosenCards.value.push(card)

  if (choosenCards.value.length === 2) {
    checkMatch()
  }
}

const checkMatch = () => {
  const [first, second] = choosenCards.value

  if (first && second && first.nameBack === second.nameBack) {
    matchedCards.value.push(first.id, second.id)
    choosenCards.value = []
  } else {
    isBusy.value = true
    setTimeout(() => {
      choosenCards.value = []
      isBusy.value = false
    }, 1000)
  }
}

const isCardFlipped = (cardId: number) => {
  return (
    choosenCards.value.some((c) => c.id === cardId) ||
    matchedCards.value.includes(cardId)
  )
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
      <div
        class="card"
        :class="{
          'is-flipped': isCardFlipped(card.id),
          'is-matched': matchedCards.includes(card.id),
        }"
      >
        <div class="face front">?</div>
        <div class="face back">
          {{ card.nameBack }}
        </div>
      </div>
    </div>
  </div>

  <div class="status">Matches: {{ matchedCards.length / 2 }} / 8</div>
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

.card.is-matched .face.back {
  background-color: #2c3e50;
  border-color: #42b883;
}

.status {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}

/* .card-container:hover .card {
  transform: rotateY(180deg);
} */
</style>
