<script setup lang="ts">
import {
  isTimeLimitEnabled,
  isAttemptLimitEnabled,
} from '../composables/useGameSettings'
import useGameState from '../composables/useGameState'

interface Props {
  matchesCount: number
  totalMatches: number
}

defineProps<Props>()

const { timeLeft, attemptsLeft } = useGameState()

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="status-container">
    <div class="status-item">
      <span class="label">Matches</span>
      <span class="value">{{ matchesCount }} / {{ totalMatches }}</span>
    </div>

    <div
      v-if="isTimeLimitEnabled"
      class="status-item"
      :class="{ warning: timeLeft <= 10 }"
    >
      <span class="label">Time</span>
      <span class="value">{{ formatTime(timeLeft) }}</span>
    </div>

    <div
      v-if="isAttemptLimitEnabled"
      class="status-item"
      :class="{ warning: attemptsLeft <= 5 }"
    >
      <span class="label">Attempts</span>
      <span class="value">{{ attemptsLeft }}</span>
    </div>
  </div>
</template>

<style scoped>
.status-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  background: #1a1a1a;
  padding: 15px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.status-item.warning .value {
  color: #ff4757;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}
</style>
