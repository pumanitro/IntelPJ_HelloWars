const express = require('express');
const app = express();

app.get('/Info', (req, res) => res.send({
    "Name": "IntelPJ",
    "AvatarUrl": "http://localhost/img/avatar.jpg",
    "Description": "This is my description",
    "GameType": "TankBlaster"
}));

app.post('/PerformNextMove', (req, res) => res.send({
    "Direction": 1,
    "Action": 0,
    "FireDirection": 0
}));

app.listen(9970, () => console.log('IntelPJ is going to kick your as!'));