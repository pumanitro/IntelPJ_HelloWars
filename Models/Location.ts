import {MoveDirection} from "./GameModels";

export class Location {
    x: number;
    y: number;

    constructor(locationString: string){
        let splitLocation = locationString.split(', ');

        this.x = Number(splitLocation[0]);
        this.y = Number(splitLocation[1]);
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