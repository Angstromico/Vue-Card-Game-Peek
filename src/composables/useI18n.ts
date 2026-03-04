import { ref, computed } from 'vue'

export type Locale = 'en' | 'es'

const locale = ref<Locale>('en')

const messages = {
  en: {
    appTitle: 'Peek a Card',
    settings: 'Game Settings',
    enableTimeLimit: 'Enable Time Limit',
    timeLimitSeconds: 'Time (seconds):',
    enableAttemptLimit: 'Enable Attempt Limit',
    maxAttempts: 'Max Attempts:',
    cancel: 'Cancel',
    saveRestart: 'Save & Restart',
    language: 'Language:',
    matches: 'Matches',
    time: 'Time',
    attempts: 'Attempts',
    youWin: '🎉 You Win! 🎉',
    timesUp: "⏳ Time's Up! ⏳",
    outOfAttempts: '❌ Out of Attempts! ❌',
    greatMemory: 'Great memory!',
    betterLuck: 'Better luck next time.',
    playAgain: 'Play Again',
  },
  es: {
    appTitle: 'Encuentra la Pareja',
    settings: 'Ajustes del Juego',
    enableTimeLimit: 'Habilitar Límite de Tiempo',
    timeLimitSeconds: 'Tiempo (segundos):',
    enableAttemptLimit: 'Habilitar Límite de Intentos',
    maxAttempts: 'Intentos Máximos:',
    cancel: 'Cancelar',
    saveRestart: 'Guardar y Reiniciar',
    language: 'Idioma:',
    matches: 'Parejas',
    time: 'Tiempo',
    attempts: 'Intentos',
    youWin: '🎉 ¡Ganaste! 🎉',
    timesUp: '⏳ ¡Se acabó el tiempo! ⏳',
    outOfAttempts: '❌ ¡Sin intentos! ❌',
    greatMemory: '¡Qué gran memoria!',
    betterLuck: 'Mejor suerte la próxima vez.',
    playAgain: 'Jugar de Nuevo',
  },
}

export default function useI18n() {
  const t = (key: keyof (typeof messages)['en']) => {
    return computed(() => messages[locale.value][key])
  }

  return {
    locale,
    t,
  }
}
