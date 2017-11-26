import {State} from "../Models/AlphaBetaModels";
import {Location} from "../Models/Location";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import Missile from "../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function firstExplosion(state: State, actualBombs: Array<Bomb>, actualMissiles: Array<Missile>) {

    let firstExplosionArray = [];

    actualBombs.forEach((bomb, index) => {
        if(bomb.shouldExplode()) {
            firstExplosionArray = [...firstExplosionArray, ...bomb.explode(state)];
            actualBombs.splice(index, 1);
        }
    });

    actualMissiles.forEach((missile, index) => {
        if(missile.shouldExplode(state)) {
            firstExplosionArray = [...firstExplosionArray, ...missile.explode(state)];
            actualBombs.splice(index, 1);
        }
    });

    // After whole recurencion Get rid of repiting Location :
    return firstExplosionArray;
}

function makeArrayUnique(array) {
    return Array.from(new Set(array));
}

export function calcRecursivelyExplosionsArray(state: State, actualBombs: Array<Bomb>, actualMissiles: Array<Missile>, explosionArray: Array<String>) {

    let explodableAmount = 0;

    actualBombs.forEach((bomb, index) => {
       if(explosionArray.some((value) => { return value === bomb.Location.generateKey(); })){
           explosionArray.concat(bomb.explode(state));
           actualBombs.splice(index, 1);
           explodableAmount++;
       }
    });

    actualMissiles.forEach((missile, index) => {
        if (explosionArray.some(value => value === missile.Location.generateKey())) {
            explosionArray.concat(missile.explode(state));
            actualMissiles.concat(missile.explode(state));
            explodableAmount++;
        }
    });

    //Check state repetitions:
    makeArrayUnique(explosionArray);

    if(explodableAmount === 0)
        return explosionArray;
    else
        calcRecursivelyExplosionsArray(state, actualBombs, actualMissiles, explosionArray);

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

    let explosionArray = firstExplosion(actualState, coppyOfBombs, coppyOfMissiles);

    calcRecursivelyExplosionsArray(actualState, coppyOfBombs, coppyOfMissiles, explosionArray);

}