<script setup lang="ts">
import CardsGame from './components/CardsGame.vue'

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
</script>

<template>
  <h1>Peek a Card</h1>
  <section class="game-board">
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
