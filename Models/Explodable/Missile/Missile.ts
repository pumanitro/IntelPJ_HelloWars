import {MoveDirection} from "../../GameModels";
import {Location} from "../../Location";
import {State} from "../../AlphaBetaModels";
import {BoardTile} from "../../GameModels";
import {Explodable} from "../Explodable";

export function isSomeBombOnLocation(location: Location, state: State) {
    return state.Bombs.some((bomb) => { return (bomb.Location.x === location.x && bomb.Location.y === location.y)});
}

export function isSomeMissileOnLocation(location: Location, state: State) {
    return state.Missiles.some((missile) => { return (missile.Location.x === location.x && missile.Location.y === location.y)});
}

export default class Missile extends Explodable {

    MoveDirection: MoveDirection;

    constructor( MoveDirection: MoveDirection, Location: Location, ExplosionRadius: number ) {
        super(ExplosionRadius, Location);

        this.MoveDirection = MoveDirection;
    }

    shouldLocationCauseExplosion(state: State) {

        let isBombOnTheWay = isSomeBombOnLocation(this.Location, state);
        let isMissileOnTheWay = isSomeMissileOnLocation(this.Location, state);
        let isTileOccupied = state.Board[this.Location.x][this.Location.y] !== BoardTile.Empty;

        return isTileOccupied || isBombOnTheWay || isMissileOnTheWay;
    }

    shouldExplode(state: State) {

        //todo : Check the if isTHeFastMissileMode on or off !
        //...

        this.Location.move(this.MoveDirection);

        if(this.Location.checkIfIsOutOfTheBorder(state.GameConfig.MapWidth, state.GameConfig.MapHeight)){
            this.Location.moveBackwards(this.MoveDirection);
            return true;
        }


        let shouldMissileExplode = this.shouldLocationCauseExplosion(state);
        this.Location.moveBackwards(this.MoveDirection);

        return shouldMissileExplode;

    }

    tick() {
        this.Location.move(this.MoveDirection);
    }

}