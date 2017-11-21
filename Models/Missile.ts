import {MoveDirection, Location} from "./GameModels";
import {State} from "./AlphaBetaModels";
import {BoardTile} from "./GameModels";

export default class Missile {

    MoveDirection: MoveDirection;
    Location: Location;
    ExplosionRadius: number;

    constructor( MoveDirection: MoveDirection, Location: Location, ExplosionRadius: number ) {
        this.MoveDirection = MoveDirection;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

    shouldLocationCauseExplosion(location: Location, state: State) {
        if(state.Board[location.x][location.y] === BoardTile.Empty) {

        }
    }

    shouldExplode() {

    }

}