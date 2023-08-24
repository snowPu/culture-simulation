import * as p5 from "p5";
import { Oval } from '../Shape';
import { Bacterium } from "./Bacterium";
import { coolPalette } from "../../constants/colors";

export class Ecoli extends Bacterium {
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
            p.color(coolPalette.midnightBlue),
            3000,
        )
    }

    public mitose(): Ecoli {
        return new Ecoli(
            this.p,
            this._veryCloseLocation(),
        );
    }
}