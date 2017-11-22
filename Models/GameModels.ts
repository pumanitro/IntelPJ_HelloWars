import Bomb from './Bomb';
import Missile from './Missile';
import {Location} from "./Location";

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
    mapTest;

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

        //console.warn(this.Missiles2.get('blu').Location.x);
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

