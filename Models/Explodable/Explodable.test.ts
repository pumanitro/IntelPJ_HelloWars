import {Location} from "../Location";
import {EmptyBoard, MockedGameState} from "../MockState";
import {Explodable} from "./Explodable";
import {BoardTile, MoveDirection} from "../GameModels";
import Missile from "./Missile/Missile";

let mockState = MockedGameState;

describe('explode', () => {

    function compareExplodedStates(explodable, expectedOutput, mockState) {
        let explodedFields: Array<string> = explodable.explode(mockState);

        //Checking existance of the elements:
        expectedOutput.forEach(locationString => {

            let location = new Location(locationString);

            let theSameField = explodedFields.find(explodedFieldString => {

                let explodedField = new Location(explodedFieldString);

                return location.x === explodedField.x && location.y === explodedField.y;
            });
            expect(theSameField !== undefined).toBe(true);
        });

        //Checking amount of elements:
        expect(expectedOutput.length).toEqual(explodedFields.length);

        /*console.log(expectedOutput);
        console.log(explodedFields);*/
    }

    it('should return Set of affected location for 1 range Bomb with clear surroundings', () => {

        let explodable = new Explodable(1, new Location("1, 1"));

        let expectedOutput = [
            "1, 1",

            "1, 0",
            "1, 2",
            "2, 1",
            "0, 1"
        ];

        mockState.Board[0][1] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[2][1] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        compareExplodedStates(explodable, expectedOutput, mockState);

    });

    it('should return array of affected location for 2 range Bomb with clear surroundings and dont show exploded fields when they are out of board', () => {

        let explodable = new Explodable(2, new Location("2, 1"));

        let expectedOutput = [
            "2, 1",

            "2, 0",
            "0, 1",
            "1, 1",
            "2, 2"
        ];

        mockState.Board[0][0] = BoardTile.Empty;
        mockState.Board[1][0] = BoardTile.Empty;
        mockState.Board[0][2] = BoardTile.Empty;
        mockState.Board[1][2] = BoardTile.Empty;

        compareExplodedStates(explodable, expectedOutput, mockState);

    });

    it('should return array of affected location for 2 range Bomb with blocked surroundings', () => {

        let explodable = new Explodable(2, new Location("1, 1"));

        let expectedOutput = [
            "1, 1",
        ];

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

    it('missile test of explosion', () => {

        let explodable = new Missile(MoveDirection.Left, new Location("0, 2"), 1);

        let expectedOutput = [
            "0, 2",

            "0, 1",
            "1, 2"
        ];

       mockState.Board = EmptyBoard;

        compareExplodedStates(explodable, expectedOutput, mockState);

    });

});