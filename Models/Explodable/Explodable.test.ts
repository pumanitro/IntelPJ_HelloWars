import {Location} from "../Location";
import {MockedGameState} from "../MockState";
import {Explodable} from "./Explodable";
import {BoardTile} from "../GameModels";

let mockState = MockedGameState;

describe('explode', () => {

    it('should return array of affected location for 1 range Bomb with clear surroundings', () => {

        let explodable = new Explodable(1, new Location("1, 1"));

        let expectedOutput = [];

        expectedOutput.push(new Location("1, 1"));

        expectedOutput.push(new Location("1, 0"));
        expectedOutput.push(new Location("1, 2"));
        expectedOutput.push(new Location("2, 1"));
        expectedOutput.push(new Location("0, 1"));

        mockState.Board[0][1] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[2][1] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        let explodedFields: Array<Location> = explodable.explode(mockState);

        //Checking existance of the elements:
        expectedOutput.forEach(location => {
            let theSameField = explodedFields.find(explodedField => {
                return location.x === explodedField.x && location.y === explodedField.y;
            });
            expect(theSameField !== undefined).toBe(true);
        });

        //Checking amount of elements:
        expect(expectedOutput.length).toEqual(explodedFields.length);

    });

    it('should return array of affected location for 2 range Bomb with clear surroundings and dont show exploded fields when they are out of board', () => {

        let explodable = new Explodable(1, new Location("2, 1"));

        let expectedOutput = [];

        expectedOutput.push(new Location("2, 1"));

        expectedOutput.push(new Location("2, 0"));
        expectedOutput.push(new Location("0, 1"));
        expectedOutput.push(new Location("1, 1"));
        expectedOutput.push(new Location("2, 2"));

        mockState.Board[0][0] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[0][2] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        let explodedFields = explodable.explode(mockState);

        //Checking existance of the elements:
        expectedOutput.forEach(location => {
            let theSameField = explodedFields.find(explodedField => {
                return location.x === explodedField.x && location.y === explodedField.y;
            });
            expect(theSameField !== undefined).toBe(true);
        });

        //Checking amount of elements:
        expect(expectedOutput.length).toEqual(explodedFields.length);

        console.log(expectedOutput);
        console.log(explodedFields);

    });


});