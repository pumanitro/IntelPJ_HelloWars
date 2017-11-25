import {Location} from "../../Location";
import {Explodable} from "../Explodable";

export class Bomb extends Explodable {

    RoundsUntilExplodes: number;

    constructor( RoundsUntilExplodes: number, Location: Location, ExplosionRadius: number ) {
        super(ExplosionRadius, Location);

        this.RoundsUntilExplodes = RoundsUntilExplodes;
    }

    shouldExplode(): boolean {
        return this.RoundsUntilExplodes === 0;
    }



}