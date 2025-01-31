import {useSocketService} from "../services/useSocketService.ts";
import {Player} from "../models/Player.ts";
import {usePlayersInGame} from "../providers/PlayersInGameContext.tsx";

export function PlayerListener() {
    const {players, addPlayer} = usePlayersInGame()
    useSocketService<Player>('/topic/player', player => addPlayer(player))


    return (
        // Parse message to Player object
        <div>Nombre players: {players.map(player =>
            <>{player.name}</>
        )}</div>
    )
}