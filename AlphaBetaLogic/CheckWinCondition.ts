import {State} from "../Models/AlphaBetaModels";
import {Location} from "../Models/Location";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import Missile from "../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function calcRecursivelyExplosionsArray(state: State, actualBombs: Map<String, Bomb>, actualMissiles: Map<String, Missile>, explosionsSet: Set<String>) {
    for(let bomb of actualBombs.values()) {
        if(bomb.shouldExplode()) {
            explosionsSet = new Set([...explosionsSet, ...bomb.explode(state)]);
            actualBombs.delete(bomb.Location.generateKey());
        }
    }

    for(let missile of actualMissiles.values()) {
        if(missile.shouldExplode(state)) {
            explosionsSet = new Set([...explosionsSet, ...missile.explode(state)]);
            actualMissiles.delete(missile.Location.generateKey());
        }
    }

}

export default function checkWinConditionsFunction(actualState: State ) {

    let coppyOfBombs = new Map();
    actualState.Bombs.forEach(bomb => {
        coppyOfBombs.set(bomb.Location.generateKey(), new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
    });

    let coppyOfMissiles = new Map();
    actualState.Missiles.forEach(missile => {
        coppyOfBombs.set(missile.Location.generateKey(), new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
    });

    let explosionArray = new Set();

    calcRecursivelyExplosionsArray(actualState, coppyOfBombs, coppyOfMissiles,  explosionArray);

}