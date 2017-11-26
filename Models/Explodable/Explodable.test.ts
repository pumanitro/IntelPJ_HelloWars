import {Location} from "../Location";
import {MockedGameState} from "../MockState";
import {Explodable} from "./Explodable";
import {BoardTile} from "../GameModels";

let mockState = MockedGameState;

describe('explode', () => {

    function compareExplodedStates(explodable, expectedOutput, mockState) {
        let explodedFields: Set<string> = explodable.explode(mockState);

        //Checking existance of the elements:
        expectedOutput.forEach(locationString => {
            expect(explodedFields.has(locationString)).toBe(true);
        });

        //Checking amount of elements:
        expect(expectedOutput.size).toEqual(explodedFields.size);

        /*console.log(expectedOutput);
        console.log(explodedFields);*/
    }

    it('should return Set of affected location for 1 range Bomb with clear surroundings', () => {

        let explodable = new Explodable(1, new Location("1, 1"));

        let expectedOutput = new Set([
            "1, 1",

            "1, 0",
            "1, 2",
            "2, 1",
            "0, 1"
        ]);

        mockState.Board[0][1] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[2][1] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        compareExplodedStates(explodable, expectedOutput, mockState);

    });

    it('should return array of affected location for 2 range Bomb with clear surroundings and dont show exploded fields when they are out of board', () => {

        let explodable = new Explodable(2, new Location("2, 1"));

        let expectedOutput = new Set([
            "2, 1",

            "2, 0",
            "0, 1",
            "1, 1",
            "2, 2"
        ]);

        mockState.Board[0][0] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[0][2] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        compareExplodedStates(explodable, expectedOutput, mockState);


    });

    it('should return array of affected location for 2 range Bomb with blocked surroundings', () => {

        let explodable = new Explodable(2, new Location("1, 1"));

        let expectedOutput = new Set([
            "1, 1",
        ]);

        mockState.Board[0][0] = BoardTile.Empty;
        mockState.Board[2][0] = BoardTile.Empty;
        mockState.Board[0][2] = BoardTile.Empty;
        mockState.Board[2][2] = BoardTile.Empty;

        mockState.Board[1][0] = BoardTile.Indestructible;
        mockState.Board[0][1] = BoardTile.Fortified;
        mockState.Board[1][2] = BoardTile.Regular;
        mockState.Board[2][1] = BoardTile.Fortified;

        compareExplodedStates(explodable, expectedOutput, mockState);

    });

});