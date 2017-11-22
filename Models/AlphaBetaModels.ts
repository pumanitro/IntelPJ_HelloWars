import {BattleFieldInfo, BoardTile} from "./GameModels";
import {Location} from "./Location";
import Bomb from './Bomb';
import Missile from './Missile';

export class State {

    Board: Array<Array<BoardTile>>; //"Board": [[2,2,3],[0,0,1],[0,0,0]]
    BotLocation: Location; // ---converted--> for instance of BotLocation
    OpponentLocations: Array<Location>;
    Bombs: Array<Bomb>;
    Missiles: Array<Missile>;

    constructor(battleFieldInfo: BattleFieldInfo) {
        this.Board = battleFieldInfo.Board;
        this.BotLocation = battleFieldInfo.BotLocation;
        this.OpponentLocations = battleFieldInfo.OpponentLocations;
        this.Bombs = battleFieldInfo.Bombs;
        this.Missiles = battleFieldInfo.Missiles;
    }

}