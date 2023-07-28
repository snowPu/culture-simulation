type Nutrient = 'Glucose' | 'CarbonDiOxide' | 'Oxygen' | 'Water'

type MetabolicPathway = {
    input: Nutrient[]
    output: Nutrient[]
}