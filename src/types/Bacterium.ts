import * as p5 from 'p5';
import { Oval, Shape } from './Shape';

export class Bacterium {
    p: p5
    motility: number
    metabolicPathways: MetabolicPathway[]
    // splits per time unit
    growthRate: number
    shape: Shape
    location: p5.Vector
    velocity: p5.Vector
    rotation: number

    constructor(
        p: p5,
        motility: number,
        metabolicPathways: MetabolicPathway[],
        growthRate: number,
        shape: Shape,
        location: p5.Vector
    ) {
        this.p = p
        this.motility = motility
        this.metabolicPathways = metabolicPathways
        this.growthRate = growthRate
        this.shape = shape
        this.location = location
        this.velocity = p.createVector(0, 0)
        this.rotation = 0
    }

    public mitose(): Bacterium {
        let step = (Math.random() - 0.5) * 0.5
        return new Bacterium(
            this.p,
            this.motility,
            this.metabolicPathways,
            this.growthRate,
            this.shape,
            this.p.createVector(this.location.x + step, this.location.y + step),
        )
    }

    public updateVelocity() {
        const {
            left,
            top,
            right,
            bottom,
        } = this.shape.getExtremePoints(this.location, this.rotation)
        if (
            top.x <= 0 ||
            right.x <= 0 ||
            bottom.x <= 0 ||
            left.x <= 0
        ) {
            this.location.x = Math.max(top.x, right.x, bottom.x, left.x)
            this.velocity.x *= -1
        }
        else if (
            top.x >= this.p.width ||
            right.x >= this.p.width ||
            bottom.x >= this.p.width ||
            left.x >= this.p.width
        ) {
            this.location.x = Math.min(top.x, right.x, bottom.x, left.x)
            this.velocity.x *= -1
        }
        else if (
            top.y <= 0 ||
            right.y <= 0 ||
            bottom.y <= 0 ||
            left.y <= 0
        ) {
            this.location.y = Math.max(top.y, right.y, bottom.y, left.y)
            this.velocity.y *= -1
        }
        else if (
            top.y >= this.p.height ||
            right.y >= this.p.height ||
            bottom.y >= this.p.height ||
            left.y >= this.p.height
        ) {
            this.location.y = Math.min(top.y, right.y, bottom.y, left.y)
            this.velocity.y *= -1
        }
        else {
            let stepX = (Math.random() - 0.5) * .05
            let stepY = (Math.random() - 0.5) * .05
            this.velocity.x += Math.min(stepX, 1.0)
            this.velocity.y += Math.min(stepY, 1.0)
        }
    }

    private _rotate() {
        this.rotation += this.p.random(-0.02, 0.02)
    }

    public move() {
        let randomJitter = (Math.random() - 0.5)
        this.location.x += this.velocity.x + randomJitter
        this.location.y += this.velocity.y + randomJitter
        this._rotate()
    }

    public draw() {
        this.p.push()
        this.p.fill(200, 200, 200)
        this.p.translate(this.location.x, this.location.y)
        this.p.rotate(this.rotation)
        this.shape.draw()
        this.p.pop()
    }
}

export const ecoli = (p: p5, location: p5.Vector) => new Bacterium(
    p,
    10,
    [{ input: ['Glucose', 'Oxygen'], output: ['CarbonDiOxide', 'Water'] }],
    5,
    new Oval(p, p.createVector(7, 5)),
    location,
)