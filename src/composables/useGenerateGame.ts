import { ref } from 'vue'
import type { IMainCard } from '../interfaces'

export default function useGenerateGame(imagesSource: string[]) {
  const cardInfo = ref<IMainCard[]>([])

  const generate = () => {
    const selectedImages = [...imagesSource]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)

    // Unshuffled deck for the initial 'ready' state
    const deck: IMainCard[] = []

    // First 8 cards
    selectedImages.forEach((img, index) => {
      deck.push({
        id: index * 2 + 1,
        name: `Card ${index * 2 + 1}`,
        nameBack: `/cards/${img}`,
      })
    })

    // Matching pairs for the next 8 cards
    selectedImages.forEach((img, index) => {
      deck.push({
        id: index * 2 + 2,
        name: `Card ${index * 2 + 2}`,
        nameBack: `/cards/${img}`,
      })
    })

    cardInfo.value = deck
  }

  const shuffleCards = () => {
    cardInfo.value = [...cardInfo.value].sort(() => 0.5 - Math.random())
  }

  return {
    cardInfo,
    generate,
    shuffleCards,
  }
}
