import * as p5 from 'p5';

export class Bacterium {
    p: p5
    motility: number
    metabolicPathways: MetabolicPathway[]
    // splits per time unit
    growthRate: number
    size: p5.Vector
    location: p5.Vector
    velocity: p5.Vector
    rotation: number

    constructor(p: p5, motility: number, metabolicPathways: MetabolicPathway[], growthRate: number, size: p5.Vector, location: p5.Vector) {
        this.p = p
        this.motility = motility
        this.metabolicPathways = metabolicPathways
        this.growthRate = growthRate
        this.size = size
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
            this.size,
            this.p.createVector(this.location.x + step, this.location.y + step),
        )
    }

    public updateVelocity() {
        if (this.location.x <= this.size.x || this.location.x >= this.p.width - this.size.x) {
            this.velocity.x *= -1
        }
        else if (this.location.y <= this.size.y || this.location.y >= this.p.height - this.size.y) {
            this.velocity.y *= -1
        }
        else {
            let stepX = (Math.random() - 0.5) * .02
            let stepY = (Math.random() - 0.5) * .02
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
        this.p.ellipse(0, 0, this.size.x, this.size.y)
        this.p.pop()
    }
}

export const ecoli = (p: p5, location: p5.Vector) => new Bacterium(
    p,
    10,
    [{ input: ['Glucose', 'Oxygen'], output: ['CarbonDiOxide', 'Water'] }],
    5,
    p.createVector(15, 10),
    location,
)