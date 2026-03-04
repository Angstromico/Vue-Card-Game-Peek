<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  CardsGame,
  FiguresButton,
  SettingsButton,
  SettingsModal,
} from './components'
import { cardImagesLinks } from './data'
import useGenerateGame from './composables/useGenerateGame'
import useGameState from './composables/useGameState'

const gameKey = ref(0)
const { cardInfo, generate } = useGenerateGame(cardImagesLinks)
const { resetGame, isPaused } = useGameState()

const isSettingsOpen = ref(false)

const handleReset = () => {
  generate()
  gameKey.value++
  resetGame()
}

const handlePause = () => {
  isPaused.value = true
  isSettingsOpen.value = true
}

const handleCloseSettings = () => {
  isSettingsOpen.value = false
  isPaused.value = false
}

onMounted(() => {
  handleReset()
})
</script>

<template>
  <header class="app-header">
    <h1>Peek a Card</h1>
    <SettingsButton @click="handlePause" />
  </header>

  <SettingsModal
    v-if="isSettingsOpen"
    @close="handleCloseSettings"
    @save="handleReset"
  />

  <section v-if="cardInfo.length" class="game-board">
    <CardsGame :cardInfo="cardInfo" :key="gameKey" @restart="handleReset" />
    <FiguresButton :onClick="handleReset" />
  </section>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.game-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
