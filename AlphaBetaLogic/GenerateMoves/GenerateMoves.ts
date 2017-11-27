import {State} from "../../Models/AlphaBetaModels";

export function generateMoves(actualState: State) {
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
    }

    return nextPossibleStates
}