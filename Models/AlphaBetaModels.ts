import {BattleFieldInfo, BoardTile, MoveDirection} from "./GameModels";
import {Location} from "./Location";
import {Bomb} from './Explodable/Bomb/Bomb';
import Missile from './Explodable/Missile/Missile';

export class State {

    Board: Array<Array<BoardTile>>; //"Board": [[2,2,3],[0,0,1],[0,0,0]]
    BotLocation: Location; // ---converted--> for instance of BotLocation
    OpponentLocations: Array<Location>;
    Bombs: Array<Bomb>;
    Missiles: Array<Missile>;
    GameConfig: {
        MapWidth: number,
        MapHeight: number,
    };
    isFirstPlayerTurn: boolean;
    shouldTick: boolean;
    firstMove: MoveDirection;

    constructor(battleFieldInfo: BattleFieldInfo | State) {
        this.Board = battleFieldInfo.Board.slice();
        this.BotLocation = new Location(battleFieldInfo.BotLocation.generateKey());
        this.OpponentLocations = [new Location(battleFieldInfo.OpponentLocations[0].generateKey())];
        this.Bombs = battleFieldInfo.Bombs.slice();
        this.Missiles = battleFieldInfo.Missiles.slice();

        this.GameConfig = {
            MapWidth: battleFieldInfo.GameConfig.MapWidth,
            MapHeight: battleFieldInfo.GameConfig.MapHeight
        };

        this.isFirstPlayerTurn = true;
        this.shouldTick = false;
        this.firstMove = -1;
    }

}