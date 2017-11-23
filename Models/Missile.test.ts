import {isSomeBombOnLocation, default as Missile, isSomeMissileOnLocation} from "./Missile";
import {BoardTile, MoveDirection} from "./GameModels";
import {Location} from "./Location";
import Bomb from "./Bomb";
import {State} from "./AlphaBetaModels";
import {MockedBattleFieldInfo} from "./MockState";

let mockState  = new State(MockedBattleFieldInfo);

describe('isSomeBombOnLocation', () => {

    mockState.Bombs.push(new Bomb(
        1,
        new Location('9, 9'),
        2
    ));

    it('should return true if there is a bomb in a given state on given location', () => {
        expect(isSomeBombOnLocation(new Location('9, 9'), mockState)).toBe(true);
    });

    it("should return false if there isn't a bomb in a given state on given location", () => {
        expect(isSomeBombOnLocation(new Location('5, 5'), mockState)).toBe(false);
    });

});

describe('isSomeMissileOnLocation', () => {

    mockState.Missiles.push(new Missile(
        MoveDirection.Up,
        new Location('3, 3'),
        2
    ));

    it('should return true if there is a missile in a given state on given location', () => {
        expect(isSomeMissileOnLocation(new Location('3, 3'), mockState)).toBe(true);
    });

    it('should return false if there is a missile in a given state on given location', () => {
        expect(isSomeMissileOnLocation(new Location('9, 9'), mockState)).toBe(false);
    });
});

describe('shouldExplode', () => {

    let missile = new Missile(MoveDirection.Up, new Location("2, 2"), 1);

    it('return true if missile will be on the Regular Tile on the next round.', () => {

        mockState.Board[2][1] = BoardTile.Regular;

        expect(missile.shouldExplode(mockState)).toBe(true);
    });

    it('return true if the missile will reach edge of the map in the next turn', () => {

    });
});