import {calcRecursivelyExplosionsArray} from './CheckWinCondition';
import {MockedGameState} from "../Models/MockState";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import {Location} from "../Models/Location";
import Missile from "../Models/Explodable/Missile/Missile";
import {MoveDirection} from "../Models/GameModels";

describe('calcRecursivelyExplosionsArray', () => {

    let mockState = MockedGameState;

    it('should return array of explosion without any possible chain reaction', () => {

        mockState.Bombs = [
            new Bomb(0, new Location("2, 0"), 1)
        ];

        mockState.Missiles = [
            new Missile(MoveDirection.Left, new Location("0, 2"), 1)
        ];

        let copyOfBombs = new Map();
        mockState.Bombs.forEach(bomb => {
            copyOfBombs.set(bomb.Location.generateKey(), new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
        });

        let copyOfMissiles = new Map();
        mockState.Missiles.forEach(missile => {
            copyOfMissiles.set(missile.Location.generateKey(), new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
        });

        let explosionArray = new Set();
        calcRecursivelyExplosionsArray(mockState, copyOfBombs, copyOfMissiles,  explosionArray);

        expect(explosionArray).toEqual([

        ]);
    });

    it('should return array of explosions after chain reaction.', () => {

    });

});