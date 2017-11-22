import {isSomeBombOnLocation, default as Missile, isSomeMissileOnLocation} from "./Missile";
import {MoveDirection} from "./GameModels";
import {Location} from "./Location";
import Bomb from "./Bomb";
import {State} from "./AlphaBetaModels";
import {MockedBattleFieldInfo} from "./MockState";

let mockGameState  = new State(MockedBattleFieldInfo);

describe('isSomeBombOnLocation', () => {

    mockGameState.Bombs.push(new Bomb(
        1,
        new Location('9, 9'),
        2
    ));

    it('should return true if there is a bomb in a given state on given location', () => {
        expect(isSomeBombOnLocation(new Location('9, 9'), mockGameState)).toBe(true);
    });

    it("should return false if there isn't a bomb in a given state on given location", () => {
        expect(isSomeBombOnLocation(new Location('5, 5'), mockGameState)).toBe(false);
    });

});

describe('isSomeMissileOnLocation', () => {

    mockGameState.Missiles.push(new Missile(
        MoveDirection.Up,
        new Location('3, 3'),
        2
    ));

    it('should return true if there is a missile in a given state on given location', () => {
        expect(isSomeMissileOnLocation(new Location('3, 3'), mockGameState)).toBe(true);
    });

    it('should return false if there is a missile in a given state on given location', () => {
        expect(isSomeMissileOnLocation(new Location('9, 9'), mockGameState)).toBe(false);
    });
});