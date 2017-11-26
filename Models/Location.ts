import {MoveDirection} from "./GameModels";

export class Location {
    x: number;
    y: number;

    constructor(locationString: string){
        let splitLocation = locationString.split(', ');

        this.x = Number(splitLocation[0]);
        this.y = Number(splitLocation[1]);
    }

    generateKey() {
        return `${this.x}, ${this.y}`;
    }

    move(direction: MoveDirection) {

        switch(direction){
            case MoveDirection.Up:
                this.y--;
                break;
            case MoveDirection.Down:
                this.y++;
                break;
            case MoveDirection.Left:
                this.x--;
                break;
            case MoveDirection.Right:
                this.x++;
                break;
        }

    }

    /**
     *
     * @param mapMaxX
     * @param mapMaxY
     * @returns {boolean}
     */
    checkIfIsOutOfTheBorder(mapMaxX, mapMaxY) {

        let outOfTheMaxCorner = this.x >= mapMaxX || this.y >= mapMaxY;
        let outOfTheMinCorner = this.x < 0 || this.y < 0;

        return outOfTheMaxCorner || outOfTheMinCorner;
    }

    moveBackwards(direction: MoveDirection) {
        switch(direction){
            case MoveDirection.Up:
                this.y++;
                break;
            case MoveDirection.Down:
                this.y--;
                break;
            case MoveDirection.Left:
                this.x++;
                break;
            case MoveDirection.Right:
                this.x--;
                break;
        }
    }
}