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

export class Bomb {

    RoundsUntilExplodes: number;
    Location: Location;
    ExplosionRadius: number;

    constructor( RoundsUntilExplodes: number, Location: Location, ExplosionRadius: number ) {
        this.RoundsUntilExplodes = RoundsUntilExplodes;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

}

export class Missile {

    MoveDirection: MoveDirection;
    Location: Location;
    ExplosionRadius: number;

    constructor( MoveDirection: MoveDirection, Location: Location, ExplosionRadius: number ) {
        this.MoveDirection = MoveDirection;
        this.Location = Location;
        this.ExplosionRadius = ExplosionRadius;
    }

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
    Bombs: Array<Bomb>;
    Missiles: Array<Missile>;
    GameConfig: IGameConfig;

    constructor(notPreparedBattleFieldInfo) {
        this.RoundNumber = notPreparedBattleFieldInfo.RoundNumber;
        this.BotId = notPreparedBattleFieldInfo.BotId;
        this.Board = notPreparedBattleFieldInfo.Board;
        this.BotLocation = new Location(notPreparedBattleFieldInfo.BotLocation);
        this.IsMissileAvailable = notPreparedBattleFieldInfo.IsMissileAvailableln;

        this.OpponentLocations = notPreparedBattleFieldInfo.OpponentLocations.map(location => new Location(location));
        this.Bombs = notPreparedBattleFieldInfo.Bombs.map(bomb => {

            return new Bomb(
                bomb.RoundsUntilExplodes,
                new Location(bomb.Location),
                bomb.ExplosionRadius
            );

        });

        this.Missiles = notPreparedBattleFieldInfo.Missiles.map(missile => {

            return new Missile(
                missile.MoveDirection,
                new Location(missile.Location),
                missile.ExplosionRadius
            );

        });

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
