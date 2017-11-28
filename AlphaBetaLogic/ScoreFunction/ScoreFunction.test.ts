import {generateBlockedLocation} from "./ScoreFunction";
import {EmptyBoard, MockedGameState} from "../../Models/MockState";
import {BoardTile} from "../../Models/GameModels";

let mockState = MockedGameState;

describe('generateBlockedLocation', () => {

    it('should generate prepared array of blocked fields for A* algorithm', () => {
        mockState.Board = EmptyBoard;

        mockState.GameConfig.MapHeight = 3;
        mockState.GameConfig.MapWidth = 3;

        mockState.Board[2][2] = BoardTile.Fortified;
        mockState.Board[1][1] = BoardTile.Indestructible;
        mockState.Board[2][0] = BoardTile.Regular;

        expect(generateBlockedLocation(mockState)).toEqual([
            {xAxis: 1, yAxis: 1},
            {xAxis: 2, yAxis: 0},
            {xAxis: 2, yAxis: 2}
            ]);
    });
});