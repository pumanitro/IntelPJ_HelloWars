import {Location} from "../Location";
import {MockedGameState} from "../MockState";
import {Explodable} from "./Explodable";
import {BoardTile} from "../GameModels";

let mockState = MockedGameState;

describe('explode', () => {

    it('should return Set of affected location for 1 range Bomb with clear surroundings', () => {

        let explodable = new Explodable(1, new Location("1, 1"));

        let expectedOutput = new Set();

        expectedOutput.add(new Location("1, 1"));
        expectedOutput.add(new Location("0, 1"));
        expectedOutput.add(new Location("2, 1"));
        expectedOutput.add(new Location("1, 0"));
        expectedOutput.add(new Location("1, 2"));

        mockState.Board[0][1] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[2][1] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        let explodedFields = explodable.explode(mockState);

        for(let location of expectedOutput) {
            expect(explodedFields.has(location)).toBe(true);
        }

        console.log(expectedOutput);
        console.log(explodedFields);

    });


});