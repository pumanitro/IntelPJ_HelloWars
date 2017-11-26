import {calcRecursivelyExplosionsArray} from './CheckWinCondition';
import {MockedGameState} from "../Models/MockState";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import {Location} from "../Models/Location";
import Missile from "../Models/Explodable/Missile/Missile";
import {MoveDirection} from "../Models/GameModels";

let mockState = MockedGameState;

describe('calcRecursivelyExplosionsArray', () => {
    it('should return array of explosions after chain reaction.', () => {

        mockState.Bombs = [
            new Bomb(0, new Location("2, 0"), 1)
        ];

        mockState.Missiles = [
            new Missile(MoveDirection.Left, new Location("0, 2"), 1)
        ];

        let copyOfBombs = [];
        mockState.Bombs.forEach(bomb => {
            copyOfBombs.push(new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
        });

        let copyOfMissiles = [];
        mockState.Missiles.forEach(missile => {
            copyOfMissiles.push(new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
        });

        let explosionArray = [];

        let expectedArray = [
            '2, 0',
            '2, 1',
            '1, 0'
        ];

        expect(calcRecursivelyExplosionsArray(mockState, copyOfBombs, copyOfMissiles,  explosionArray)).toEqual(expectedArray);

    });

    it('should return array of explosions without the same Locations', () => {

    });
});