import {State} from "../../Models/AlphaBetaModels";
import {Location} from "../../Models/Location";
import {Bomb} from "../../Models/Explodable/Bomb/Bomb";
import Missile from "../../Models/Explodable/Missile/Missile";

// A. Preparing explosion map.
export function firstExplosion(state: State, actualBombs: Array<Bomb>, actualMissiles: Array<Missile>) {

    let firstExplosionArray = [];

    actualBombs.forEach((bomb: Bomb, index) => {
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
    //return [...new Set(array)];
    return array.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
}

export function calcRecursivelyExplosionsArray(state: State, actualBombs: Array<Bomb>, actualMissiles: Array<Missile>, explosionArray: Array<String>) {

    let explodableAmount = 0;

    actualBombs.forEach((bomb, index) => {
       if(explosionArray.some((value) => { return value === bomb.Location.generateKey(); })){
           explosionArray = [...explosionArray, ...bomb.explode(state)];
           actualBombs.splice(index, 1);
           explodableAmount++;
       }
    });

    actualMissiles.forEach((missile, index) => {
        if (explosionArray.some(value => value === missile.Location.generateKey())) {
            explosionArray = [...explosionArray, ...missile.explode(state)];
            actualMissiles.concat(missile.explode(state));
            explodableAmount++;
        }
    });

    //Check state repetitions:
    let uniqueExplosionArray = makeArrayUnique(explosionArray);

    if(explodableAmount === 0)
        return uniqueExplosionArray;
    else
        return calcRecursivelyExplosionsArray(state, actualBombs, actualMissiles, uniqueExplosionArray);

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

    let finalExplosionArray = calcRecursivelyExplosionsArray(actualState, coppyOfBombs, coppyOfMissiles, explosionArray);

    let isOpponentOnTheExplosion = finalExplosionArray.some(value => actualState.OpponentLocations[0].generateKey() === value );
    let isBotOnTheExplosion = finalExplosionArray.some(value => actualState.BotLocation.generateKey() === value );

    return actualState.OpponentLocations.length === 1 && isOpponentOnTheExplosion && !isBotOnTheExplosion;

}