import {MoveDirection, Location} from "./GameModels";

export default class Missile {

    MoveDirection: MoveDirection;
    Location: Location;
    ExplosionRadius: number;

    constructor( MoveDirection: MoveDirection, Location: Location, ExplosionRadius: number ) {
        this.MoveDirection = MoveDirection;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

}