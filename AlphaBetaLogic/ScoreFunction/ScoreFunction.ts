import {State} from "../../Models/AlphaBetaModels";

import aStar = require('a-star-search');
import {BoardTile} from "../../Models/GameModels";

export function generateBlockedLocation(state: State) {

    let blockedLocations = [];

    state.Board.forEach((row, x) => {

        row.forEach( (tileType, y) => {
            if(tileType !== BoardTile.Empty)
                blockedLocations.push({xAxis: x, yAxis: y})
        });

    });

    return blockedLocations;
}

export function scoreFunction(state: State , scoreCallback ) {

    let startLocation = {
      xAxis: state.BotLocation.x,
      yAxis: state.BotLocation.y
    };

    let destination = {
      xAxis: state.OpponentLocations[0].x,
      yAxis: state.OpponentLocations[0].y
    };

    let environment = {
        blockedLocations: generateBlockedLocation(state),
        worldSize: {xAxis: state.GameConfig.MapWidth, yAxis: state.GameConfig.MapHeight}
    };

    let aStarResponse = aStar.run(startLocation, destination, environment);

    scoreCallback( aStarResponse[aStarResponse.length-1].fCost);
}