import {State} from "../../Models/AlphaBetaModels";
import {BoardTile} from "../../Models/GameModels";
import {Location} from "../../Models/Location";

export function generateMovesFunction(actualState: State) {
    let nextPossibleStates = [];

    //forNow only moves :
    if(actualState.shouldTick) {

        //tick missiles :
        actualState.Missiles.forEach((missile, index) => {
            if(missile.shouldExplode(actualState)) {
                actualState.Missiles.splice(index, 1);
            }
            else {
                missile.tick();
            }
        });

        //tick bombs :
        actualState.Bombs.forEach((bomb, index) => {
            if(bomb.shouldExplode()) {
                actualState.Bombs.splice(index, 1);
            }
            else {
                bomb.tick();
            }
        });

        // Todo: change BoardTile type after explosions.
    }

    for(let direction = 0; direction <= 3; direction++) {
        let copyOfState = new State(actualState);

        let tempLocation = new Location(copyOfState.BotLocation.generateKey());
        tempLocation.move(direction);

        let isOutOfTheBorder = tempLocation.checkIfIsOutOfTheBorder(actualState.GameConfig.MapWidth, actualState.GameConfig.MapHeight);

        if(!isOutOfTheBorder && copyOfState.Board[tempLocation.x][tempLocation.y] === BoardTile.Empty){
            copyOfState.BotLocation.move(direction);
            copyOfState.isFirstPlayerTurn = !copyOfState.isFirstPlayerTurn;

            if(copyOfState.shouldTick === false && !copyOfState.isFirstPlayerTurn)
                copyOfState.shouldTick = true;

            if(copyOfState.firstMove === -1)
                copyOfState.firstMove = direction;

            nextPossibleStates.push(copyOfState);

        }

    }

    return nextPossibleStates;
}