import { Ecoli } from "./bacteria/Ecoli"
import { Selongatus } from "./bacteria/Selongatus"

export const nutrientTypes = ['Glucose', 'CO2', 'Oxygen', 'Water'] as const
export type Nutrient = typeof nutrientTypes[number]


export type NutrientsRecord = Record<Nutrient, number>

export type MetabolicPathway = {
    input: Partial<NutrientsRecord>
    output: Partial<NutrientsRecord>
}

export type ExtremePoints = {
    left: p5.Vector
    top: p5.Vector
    right: p5.Vector
    bottom: p5.Vector
}

export const bacteriaTypes = {
    'Ecoli': Ecoli,
    'Selongatus': Selongatus
}

export type BacteriaType = typeof bacteriaTypes[keyof typeof bacteriaTypes];
export type BacteriaName = keyof typeof bacteriaTypes;

export type BacteriaRecord = {
    [K in keyof typeof bacteriaTypes]: number
}