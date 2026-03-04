<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '../interfaces'
import CardTemplate from './CardTemplate.vue'
import useGameState from '../composables/useGameState'
import useSounds from '../composables/useSounds'
import GameStatus from './GameStatus.vue'
import GameOverlay from './GameOverlay.vue'

interface Props {
  cardInfo: {
    id: number
    name: string
    nameBack: string
  }[]
}

const emit = defineEmits(['restart'])

const choosenCards = ref<ICard[]>([])
const matchedCards = ref<number[]>([])
const isBusy = ref(false)

const props = defineProps<Props>()
const { cardInfo } = props

const { registerAttempt, endGame, gameStatus, isPaused } = useGameState()
const { playSound } = useSounds()

import { watch } from 'vue'

watch(gameStatus, (newStatus) => {
  if (newStatus === 'won') {
    playSound('win')
  } else if (newStatus === 'lost_time' || newStatus === 'lost_attempts') {
    playSound('loss')
  }
})

const toggleCard = (cardId: number) => {
  if (
    isBusy.value ||
    isPaused.value ||
    gameStatus.value !== 'playing' ||
    matchedCards.value.includes(cardId) ||
    choosenCards.value.some((c) => c.id === cardId)
  )
    return

  const card = cardInfo.find((c) => c.id === cardId)
  if (!card) return

  playSound('flip')
  choosenCards.value.push(card)

  if (choosenCards.value.length === 2) {
    registerAttempt()
    checkMatch()
  }
}

const checkMatch = () => {
  const [first, second] = choosenCards.value

  if (first && second && first.nameBack === second.nameBack) {
    playSound('success')
    matchedCards.value.push(first.id, second.id)
    choosenCards.value = []

    if (matchedCards.value.length === cardInfo.length) {
      endGame('won')
    }
  } else {
    playSound('fail')
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
  <div class="board-wrapper">
    <div class="board">
      <div
        v-for="card in cardInfo"
        :key="card.id"
        class="card-container"
        @click="toggleCard(card.id)"
      >
        <CardTemplate
          :card="card"
          :isCardFlipped="isCardFlipped"
          :matchedCards="matchedCards"
        />
      </div>
    </div>
    <GameOverlay @restart="$emit('restart')" />
  </div>

  <GameStatus
    :matchesCount="matchedCards.length / 2"
    :totalMatches="cardInfo.length / 2"
  />
</template>

<style scoped>
.board-wrapper {
  position: relative;
}

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
</style>
