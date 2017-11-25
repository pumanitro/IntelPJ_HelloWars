import {BattleFieldInfo, BoardTile} from "./GameModels";
import {Location} from "./Location";
import {Bomb} from './Explodable/Bomb/Bomb';
import Missile from './Explodable/Missile/Missile';

export class State {

    Board: Array<Array<BoardTile>>; //"Board": [[2,2,3],[0,0,1],[0,0,0]]
    BotLocation: Location; // ---converted--> for instance of BotLocation
    OpponentLocations: Array<Location>;
    Bombs: Array<Bomb>;
    Missiles: Array<Missile>;
    MapWidth: number;
    MapHeight: number;

    constructor(battleFieldInfo: BattleFieldInfo) {
        this.Board = battleFieldInfo.Board;
        this.BotLocation = battleFieldInfo.BotLocation;
        this.OpponentLocations = battleFieldInfo.OpponentLocations;
        this.Bombs = battleFieldInfo.Bombs;
        this.Missiles = battleFieldInfo.Missiles;
        this.MapWidth = battleFieldInfo.GameConfig.MapWidth;
        this.MapHeight = battleFieldInfo.GameConfig.MapHeight;
    }

}