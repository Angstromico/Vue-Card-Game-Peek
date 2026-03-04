import { ref } from 'vue'

export const timeLimit = ref(60)
export const isTimeLimitEnabled = ref(true)

export const attemptLimit = ref(20)
export const isAttemptLimitEnabled = ref(true)

export const isSoundEnabled = ref(true)

export default function useGameSettings() {
  const setTimeLimit = (seconds: number) => {
    timeLimit.value = seconds
  }

  const toggleTimeLimit = (enabled: boolean) => {
    isTimeLimitEnabled.value = enabled
  }

  const setAttemptLimit = (attempts: number) => {
    attemptLimit.value = attempts
  }

  const toggleAttemptLimit = (enabled: boolean) => {
    isAttemptLimitEnabled.value = enabled
  }

  const toggleSound = (enabled: boolean) => {
    isSoundEnabled.value = enabled
  }

  return {
    timeLimit,
    isTimeLimitEnabled,
    attemptLimit,
    isAttemptLimitEnabled,
    isSoundEnabled,
    setTimeLimit,
    toggleTimeLimit,
    setAttemptLimit,
    toggleAttemptLimit,
    toggleSound,
  }
}
