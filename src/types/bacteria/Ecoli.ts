import * as p5 from "p5";
import { Oval } from '../Shape';
import { Bacterium } from "./Bacterium";
import { coolPalette } from "../../constants/colors";

export class Ecoli extends Bacterium {
    static color: string = coolPalette.midnightBlue

    constructor(
        p: p5, location: p5.Vector
    ) {
        super(
            p,
            0.9,
            {
                input: {
                    'Glucose': 1,
                    'Oxygen': 6,
                },
                output: {
                    'CO2': 6,
                    'Water': 6,
                }
            },
            300,
            200,
            new Oval(p, p.createVector(7, 5)),
            location,
            3000,
            500,
        )
    }

    public mitose(): Ecoli {
        return new Ecoli(
            this.p,
            this._veryCloseLocation(),
        );
    }
}