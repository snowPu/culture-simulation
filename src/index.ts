import * as p5 from 'p5';
import { Bacterium, ecoli } from './types/Bacterium';

const canvasSize = [800, 800]

export const sketch = (p: p5) => {
    let bacteria: Bacterium[] = []

    p.setup = () => {
        console.log("Hi this is Nils")
        p.createCanvas(canvasSize[0], canvasSize[1]);
        bacteria.push(ecoli(p, p.createVector(p.width / 2, p.height / 2)))
    }

    p.draw = () => {
        p.background(100,100,100);
        bacteria.forEach(bacterium => bacterium.draw())
        bacteria.forEach(bacterium => bacterium.move())
        bacteria.forEach(bacterium => bacterium.updateVelocity())
        let prob1 = Math.random()
        if (prob1 < 0.05 && bacteria.length < 500) {
          for (const bacterium of bacteria) {
            let prob2 = Math.random()
            if (prob2 < 0.05) {
              bacteria.push(bacterium.mitose())
            }
          }
        }
    }
}

export const myp5 = new p5(sketch, document.body);