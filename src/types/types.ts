type Nutrient = 'Glucose' | 'CarbonDiOxide' | 'Oxygen' | 'Water'

type MetabolicPathway = {
    input: Nutrient[]
    output: Nutrient[]
}

type ExtremePoints = {
    left: p5.Vector
    top: p5.Vector
    right: p5.Vector
    bottom: p5.Vector
}