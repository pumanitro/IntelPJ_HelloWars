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

        let locationWithoutChanges = {
            x: this.Location.x,
            y: this.Location.y
        };

        for(let direction = 0; direction <= 3; direction++) {
            for(let i = 1; i <= this.ExplosionRadius; i++) {
                //if not stop

                this.Location.move(direction);
                affectedArray.add(new Location(`${this.Location.x}, ${this.Location.y}`));
            }
            this.Location.x = locationWithoutChanges.x;
            this.Location.y = locationWithoutChanges.y;
        }

        return affectedArray;
    };
}