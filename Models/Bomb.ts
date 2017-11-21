import {Location} from './GameModels';

export default class Bomb {

    RoundsUntilExplodes: number;
    Location: Location;
    ExplosionRadius: number;

    constructor( RoundsUntilExplodes: number, Location: Location, ExplosionRadius: number ) {
        this.RoundsUntilExplodes = RoundsUntilExplodes;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

    shouldExplode(): boolean {
        return this.RoundsUntilExplodes === 0;
    }

}