import * as p5 from 'p5';
import { Bacterium, ecoli } from './types/Bacterium';

const canvasSize = [800, 800]

export const sketch = (p: p5) => {
    let bacteria: Bacterium[] = []

    p.setup = () => {
        p.createCanvas(canvasSize[0], canvasSize[1]);
        bacteria.push(ecoli(p, p.createVector(p.width / 2, p.height / 2)))
    }

    p.draw = () => {
        p.background(100,100,100);
        bacteria.forEach(bacterium => bacterium.draw())
        bacteria.forEach(bacterium => bacterium.move())
        bacteria.forEach(bacterium => bacterium.updateVelocity())
        let prob1 = Math.random()
        if (bacteria.length < 500) {
          const newBacteria: Bacterium[] = []
          for (const bacterium of bacteria) {
            if (p.frameCount % bacterium.splitAt == 0 ) {
              newBacteria.push(bacterium.mitose())
            }
          }
          bacteria.push(...newBacteria)
        }
    }
}

export const myp5 = new p5(sketch, document.body);