import {BattleFieldInfo, BoardTile, IBomb, IMissile, Location} from "./GameModels";

export default class State {

    Board: Array<Array<BoardTile>>; //"Board": [[2,2,3],[0,0,1],[0,0,0]]
    BotLocation: Location; // ---converted--> for instance of BotLocation
    OpponentLocations: Array<Location>;
    Bombs: Array<IBomb>;
    Missiles: Array<IMissile>;

    constructor(battleFieldInfo: BattleFieldInfo) {
        this.Board = battleFieldInfo.Board;
        this.BotLocation = battleFieldInfo.BotLocation;
        this.OpponentLocations = battleFieldInfo.OpponentLocations;
        this.Bombs = battleFieldInfo.Bombs;
        this.Missiles = battleFieldInfo.Missiles;
    }

}