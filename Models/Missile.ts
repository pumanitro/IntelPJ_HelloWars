import {MoveDirection} from "./GameModels";
import {Location} from "./Location";
import {State} from "./AlphaBetaModels";
import {BoardTile} from "./GameModels";

export function isSomeBombOnLocation(location: Location, state: State) {
    return state.Bombs.some((bomb) => { return (bomb.Location.x === location.x && bomb.Location.y === location.y)});
}

export function isSomeMissileOnLocation(location: Location, state: State) {
    return state.Missiles.some((missile) => { return (missile.Location.x === location.x && missile.Location.y === location.y)});
}

export default class Missile {

    MoveDirection: MoveDirection;
    Location: Location;
    ExplosionRadius: number;

    constructor( MoveDirection: MoveDirection, Location: Location, ExplosionRadius: number ) {
        this.MoveDirection = MoveDirection;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

    shouldLocationCauseExplosion(state: State) {

        let isBombOnTheWay = isSomeBombOnLocation(this.Location, state);
        let isMissileOnTheWay = isSomeMissileOnLocation(this.Location, state);

        return state.Board[this.Location.x][this.Location.y] === BoardTile.Empty && !isBombOnTheWay && !isMissileOnTheWay;
    }

    shouldExplode(state: State) {

        this.Location.move(this.MoveDirection);
        this.shouldExplode(state);
        this.Location.moveBackwards(this.MoveDirection);

    }

}