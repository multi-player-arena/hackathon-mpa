import {useSocketService} from "../services/useSocketService.ts";
import {Action} from "../models/Player.ts";
import {usePlayersInGame} from "../providers/PlayersInGameContext.tsx";

interface Cell {
    type: 'VOID' | 'WALL' | 'PLAYER';
    playerId?: number;
}

const grid: Cell[][] = [
    [
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'PLAYER', playerId: 3},
        {type: 'VOID'}
    ],
    [
        {type: 'VOID'},
        {type: 'PLAYER', playerId: 2},
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
        {type: 'PLAYER', playerId: 1},
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'}
    ],
    [
        {type: 'VOID'},
        {type: 'WALL'},
        {type: 'VOID'},
        {type: 'VOID', playerId: 0}
    ]
];

export function PlayerMinigame() {
    const {players} = usePlayersInGame()

    useSocketService<Action>('/topic/action', action => console.log(action))


    return (
        grid.flatMap(row => {
            return row.map(cell => {
                if (cell.type === 'PLAYER') {
                    return `P${players.filter(p => p.id === cell.playerId)[0]?.name ?? '0'}`;
                } else {
                    return cell.type[0];
                }
            }).join(' ');
        })).map(x => <><br/>{x}</>)
}