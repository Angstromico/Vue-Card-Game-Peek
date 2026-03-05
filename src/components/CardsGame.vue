<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '../interfaces'
import CardTemplate from './CardTemplate.vue'
import useGameState from '../composables/useGameState'
import useSounds from '../composables/useSounds'
import useI18n from '../composables/useI18n'
import GameStatus from './GameStatus.vue'
import GameOverlay from './GameOverlay.vue'

interface Props {
  cardInfo: {
    id: number
    name: string
    nameBack: string
  }[]
}

const emit = defineEmits(['restart', 'shuffleSelectedCards'])

const choosenCards = ref<ICard[]>([])
const matchedCards = ref<number[]>([])
const isBusy = ref(false)
const temporarilyFlippedCards = ref<number[]>([])
const isShuffling = ref(false)

const props = defineProps<Props>()
const { cardInfo } = props

const { registerAttempt, endGame, gameStatus, isPaused, startGame } =
  useGameState()
const { playSound } = useSounds()
const { t } = useI18n()

import { watch } from 'vue'

watch(gameStatus, (newStatus) => {
  if (newStatus === 'won') {
    playSound('win')
  } else if (newStatus === 'lost_time' || newStatus === 'lost_attempts') {
    playSound('loss')
  } else if (newStatus === 'ready') {
    temporarilyFlippedCards.value = []
    choosenCards.value = []
    matchedCards.value = []
  }
})

const toggleCard = (cardId: number) => {
  if (isBusy.value || isPaused.value) return

  // Handle temporary flips in 'ready' state
  if (gameStatus.value === 'ready') {
    // Only the first 8 cards are initially face-up
    const cardIndex = cardInfo.findIndex((c) => c.id === cardId)
    const isInitiallyFaceUp = cardIndex !== -1 && cardIndex < 8

    // We only care about temporarily flipping down the ones that are face-up
    if (isInitiallyFaceUp && !temporarilyFlippedCards.value.includes(cardId)) {
      playSound('flip')
      temporarilyFlippedCards.value.push(cardId)
      setTimeout(() => {
        temporarilyFlippedCards.value = temporarilyFlippedCards.value.filter(
          (id) => id !== cardId,
        )
      }, 1000)
    }
    return
  }

  // Normal game playing logic
  if (
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
  if (isShuffling.value) return false

  if (gameStatus.value === 'ready') {
    // In ready state, first 8 are flipped UP, UNLESS they are in temporarilyFlippedCards
    const cardIndex = cardInfo.findIndex((c) => c.id === cardId)
    const isInitiallyFaceUp = cardIndex !== -1 && cardIndex < 8
    return isInitiallyFaceUp && !temporarilyFlippedCards.value.includes(cardId)
  }

  return (
    choosenCards.value.some((c) => c.id === cardId) ||
    matchedCards.value.includes(cardId)
  )
}

const startShuffleAnimation = () => {
  if (gameStatus.value !== 'ready') return

  isBusy.value = true
  isShuffling.value = true
  playSound('flip')

  // Wait for the face-down flip animation to complete (0.6s) before reordering
  setTimeout(() => {
    let shuffles = 0
    const shuffleInterval = setInterval(() => {
      emit('shuffleSelectedCards')
      playSound('flip') // Play sound during shuffle
      shuffles++

      if (shuffles >= 3) {
        clearInterval(shuffleInterval)
        setTimeout(() => {
          isBusy.value = false
          isShuffling.value = false
          startGame() // Finally start the game timer, transitions to 'playing'
        }, 500)
      }
    }, 600) // Shuffle every 600ms
  }, 600)
}
</script>

<template>
  <div class="board-wrapper">
    <div class="start-container" v-if="gameStatus === 'ready'">
      <button
        class="start-btn"
        @click="startShuffleAnimation"
        :disabled="isBusy"
      >
        {{ t('startGame').value }}
      </button>
    </div>

    <transition-group name="shuffle" tag="div" class="board">
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
    </transition-group>
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

.start-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.start-btn {
  padding: 10px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--primary);
  color: var(--text-main);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.start-btn:hover:not(:disabled) {
  transform: scale(1.05);
  background-color: var(--primary-hover);
}

.start-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

/* List move animation for shuffling */
.shuffle-move {
  transition: transform 0.5s ease-in-out;
}
</style>
