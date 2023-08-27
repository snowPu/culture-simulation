import * as p5 from 'p5';
import { Bacterium } from './bacteria/Bacterium';
import { coolPalette, statsColors } from '../constants/colors';
import { PlotlyManager } from './PlotlyManager';


class NutrientLowException extends Error {
    constructor(nutrient: Nutrient) {
      super(`Nutrient ${nutrient} is low.`)
      this.name = 'NutrientLowException'
    }
}
  
export class Environment {
    p: p5
    bacteria: Bacterium[]
    nutrients: Nutrients
    plotlyManager: PlotlyManager

    constructor(
        p: p5,
        bacteria: Bacterium[],
        nutrients: Nutrients,
    ) {
        this.p = p
        this.bacteria = bacteria
        this.nutrients = nutrients
        this.plotlyManager = new PlotlyManager('chart', this.getBacteriaTypes())
    }

    addBacteria(bacteria: Bacterium[]) {
        this.bacteria.push(...bacteria)
        this.drawStats()
    }

    removeBacterium(idx: number) {
        this.bacteria.splice(idx, 1);
        this.drawStats()
    }

    getBacteriaTypes(): typeof Bacterium[] {
        return Array.from(new Set(
            this.bacteria.map(bacterium => <typeof Bacterium>bacterium.constructor)
        ))
    }

    addNutrient(nutrient: Nutrient, count: number) {
        if (!(nutrient in this.nutrients)) {
            this.nutrients[nutrient] = count
        } else {
            this.nutrients[nutrient] += count
        }
        this.drawStats()
    }

    removeNutrient(nutrient: Nutrient, count: number) {
        if (
            !(nutrient in this.nutrients) || 
            this.nutrients[nutrient] < count
        ) throw new NutrientLowException(nutrient)
        if (nutrient in this.nutrients && this.nutrients[nutrient] >= count) {
            this.nutrients[nutrient] -= count
        }
        this.drawStats()
    }

    drawStats() {
        setStatsCell('Bacteria', this.bacteria.length)
        Object.keys(this.nutrients).forEach((nutrient: Nutrient) => {
            setStatsCell(nutrient, this.nutrients[nutrient])
        })
    }

    updateChart() {
        if (this.p.frameCount % 60 === 0) {
            this.getBacteriaTypes().forEach(
                (bacteriumType) => this.plotlyManager.pushNewValue(
                    bacteriumType,
                    this.bacteria.filter(
                        bacterium => bacterium instanceof bacteriumType
                    ).length,
                )
            )
        }
    }

    draw() {
        this.p.background(coolPalette.blue);
        this.bacteria.forEach(bacterium => bacterium.draw())
        this.bacteria.forEach(bacterium => bacterium.move())
        this.bacteria.forEach(bacterium => bacterium.updateVelocity())

        let indices: number[] = []
        let idx: number = 0
        for (const bacterium of this.bacteria) {
            if (bacterium.age >= bacterium.lifeExpectancy) {
                indices.push(idx)
            }
            idx += 1
        }
        indices.reverse().forEach(index => this.removeBacterium(index))
        indices = []
        idx = 0
        for (const bacterium of this.bacteria) {
            if (bacterium.consume()) {
                try {
                    const input = bacterium.metabolicPathway.input
                    Object.keys(input).forEach(
                        (nutrient: Nutrient) => {
                            this.removeNutrient(nutrient, input[nutrient])
                        }
                    )
                    const output = bacterium.metabolicPathway.output
                    Object.keys(output).forEach(
                        (nutrient: Nutrient) => {
                            this.addNutrient(nutrient, output[nutrient])
                        }
                    )
                } catch(error) {
                    if (error instanceof NutrientLowException) {
                        console.log(error)
                        indices.push(idx)
                    }
                }
            }
            idx += 1
        }
        indices.reverse().forEach(index => this.removeBacterium(index))
        if (this.bacteria.length < 500) {
            const newBacteria: Bacterium[] = []
            for (const bacterium of this.bacteria) {
              if (this.p.frameCount % bacterium.splitAt == 0 ) {
                newBacteria.push(bacterium.mitose())
              }
            }
            this.addBacteria(newBacteria)
        }
    }
}


function addStatsCell(label: string, count: number) {
	let stats = document.getElementById('stats')
    const colors = statsColors[stats.childNodes.length % statsColors.length]
	
    const cell = document.createElement('div')
	cell.className = 'stats-cell';
    cell.style.background = colors.background
    
    const labelDiv = document.createElement('div')
    labelDiv.className = 'label'
    labelDiv.id = `label-${label}`
    labelDiv.innerHTML = label
    labelDiv.style.color = colors.label

	const countDiv = document.createElement('div')
    countDiv.className = 'count'
    countDiv.id = `count-${label}`
    countDiv.innerHTML = count.toString()
    countDiv.style.color = colors.count

    cell.appendChild(labelDiv)
    cell.appendChild(countDiv)
    
	stats.appendChild(cell)
}

function setStatsCell(label: string, count: number) {
	const cell = document.getElementById(`count-${label}`)
	if (cell) cell.innerHTML = count.toString()
    else addStatsCell(label, count)
}