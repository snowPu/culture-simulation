import P5 from 'p5'

const sketch = (p) => {
// setup
  p.setup = () => {
    p.createCanvas(640, 380)
  }

// draw
  p.draw = () => {
    p.background(51)
    p.fill(128)
    p.ellipse(p.width/2, p.height/2, 120, 120)
  }
}

new P5(sketch)
