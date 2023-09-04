import { ExtremePoints } from "./types";

export interface Shape {
    p: p5
    /*
    * Returns the four extreme points of a shape.
    */
    getExtremePoints(location: p5.Vector, rotation: number): ExtremePoints;

    /* 
    * Draws the shape.
    */
    draw(): void;
}

export class Oval implements Shape {
    p: p5
    radius: p5.Vector

    constructor(p: p5, radius: p5.Vector) {
        this.p = p
        this.radius = radius
    }

    public getExtremePoints(location: p5.Vector, rotation: number): ExtremePoints {
        const left = this.p.createVector(
            location.x + this.radius.y * Math.sin(rotation),
            location.y - this.radius.y * Math.cos(rotation),
        )
        const top = this.p.createVector(
            location.x + this.radius.x * Math.cos(rotation),
            location.y + this.radius.x * Math.sin(rotation),
        )
        const right = this.p.createVector(
            location.x - this.radius.y * Math.sin(rotation),
            location.y + this.radius.y * Math.cos(rotation),
        )
        const bottom = this.p.createVector(
            location.x - this.radius.x * Math.cos(rotation),
            location.y - this.radius.x * Math.sin(rotation),
        )
        return {
            left,
            top,
            right,
            bottom,
        }
    }
    public draw() {
        this.p.ellipse(0, 0, this.radius.x * 2, this.radius.y * 2)
    }
}