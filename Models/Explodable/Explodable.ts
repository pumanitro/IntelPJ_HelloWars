import {State} from "../AlphaBetaModels";
import {Location} from "../Location";
import {BoardTile} from "../GameModels";

export class Explodable {

    ExplosionRadius: number;
    Location: Location;

    constructor(explosionRadius: number, location: Location) {
        this.ExplosionRadius = explosionRadius;
        this.Location = location;
    }

    explode(state: State) {

        let AffectedSet = new Set();

        AffectedSet.add(this.Location.generateKey());

        let locationWithoutChanges = {
            x: this.Location.x,
            y: this.Location.y
        };

        for(let direction = 0; direction <= 3; direction++) {
            for(let i = 1; i <= this.ExplosionRadius; i++) {

                this.Location.move(direction);

                // stop propagating of the explosion when
                // outOfTheBorder
                let isOutOfTheBorder = this.Location.checkIfIsOutOfTheBorder(state.MapWidth, state.MapHeight);
                if(isOutOfTheBorder)
                    break;

                // blocked by tile
                if(state.Board[this.Location.x][this.Location.y] !== BoardTile.Empty)
                    break;

                AffectedSet.add(this.Location.generateKey());
            }
            this.Location.x = locationWithoutChanges.x;
            this.Location.y = locationWithoutChanges.y;
        }

        return AffectedSet;
    };
}