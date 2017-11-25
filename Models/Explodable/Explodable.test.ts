import {Location} from "../Location";
import {MockedGameState} from "../MockState";
import {Explodable} from "./Explodable";

let mockState = MockedGameState;

describe('explode', () => {

    let explodable = new Explodable(1, new Location("0, 0"));

    it('should return Set of affected location', () => {
        explodable.explode(mockState);
    });


});