<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CardsGame from './components/CardsGame.vue'
import { cardImagesLinks } from './data'

interface Card {
  id: number
  name: string
  nameBack: string
}

const cardInfo = ref<Card[]>([])

const generateGame = () => {
  const selectedImages = [...cardImagesLinks]
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  const deck: Card[] = []

  selectedImages.forEach((img, index) => {
    deck.push({
      id: index * 2 + 1,
      name: `Card ${index * 2 + 1}`,
      nameBack: `/cards/${img}`,
    })
    deck.push({
      id: index * 2 + 2,
      name: `Card ${index * 2 + 2}`,
      nameBack: `/cards/${img}`,
    })
  })

  cardInfo.value = deck.sort(() => 0.5 - Math.random())
}

onMounted(() => {
  generateGame()
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
