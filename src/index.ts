import * as p5 from 'p5';
import './styles.scss';
import { Ecoli } from './types/bacteria/Ecoli';
import { Bacterium } from './types/bacteria/Bacterium';
import { Environment } from './types/Environment';
import { Selongatus } from './types/bacteria/Selongatus';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/geometry';


export const sketch = (p: p5) => {
    let bacteria: Bacterium[] = []
    let environment: Environment
    let nutrients: Nutrients = {
		'Glucose': 200,
		'Oxygen': 800,
		'Water': 50,
		'CO2': 50,
	}
    
    p.setup = () => {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        bacteria.push(new Ecoli(p, p.createVector(p.width / 2, p.height / 2)))
        bacteria.push(new Selongatus(p, p.createVector(p.width / 2.5, p.height / 2.5)))
        environment = new Environment(
          	p,
          	bacteria,
          	nutrients,
        )
		environment.drawStats()
    }

    p.draw = () => {
		environment.draw()
    environment.updateChart()
    }
}

export const myp5 = new p5(sketch, document.body);