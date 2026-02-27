<script setup lang="ts">
import CardsGame from './components/CardsGame.vue'
</script>

<template>
  <h1>Peek a Card</h1>
  <section class="game-board">
    <CardsGame />
  </section>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
