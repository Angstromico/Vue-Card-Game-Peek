import type { Ref } from 'vue'
import type { IMainCard } from '../interfaces'

const useGenerateGame = (
  cardImagesLinks: string[],
  cardInfo: Ref<IMainCard[]>,
) => {
  const selectedImages = [...cardImagesLinks]
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  const deck: IMainCard[] = []

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

export default useGenerateGame
