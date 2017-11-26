import {State} from "../Models/AlphaBetaModels";
import {Location} from "../Models/Location";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import Missile from "../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function calcRecursivelyExplosionsArray(state: State, actualBombs: Set<Bomb>, actualMissiles: Set<Missile>, explosionsArray: Array<Location>) {
    for(let bomb of actualBombs) {
        if(bomb.shouldExplode()) {
            explosionsArray.concat(bomb.explode(state));
        }
    }

    for(let missile of actualMissiles) {
        if(missile.shouldExplode(state)) {
            explosionsArray.concat(missile.explode(state));
        }
    }

    // After whole recurencion Get rid of repiting Location :
}

export default function checkWinConditionsFunction(actualState: State ) {



}