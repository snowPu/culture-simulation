import * as p5 from 'p5';
import { Shape } from '../Shape';
import { step } from '../../util';
import { MetabolicPathway } from '../types';


export class Bacterium {
    p: p5
    motility: number
    metabolicPathway: MetabolicPathway
    // splits per time unit
    shape: Shape
    splitAt: number
    consumeAt: number
    location: p5.Vector
    velocity: p5.Vector
    rotation: number
    age: number
    lifeExpectancy: number
    starvationLimit: number
    starvingTime: number
    starving: boolean

    static color: string = '#000000'

    constructor(
        p: p5,
        motility: number,  // 0-1
        metabolicPathway: MetabolicPathway,
        splitAt: number,
        consumeAt: number,
        shape: Shape,
        location: p5.Vector,
        lifeExpectancy: number,
        starvationLimit: number
    ) {
        this.p = p
        this.motility = motility
        this.metabolicPathway = metabolicPathway
        this.splitAt = splitAt
        this.consumeAt = consumeAt
        this.shape = shape
        this.location = location
        this.velocity = p.createVector(0, 0)
        this.rotation = 0
        this.age = 0
        this.lifeExpectancy = lifeExpectancy
        this.starvationLimit = starvationLimit
        this.starvingTime = 0
        this.starving = true
    }

    public mitose(): Bacterium {
        return new Bacterium(
            this.p,
            this.motility,
            this.metabolicPathway,
            this.splitAt,
            this.consumeAt,
            this.shape,
            this._veryCloseLocation(),
            this.lifeExpectancy,
            this.starvationLimit,
        )
    }

    public consume() {
        return this.age % this.consumeAt == 0
    }

    public starve() {
        this.starving = true
    }
    
    public unstarve() {
        this.starving = false
        this.starvingTime = 0
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

    protected _veryCloseLocation() {
        return this.p.createVector(this.location.x + step(), this.location.y + step())
    }

    public move() {
        let randomJitter = (Math.random() - 0.5) * this.motility
        this.location.x += this.velocity.x + randomJitter
        this.location.y += this.velocity.y + randomJitter
        this._rotate()
    }

    public draw() {
        this.age += 1
        this.p.push()
        this.p.noStroke()
        const type = <typeof Bacterium>this.constructor
        const color = this.p.color(type.color)
        color.setAlpha((1.0 - this.age / this.lifeExpectancy) * 255)
        this.p.fill(color)
        this.p.translate(this.location.x, this.location.y)
        this.p.rotate(this.rotation)
        this.shape.draw()
        this.p.pop()
        if (this.starving) {
            this.starvingTime += 1
        }
    }
}
