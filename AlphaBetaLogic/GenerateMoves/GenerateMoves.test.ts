import {generateMovesFunction} from './GenerateMoves';
import {EmptyBoard, MockedGameState} from "../../Models/MockState";
import {Location} from "../../Models/Location";

describe('generateMovesFunction', () => {

    let mockState = MockedGameState;

    it('should generate 4 states for basic one', () => {

        mockState.Board = EmptyBoard;

        mockState.BotLocation = new Location("1, 1");

        let states = generateMovesFunction(mockState);
        expect(states.length === 4).toBe(true);
    });
});
