<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  cardInfo: {
    id: number
    name: string
    nameBack: string
  }[]
}

interface Card {
  id: number
  name: string
  nameBack: string
}

const choosenCards = ref<Card[]>([])
const matchedCards = ref<number[]>([])
const isBusy = ref(false)

const props = defineProps<Props>()
const { cardInfo } = props

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
