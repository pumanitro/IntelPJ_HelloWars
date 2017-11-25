import {State} from "../AlphaBetaModels";
import {Location} from "../Location";

export class Explodable {

    ExplosionRadius: number;
    Location: Location;

    constructor(explosionRadius: number, location: Location) {
        this.ExplosionRadius = explosionRadius;
        this.Location = location;
    }

    explode(state: State) {

        let affectedArray = new Set();

        affectedArray.add(this.Location);

    };
}