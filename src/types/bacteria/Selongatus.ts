import * as p5 from "p5";
import { Oval } from '../Shape';
import { Bacterium } from "./Bacterium";
import { coolPalette } from "../../constants/colors";

export class Selongatus extends Bacterium {
    static color: string = coolPalette.mint

    constructor(
        p: p5, location: p5.Vector
    ) {
        super(
            p,
            0.9,
            {
                input: {
                    'CO2': 6,
                    'Water': 6,
                    
                },
                output: {
                    'Glucose': 1,
                    'Oxygen': 6,
                }
            },
            400,
            300,
            new Oval(p, p.createVector(7, 5)),
            location,
            4000,
            600,
        )
    }

    public mitose(): Selongatus {
        return new Selongatus(
            this.p,
            this._veryCloseLocation(),
        );
    }
}