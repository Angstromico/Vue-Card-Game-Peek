<script setup lang="ts"></script>

<template lang="">
  <div class="board">
    <div v-for="n in 16" :key="n" class="card">
      {{ n }}
    </div>
  </div>
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

.card {
  border: 5px solid #ccc;
  border-radius: 8px;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: #f9f9f9;
  transition: transform 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  border-color: #42b883;
}
</style>
