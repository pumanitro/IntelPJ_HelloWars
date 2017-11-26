import {State} from "../Models/AlphaBetaModels";
import {Location} from "../Models/Location";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import Missile from "../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function calcRecursivelyExplosionsArray(state: State, actualBombs: Array<Bomb>, actualMissiles: Array<Missile>, explosionsArray: Array<String>) {

    actualBombs.forEach((bomb, index) => {
        if(bomb.shouldExplode()) {
            explosionsArray = [...explosionsArray, ...bomb.explode(state)];
            actualBombs.splice(index, 1);
        }
    });

    actualMissiles.forEach((missile, index) => {
        if(missile.shouldExplode(state)) {
            explosionsArray = [...explosionsArray, ...missile.explode(state)];
            actualBombs.splice(index, 1);
        }
    });

    // After whole recurencion Get rid of repiting Location :
    return explosionsArray;
}

export default function checkWinConditionsFunction(actualState: State ) {

    let coppyOfBombs = [];
    actualState.Bombs.forEach(bomb => {
        coppyOfBombs.push(new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
    });

    let coppyOfMissiles = [];
    actualState.Missiles.forEach(missile => {
        coppyOfBombs.push(new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
    });

    let explosionArray = [];

    calcRecursivelyExplosionsArray(actualState, coppyOfBombs, coppyOfMissiles,  explosionArray);

}