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

    constructor(p: p5, motility: number, metabolicPathways: MetabolicPathway[], growthRate: number, size: p5.Vector, location: p5.Vector) {
        this.p = p
        this.motility = motility
        this.metabolicPathways = metabolicPathways
        this.growthRate = growthRate
        this.size = size
        this.location = location
        this.velocity = p.createVector(0, 0)
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
        let stepX = (Math.random() - 0.5) * .02
        let stepY = (Math.random() - 0.5) * .02
        this.velocity.x += Math.min(stepX, 1.0)
        this.velocity.y += Math.min(stepY, 1.0)
    }

    public move() {
        this.location.x += this.velocity.x
        this.location.y += this.velocity.y
    }

    public draw() {
        this.p.push()
        this.p.fill(200, 200, 200)
        this.p.ellipse(this.location.x, this.location.y, this.size.x, this.size.y)
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