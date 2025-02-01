import {MockButton} from "./MockButton.tsx";
import {PlayerMinigameV2} from "./PlayerMinigameV2.tsx";
// import {usePlayersInGame} from "../providers/PlayersInGameContext.tsx";
// import {useSocketService} from "../services/useSocketService.ts";
// import {Player} from "../models/Player.ts";

export function GameRenderV2() {
    // const {players, addPlayer} = usePlayersInGame()
    //
    // useSocketService<Player>('/topic/player', player => addPlayer(player))

    return <div id='game-render-container'>
        <div id='qrcode-container'>
            <h2>🎮 You Wanna play? 🎮</h2>
            <img src={"qr-code.png"} id='qrcode'/>
        </div>
        <PlayerMinigameV2/>
    </div>
}