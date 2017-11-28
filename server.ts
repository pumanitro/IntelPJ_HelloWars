import {BattleFieldInfo} from "./Models/GameModels";
import {State} from "./Models/AlphaBetaModels";
import {scoreFunction} from "./AlphaBetaLogic/ScoreFunction/ScoreFunction";
import checkWinConditionsFunction from "./AlphaBetaLogic/CheckWinCondition/CheckWinCondition";
import {generateMovesFunction} from "./AlphaBetaLogic/GenerateMoves/GenerateMoves";
import {uniqueKeyFunction} from "./AlphaBetaLogic/UniqueKey/UniqueKey";

const express = require('express');
const app = express();

const AlphaBetaConstructor = require('alphabeta');

let bodyParser = require('body-parser');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/Info', (req, res) => res.send({
    "Name": "IntelPJ",
    "AvatarUrl": "http://localhost/img/avatar.jpg",
    "Description": "This is my description",
    "GameType": "TankBlaster"
}));

app.post('/PerformNextMove', (req, res) => {

    let battleFieldInfo = new BattleFieldInfo(req.body);

    let state = new State(battleFieldInfo);

    const config = {
        scoreFunction 		: scoreFunction,
        generateMoves		: generateMovesFunction,
        checkWinConditions 	: checkWinConditionsFunction,
        uniqueKey		: uniqueKeyFunction,
        state 			: state,
        depth 			: 3
    };

    const alphabeta = AlphaBetaConstructor( config );

    alphabeta.allSteps((result) => {

        //let direction = getRandomInt(0,3);
        //let action = getRandomInt(0,1);
        //let action = getRandomInt(0,2);
        //let action = getRandomInt(0,1) === 1 ? 2 : 0;

        res.send({
            "Direction": result.firstMove,
            "Action": 0,
            // "Action": getRandomInt(0,1) === 1 ? 2 : 0,
            "FireDirection": 0
        });
    });

});

app.listen(9970, () => console.log('IntelPJ is going to kick your as!'));