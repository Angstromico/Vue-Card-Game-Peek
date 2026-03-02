<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CardsGame from './components/CardsGame.vue'
import { cardImagesLinks } from './data'
import type { IMainCard } from './interfaces'
import useGenerateGame from './composables/useGenerateGame'

const cardInfo = ref<IMainCard[]>([])

onMounted(() => {
  useGenerateGame(cardImagesLinks, cardInfo)
})
</script>

<template>
  <h1>Peek a Card</h1>
  <section v-if="cardInfo.length" class="game-board">
    <CardsGame :cardInfo="cardInfo" />
  </section>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
