<script setup lang="ts">
import { gameStatus } from '../composables/useGameState'

const emit = defineEmits(['restart'])
</script>

<template>
  <div v-if="gameStatus !== 'playing'" class="overlay">
    <div class="message-box" :class="gameStatus">
      <h2 v-if="gameStatus === 'won'">🎉 You Win! 🎉</h2>
      <h2 v-if="gameStatus === 'lost_time'">⏳ Time's Up! ⏳</h2>
      <h2 v-if="gameStatus === 'lost_attempts'">❌ Out of Attempts! ❌</h2>

      <p v-if="gameStatus === 'won'">Great memory!</p>
      <p v-if="gameStatus !== 'won'">Better luck next time.</p>

      <button class="restart-btn" @click="$emit('restart')">Play Again</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  backdrop-filter: blur(5px);
  border-radius: 8px; /* match board if needed */
}

.message-box {
  background: #2a2a3f;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transform: translateY(-20px);
  animation: slideDown 0.4s ease-out forwards;
}

.message-box.won {
  border: 2px solid #42b883;
}

.message-box.lost_time,
.message-box.lost_attempts {
  border: 2px solid #ff4757;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 2rem;
  color: white;
}

p {
  color: #bbb;
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.restart-btn {
  background: #42b883;
  color: #1a1a1a;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.3);
}

.restart-btn:hover {
  background: #33a06f;
  transform: scale(1.05);
}

.restart-btn:active {
  transform: scale(0.95);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
