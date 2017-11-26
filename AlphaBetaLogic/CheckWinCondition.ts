import {State} from "../Models/AlphaBetaModels";
import {Location} from "../Models/Location";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import Missile from "../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function calcRecursivelyExplosionsArray(state: State, actualBombs: Set<Bomb>, actualMissiles: Set<Missile>, explosionsArray: Array<Location>) {
    for(let bomb of actualBombs) {
        if(bomb.shouldExplode()) {
            explosionsArray.concat(bomb.explode(state));
            actualBombs.delete(bomb.Location.generateKey());
        }
    }

    for(let missile of actualMissiles) {
        if(missile.shouldExplode(state)) {
            explosionsArray.concat(missile.explode(state));
            actualBombs.delete(missile.Location.generateKey());
        }
    }

    // After whole recurencion Get rid of repiting Location :
}

export default function checkWinConditionsFunction(actualState: State ) {

    let coppyOfBombs = new Set();
    actualState.Bombs.forEach(bomb => {
        coppyOfBombs.add(bomb.Location.generateKey(), new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
    });

    let coppyOfMissiles = new Set();
    actualState.Missiles.forEach(missile => {
        coppyOfBombs.add(missile.Location.generateKey(), new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
    });

    let explosionArray = [];

    calcRecursivelyExplosionsArray(actualState, coppyOfBombs, coppyOfMissiles,  explosionArray);

}