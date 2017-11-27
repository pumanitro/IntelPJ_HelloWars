import {
    calcRecursivelyExplosionsArray, default as checkWinConditionsFunction,
    firstExplosion
} from './CheckWinCondition';
import {BigEmptyBoard, EmptyBoard, MockedGameState} from "../Models/MockState";
import {Bomb} from "../Models/Explodable/Bomb/Bomb";
import {Location} from "../Models/Location";
import Missile from "../Models/Explodable/Missile/Missile";
import {BoardTile, MoveDirection} from "../Models/GameModels";

let mockState = MockedGameState;

describe('firstExplosion', () => {
    it('should return array of explosions after chain reaction.', () => {

        mockState.Bombs = [
            new Bomb(0, new Location("2, 0"), 1)
        ];

        mockState.Missiles = [
            new Missile(MoveDirection.Left, new Location("0, 2"), 1)
        ];

        mockState.Board = EmptyBoard;

        let copyOfBombs = [];
        mockState.Bombs.forEach(bomb => {
            copyOfBombs.push(new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
        });

        let copyOfMissiles = [];
        mockState.Missiles.forEach(missile => {
            copyOfMissiles.push(new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
        });

        let expectedArray = [
            '2, 0',
            '2, 1',
            '1, 0',
            '0, 2',
            '0, 1',
            '1, 2'
        ];

        expect(firstExplosion(mockState, copyOfBombs, copyOfMissiles)).toEqual(expectedArray);

    });

    it('should return array of explosions without the same Locations', () => {

        mockState.Bombs = [
            new Bomb(0, new Location("0, 0"), 1),
            new Bomb(1, new Location("4, 5"), 2),
            new Bomb(0, new Location("5, 5"), 1)
        ];

        mockState.Missiles = [
            new Missile(MoveDirection.Left, new Location("4, 3"), 1)
        ];

        mockState.Board = BigEmptyBoard;

        mockState.MapHeight = 6;
        mockState.MapWidth = 6;

        let coppyOfBombs = [];
        mockState.Bombs.forEach(bomb => {
            coppyOfBombs.push(new Bomb(bomb.RoundsUntilExplodes, new Location(bomb.Location.generateKey()), bomb.ExplosionRadius));
        });

        let coppyOfMissiles = [];
        mockState.Missiles.forEach(missile => {
            coppyOfBombs.push(new Missile(missile.MoveDirection, new Location(missile.Location.generateKey()), missile.ExplosionRadius));
        });

        let explosionArray = firstExplosion(mockState, coppyOfBombs, coppyOfMissiles);

        let finalExplosionArray = calcRecursivelyExplosionsArray(mockState, coppyOfBombs, coppyOfMissiles, explosionArray);

        let expectedArray = [
            '0, 0',
            '0, 1',
            '1, 0',
            '5, 5',
            '5, 4',
            '4, 5',
            '4, 4',
            '4, 3',
            '3, 5',
            '2, 5',
            '4, 2',
            '5, 3',
            '3, 3'
        ];

        expect(finalExplosionArray).toEqual(expectedArray);

    });
});

describe('checkWinConditionsFunction', () => {
   it('should return true if last opponent is on the explosionField', () => {
       mockState.Board = EmptyBoard;

       mockState.BotLocation = new Location("0, 2");
       mockState.OpponentLocations = [new Location("2, 0")];

       mockState.Bombs = [
           new Bomb(0, new Location("1, 1"), 1),
           new Bomb(1, new Location("1, 0"), 1)
       ];

       mockState.Missiles = [];

       expect(checkWinConditionsFunction(mockState)).toBe(true);

   });

    it('should return false if last opponent is not on the explosionField, behind the wall', () => {
        mockState.Board = EmptyBoard;
        mockState.Board[2][1] = BoardTile.Fortified;

        mockState.BotLocation = new Location("0, 1");
        mockState.OpponentLocations = [new Location("2, 0")];

        mockState.Bombs = [
            new Bomb(0, new Location("2, 2"), 2)
        ];

        mockState.Missiles = [];

        expect(checkWinConditionsFunction(mockState)).toBe(false);

    });

    it('should return false if last opponent and Bot is on the explosionField.', () => {
        mockState.Board = EmptyBoard;

        mockState.BotLocation = new Location("0, 2");
        mockState.OpponentLocations = [new Location("2, 0")];

        mockState.Bombs = [
            new Bomb(0, new Location("2, 2"), 2)
        ];

        mockState.Missiles = [];

        expect(checkWinConditionsFunction(mockState)).toBe(false);

    });
});