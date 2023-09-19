import * as p5 from 'p5';
import './styles.scss';
import { Environment } from './types/Environment';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/geometry';
import { Shop } from './types/Shop';
import { BacteriaRecord, NutrientsRecord } from './types/types';
import { shopContainer, statsContainer } from './constants/uiElements';


export const sketch = (p: p5) => {
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
    
    p.setup = () => {
        statsContainer.style.display = 'none'
        canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.parent('canvas-container');
        if (mode === 'simulating') {
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