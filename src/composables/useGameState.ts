import { ref, computed } from 'vue'
import {
  timeLimit,
  isTimeLimitEnabled,
  attemptLimit,
  isAttemptLimitEnabled,
} from './useGameSettings'

// We use global refs here so the state is shared across all components that import this composable
export const timeLeft = ref(timeLimit.value)
export const attemptsUsed = ref(0)
export const gameStatus = ref<
  'playing' | 'won' | 'lost_time' | 'lost_attempts'
>('playing')
export const isPaused = ref(false)

let timerInterval: number | undefined

export default function useGameState() {
  const attemptsLeft = computed(() => attemptLimit.value - attemptsUsed.value)

  const startGame = () => {
    gameStatus.value = 'playing'
    attemptsUsed.value = 0
    timeLeft.value = timeLimit.value
    isPaused.value = false

    clearInterval(timerInterval)
    if (isTimeLimitEnabled.value) {
      timerInterval = window.setInterval(() => {
        if (!isPaused.value) {
          if (timeLeft.value > 0) {
            timeLeft.value--
          } else {
            endGame('lost_time')
          }
        }
      }, 1000)
    }
  }

  const registerAttempt = () => {
    if (gameStatus.value !== 'playing') return

    attemptsUsed.value++

    if (
      isAttemptLimitEnabled.value &&
      attemptsUsed.value >= attemptLimit.value
    ) {
      endGame('lost_attempts')
    }
  }

  const endGame = (status: 'won' | 'lost_time' | 'lost_attempts') => {
    if (gameStatus.value === 'playing') {
      gameStatus.value = status
      clearInterval(timerInterval)
    }
  }

  const resetGame = () => {
    startGame()
  }

  return {
    timeLeft,
    attemptsUsed,
    attemptsLeft,
    gameStatus,
    isPaused,
    startGame,
    registerAttempt,
    endGame,
    resetGame,
  }
}
