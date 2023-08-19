type Nutrient = 'Glucose' | 'CO2' | 'Oxygen' | 'Water'


type Nutrients = Partial<Record<Nutrient, number>>

type MetabolicPathway = {
    input: Nutrients
    output: Nutrients
}

type ExtremePoints = {
    left: p5.Vector
    top: p5.Vector
    right: p5.Vector
    bottom: p5.Vector
}