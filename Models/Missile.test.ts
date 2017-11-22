import {isSomeBombOnLocation} from "./Missile";
import {Location} from "./GameModels";
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