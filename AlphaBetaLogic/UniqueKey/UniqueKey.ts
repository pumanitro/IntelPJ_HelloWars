import {State} from "../../Models/AlphaBetaModels";

export function uniqueKey(state: State) {
    let key = `${JSON.stringify(state.Board)} ${state.BotLocation.generateKey()} ${state.OpponentLocations[0].generateKey()}`;

    state.Bombs.forEach( bomb => {
       key += ` ${bomb.Location.generateKey()}`;
    });

    state.Missiles.forEach( missile => {
        key += ` ${missile.Location.generateKey()}`;
    });

}