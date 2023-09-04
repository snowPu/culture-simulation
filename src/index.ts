import * as p5 from 'p5';
import './styles.scss';
import { Ecoli } from './types/bacteria/Ecoli';
import { Bacterium } from './types/bacteria/Bacterium';
import { Environment } from './types/Environment';
import { Selongatus } from './types/bacteria/Selongatus';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/geometry';
import { Shop } from './types/Shop';
import { BacteriaRecord, NutrientsRecord } from './types/types';
import { shopContainer, statsContainer } from './constants/uiElements';


export const sketch = (p: p5) => {
    // let bacteria: Bacterium[] = []
  let mode = 'shopping'
    let environment: Environment
    let canvas: p5.Renderer
    let shop: Shop = new Shop((bacteriaCart: BacteriaRecord, nutrientsCart: NutrientsRecord) => {
      environment = new Environment(
        	p,
        	bacteriaCart,
        	nutrientsCart,
      )
      mode = 'simulating'
      shopContainer.style.display = 'none'
      statsContainer.style.display = 'flex'
      canvas.show()
    })
    let nutrients: NutrientsRecord = {
      'Glucose': 200,
      'Oxygen': 800,
      'Water': 50,
      'CO2': 50,
    }
    let bacteria: BacteriaRecord = {
      Ecoli: 2,
      Selongatus: 1,
    }


    
    p.setup = () => {
        statsContainer.style.display = 'none'
        canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.parent('canvas-container');
        if (mode === 'simulating') {
          // environment = new Environment(
          // 	p,
          // 	bacteria,
          // 	nutrients,
          // )
          environment.drawStats()
        } else {
          canvas.hide()
        }
    }

    p.draw = () => {
      if (mode === 'simulating') {
        environment.draw()
        environment.updateChart()
      }
    }
}

export const myp5 = new p5(sketch, document.body);