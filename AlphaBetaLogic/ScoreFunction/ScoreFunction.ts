import {State} from "../../Models/AlphaBetaModels";

export function scoreFunction(state: State , scoreCallback ) {

    let score = Math.sqrt(Math.pow((state.OpponentLocations[0].x - state.BotLocation.x), 2) + Math.pow((state.OpponentLocations[0].y - state.BotLocation.y), 2));

    scoreCallback( score );
}