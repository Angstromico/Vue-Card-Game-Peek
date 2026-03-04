<script setup lang="ts">
import { gameStatus } from '../composables/useGameState'
import useI18n from '../composables/useI18n'

const emit = defineEmits(['restart'])
const { t } = useI18n()
</script>

<template>
  <div v-if="gameStatus !== 'playing'" class="overlay">
    <div class="message-box" :class="gameStatus">
      <h2 v-if="gameStatus === 'won'">{{ t('youWin').value }}</h2>
      <h2 v-if="gameStatus === 'lost_time'">{{ t('timesUp').value }}</h2>
      <h2 v-if="gameStatus === 'lost_attempts'">
        {{ t('outOfAttempts').value }}
      </h2>

      <p v-if="gameStatus === 'won'">{{ t('greatMemory').value }}</p>
      <p v-if="gameStatus !== 'won'">{{ t('betterLuck').value }}</p>

      <button class="restart-btn" @click="$emit('restart')">
        {{ t('playAgain').value }}
      </button>
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
  background: var(--bg-panel-light);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transform: translateY(-20px);
  animation: slideDown 0.4s ease-out forwards;
}

.message-box.won {
  border: 2px solid var(--primary);
}

.message-box.lost_time,
.message-box.lost_attempts {
  border: 2px solid var(--error);
}

h2 {
  margin: 0 0 10px 0;
  font-size: 2rem;
  color: var(--text-main);
}

p {
  color: var(--text-muted);
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.restart-btn {
  background: var(--primary);
  color: var(--bg-main);
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(255, 117, 24, 0.3);
}

.restart-btn:hover {
  background: var(--primary-hover);
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
