import { BacteriaType, Nutrient, bacteriaTypes, nutrientTypes } from "./types"


export type CatalogueItem<T> = {
    type: T
    name: string
    image: string
    min: number
    max: number
    step: number
}


export const bacteriaCatalogue: CatalogueItem<BacteriaType>[] = Object.keys(bacteriaTypes).map(
    bacteriumName => {
        const bacteriumType = bacteriaTypes[bacteriumName as keyof typeof bacteriaTypes]
        return {
            type: bacteriumType,
            name: bacteriumName,
            image: `assets/${bacteriumName.toLowerCase()}.png`,
            min: 0,
            max: 10,
            step: 1,
        }
    }
)


export const nutrientsCatalogue: CatalogueItem<Nutrient>[] = nutrientTypes.map(
    nutrientType => {
        return {
            type: nutrientType,
            name: nutrientType,
            image: `assets/${nutrientType.toLowerCase()}.png`,
            min: 0,
            max: 1000,
            step: 100,
        }
    }
)