import {useSocketService} from "../services/useSocketService.ts";
import {Action, ActionsEnum, Player} from "../models/Player.ts";
import {useState} from "react";

interface Cell {
    type: 'VOID' | 'WALL' | 'PLAYER';
    playerId?: number;
}

const grid: Cell[][] = [
    [
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'},
        {type: 'VOID'}
    ],
    [
        {type: 'VOID'},
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'}
    ],
    [
        {type: 'WALL'},
        {type: 'VOID'},
        {type: 'VOID'},
        {type: 'WALL'}
    ],
    [
        {type: 'VOID'},
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'}
    ],
    [
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'},
        {type: 'VOID'},
    ]
];

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
            //FIXME x2
            // && grid[info.positionX][info.positionY].type === 'VOID'
    }

    const replaceInfos: (oldInfo: Infos, newInfo: Infos) => void = (oldInfo, newInfo) => {
        const oldCell = grid[oldInfo.positionX][oldInfo.positionY]
        grid[oldInfo.positionX][oldInfo.positionY] = {...grid[newInfo.positionX][newInfo.positionY]}
        grid[newInfo.positionX][newInfo.positionY] = {...oldCell}

        const updatedInfos = infos.filter(info => info.player.id !== newInfo.player.id);

        setInfos([...updatedInfos, newInfo]);
    }


    useSocketService<Player>('/topic/player', player => {
        grid[2][2] = {type: "PLAYER", playerId: player.id}
        setInfos(prevInfo => [...prevInfo, {player: player, positionY: 2, positionX: 2}])

    })


    return (

        <table>
            {grid.map((row, i) => <tr key={i}>{row.map((cell, j) => <td
                key={i * row.length + j}>{cell.type === 'PLAYER' ? cell.playerId : cell.type}</td>)}</tr>)}
        </table>
    )
}