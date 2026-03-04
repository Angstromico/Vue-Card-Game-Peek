import { isSoundEnabled } from './useGameSettings'

type SoundType = 'win' | 'loss' | 'success' | 'fail' | 'flip'

const sounds: Record<SoundType, HTMLAudioElement> = {
  win: new Audio('/sounds/win.mp3'),
  loss: new Audio('/sounds/loss.mp3'),
  success: new Audio('/sounds/success.mp3'),
  fail: new Audio('/sounds/fail.mp3'),
  flip: new Audio('/sounds/flip.mp3'),
}

export default function useSounds() {
  const playSound = (type: SoundType) => {
    if (isSoundEnabled.value) {
      const audio = sounds[type]
      if (audio) {
        audio.currentTime = 0
        audio.play().catch((err) => {
          console.warn('Audio playback failed:', err)
        })
      }
    }
  }

  return {
    playSound,
  }
}
