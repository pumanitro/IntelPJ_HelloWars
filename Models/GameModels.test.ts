import { Location } from './GameModels';

describe('BotLocation', () => {
    it('Should set x, y property of the new class when contructed from a string for single and single position', () => {
        let botLocation = new Location("0, 1");
        expect(botLocation.x).toBe(0);
        expect(botLocation.y).toBe(1);
    });

    it('Should set x, y property of the new class when contructed from a string for double and double position', () => {
        let botLocation = new Location("12, 13");
        expect(botLocation.x).toBe(12);
        expect(botLocation.y).toBe(13);
    })
});