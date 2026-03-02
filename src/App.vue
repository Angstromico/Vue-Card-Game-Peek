<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CardsGame, FiguresButton } from './components'
import { cardImagesLinks } from './data'
import useGenerateGame from './composables/useGenerateGame'

const gameKey = ref(0)
const { cardInfo, generate } = useGenerateGame(cardImagesLinks)

const handleReset = () => {
  generate()
  gameKey.value++
}

onMounted(() => {
  generate()
})
</script>

<template>
  <h1>Peek a Card</h1>
  <section v-if="cardInfo.length" class="game-board">
    <CardsGame :cardInfo="cardInfo" :key="gameKey" />
    <FiguresButton :onClick="handleReset" />
  </section>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
