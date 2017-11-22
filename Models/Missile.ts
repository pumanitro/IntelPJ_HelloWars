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

    shouldLocationCauseExplosion(location: Location, state: State) {

        let isBombOnTheWay = isSomeBombOnLocation(location, state);
        let isMissileOnTheWay = isSomeMissileOnLocation(location, state);

        return state.Board[location.x][location.y] === BoardTile.Empty && !isBombOnTheWay && !isMissileOnTheWay;
    }

    shouldExplode() {

    }

}