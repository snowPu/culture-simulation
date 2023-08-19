import * as p5 from 'p5';
import './styles.scss';
import { Bacterium, ecoli } from './types/Bacterium';
import { Environment } from './types/Environment';

const canvasSize = [800, 800]

export const sketch = (p: p5) => {
    let bacteria: Bacterium[] = []
    let environment: Environment
    let nutrients: Nutrients = {
		'Glucose': 200,
		'Oxygen': 800,
		'Water': 50
	}
    
    p.setup = () => {
        p.createCanvas(canvasSize[0], canvasSize[1]);
        bacteria.push(ecoli(p, p.createVector(p.width / 2, p.height / 2)))
        environment = new Environment(
          p,
          bacteria,
          nutrients,
        )
		environment.drawStats()
    }

    p.draw = () => {
		environment.draw()
    }
}

export const myp5 = new p5(sketch, document.body);