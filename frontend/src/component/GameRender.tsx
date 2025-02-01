import {MockButton} from "./MockButton.tsx";
import {PlayerMinigame} from "./PlayerMinigame.tsx";
import {PublishComponent} from "./PublishComponent.tsx";
import {usePlayersInGame} from "../providers/PlayersInGameContext.tsx";
import {useSocketService} from "../services/useSocketService.ts";
import {Player} from "../models/Player.ts";

export function GameRender() {
    const {players, addPlayer} = usePlayersInGame()

    useSocketService<Player>('/topic/player', player => addPlayer(player))

    return <>
        <MockButton/>

        <PlayerMinigame/>
        <PublishComponent/>
    </>
}