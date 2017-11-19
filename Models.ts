export enum BoardTile {
    Empty = 0,
    Regular = 1,
    Fortified = 2,
    Indestructible = 3
}

export enum MoveDirection {
    Up = 0,
    Down = 1,
    Right = 2,
    Left = 3,
    Stay = null
}

export class Location {
    x: number;
    y: number;

    constructor(locationString: string){
        let splittedLocation = locationString.split(', ');

        this.x = Number(splittedLocation[0]);
        this.y = Number(splittedLocation[1]);
    }
}

export interface IBomb {
    RoundsUntilExplodes: number,
    Location: Location,
    ExplosionRadius: number
}

export interface IMissile {
    MoveDirection: MoveDirection;
    Location: Location;
    ExplosionRadius: number;
}

export interface IGameConfig {
    MapWidth: number;
    MapHeight: number;
    BombBlastRadius: number;
    MissileBlastRadius: number;
    RoundsBetweenMissiles: number;
    RoundsBeforeIncreasingBlastRadius: number;
    IsFastMissileModeEnabled: boolean;
}

export class BattleFieldInfo {

    RoundNumber: number; //"RoundNumber": 3,
    BotId: string;
    Board: Array<Array<BoardTile>>; //"Board": [[2,2,3],[0,0,1],[0,0,0]]
    BotLocation: Location; // ---converted--> for instance of BotLocation
    IsMissileAvailable: boolean;
    OpponentLocations: Array<Location>;
    Bombs: Array<IBomb>;
    Missiles: Array<IMissile>;
    GameConfig: IGameConfig;

    constructor(notPreparedBattleFieldInfo) {
        this.RoundNumber = notPreparedBattleFieldInfo.RoundNumber;
        this.BotId = notPreparedBattleFieldInfo.BotId;
        this.Board = notPreparedBattleFieldInfo.Board;
        this.BotLocation = new Location(notPreparedBattleFieldInfo.BotLocation);
        this.IsMissileAvailable = notPreparedBattleFieldInfo.IsMissileAvailableln;

        this.OpponentLocations = notPreparedBattleFieldInfo.OpponentLocations.map(location => new Location(location));
        this.Bombs = notPreparedBattleFieldInfo.Bombs;
        this.Missiles = notPreparedBattleFieldInfo.Missiles;
        this.GameConfig = notPreparedBattleFieldInfo.GameConfig;

    };
}

/*

{
    "RoundNumber": 3,
    "BotId": "a88454b0‐80ba‐4c10‐b162‐f1ca766f1e3f",
    "Board": [
    [
        2,
        2,
        3
    ],
    [
        0,
        0,
        1
    ],
    [
        0,
        0,
        0
    ]
],
    "BotLocation": "0, 0",
    "IsMissileAvailable": true,
    "OpponentLocations": [
    "1, 1"
],
    "Bombs": [
    {
        "RoundsUntilExplodes": 3,
        "Location": "0, 1",
        "ExplosionRadius": 2
    }
],
    "Missiles": [
    {
        "MoveDirection": 3,
        "Location": "1, 0",
        "ExplosionRadius": 2
    }
],
    "GameConfig": {
    "MapWidth": 20,
        "MapHeight": 20,
        "BombBlastRadius": 2,
        "MissileBlastRadius": 2,
        "RoundsBetweenMissiles": 5,
        "RoundsBeforeIncreasingBlastRadius": 70,
        "IsFastMissileModeEnabled": true
}
}*/
