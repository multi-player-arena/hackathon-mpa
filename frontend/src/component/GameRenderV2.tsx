import {MockButton} from "./MockButton.tsx";
import {PlayerMinigameV2} from "./PlayerMinigameV2.tsx";
// import {usePlayersInGame} from "../providers/PlayersInGameContext.tsx";
// import {useSocketService} from "../services/useSocketService.ts";
// import {Player} from "../models/Player.ts";

export function GameRenderV2() {
    // const {players, addPlayer} = usePlayersInGame()
    //
    // useSocketService<Player>('/topic/player', player => addPlayer(player))

    return <>
        <MockButton/>

        <PlayerMinigameV2/>
    </>
}