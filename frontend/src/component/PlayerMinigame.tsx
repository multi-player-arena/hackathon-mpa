import {useSocketService} from "../services/useSocketService.ts";
import {Action, ActionsEnum, Player} from "../models/Player.ts";
import {useState} from "react";
// import {grid} from "../models/Grid.ts";
import {grid} from "../models/GridTest.ts";

export interface Cell {
    type: 'VOID' | 'WALL' | 'PLAYER' | 'END!';
    playerId?: number;
}

const ROWS = 7;
const COLS = 14;
interface Infos {
    player: Player;
    positionX: number;
    positionY: number;
}


export function PlayerMinigame() {
    // const {players, getPlayer} = usePlayersInGame()
    const [infos, setInfos] = useState<Infos[]>([])


    const getInfo: (id: number) => (Infos) = (id: number) => {
        return infos.filter(info => info.player.id == id)[0]
    }

    useSocketService<Action>('/topic/action', action => {
        const oldInfo = getInfo(action.playerId)
        const newInfo = getNextInfo(oldInfo, action.actionType);
        console.log('newInfo', newInfo)
        if (isValidInfo(newInfo)) {
            testWin(newInfo)
            replaceInfos(oldInfo, newInfo)
        }
    })


    const getNextInfo: (info: Infos, action: ActionsEnum) => Infos = (info, action) => {

        console.log('getNextInfo', info)
        switch (action) {
            case ActionsEnum.UP:
                return {...info, positionX: info.positionX - 1}
            case ActionsEnum.DOWN:
                return {...info, positionX: info.positionX + 1}
            case ActionsEnum.LEFT:
                return {...info, positionY: info.positionY - 1}
            case ActionsEnum.RIGHT:
                return {...info, positionY: info.positionY + 1}
            case ActionsEnum.A:
            case ActionsEnum.B:
                return info
        }
    }

    const isValidInfo: (info: Infos) => boolean = info => {

        return info.positionX >= 0 && info.positionY >= 0
            && info.positionX < grid.length && info.positionY < grid[0].length
            && (grid[info.positionX][info.positionY].type === 'VOID' || grid[info.positionX][info.positionY].type === 'END!')
    }

    const testWin: (info: Infos) => void = info => {
        if (grid[info.positionX][info.positionY].type === 'END!') {
            console.log(info.player.name + "won")
        }
    }

    const replaceInfos: (oldInfo: Infos, newInfo: Infos) => void = (oldInfo, newInfo) => {
        const oldCell = grid[oldInfo.positionX][oldInfo.positionY]
        grid[oldInfo.positionX][oldInfo.positionY] = {...grid[newInfo.positionX][newInfo.positionY]}
        grid[newInfo.positionX][newInfo.positionY] = {...oldCell}

        const updatedInfos = infos.filter(info => info.player.id !== newInfo.player.id);

        setInfos([...updatedInfos, newInfo]);
    }

    const placeRandomlyPlayer: (player: Player) => void = (player) => {
        let i = Math.floor(Math.random() * (grid.length + 1));
        let j = Math.floor(Math.random() * (grid[0].length + 1));
        while (grid[i][j].type !== "VOID") {
            i = Math.floor(Math.random() * (grid.length + 1));
            j = Math.floor(Math.random() * (grid[0].length + 1));
        }
        grid[i][j].type = "PLAYER";
        grid[i][j].playerId = player.id;
        setInfos(prevInfo => [...prevInfo, {player: player, positionY: j, positionX: i}])
    }
    useSocketService<Player>('/topic/player', player => {
        placeRandomlyPlayer(player);
    })


    return (

        <table>
            {grid.map((row, i) => <tr key={i}>{row.map((cell, j) => <td
                key={i * row.length + j}
                className={cell.type}>{cell.type === 'PLAYER' ? cell.playerId : cell.type}</td>)}</tr>)}
        </table>
    )
}