const express = require('express');
const app = express();

const AlphaBetaConstructor = require('alphabeta');

let bodyParser = require('body-parser');

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

    const config = {
        scoreFunction 		: scoreFunction,
        generateMoves		: generateMovesFunction,
        checkWinConditions 	: checkWinConditionsFunction,
        uniqueKey		: uniqueKeyFunction,
        state 			: yourInitialStateObject,
        depth 			: 1
    };

    const alphabeta = AlphaBetaConstructor( config );

    res.send({
    "Direction": 1,
    "Action": 0,
    "FireDirection": 0
})});

app.listen(9970, () => console.log('IntelPJ is going to kick your as!'));