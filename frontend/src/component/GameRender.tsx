import {PlayerMinigame} from "./PlayerMinigame.tsx";
export function GameRender() {
    return <div id='game-render-container'>
        <div id='qrcode-container'>
            <h2>🎮 You Wanna play? 🎮</h2>
            <img src={"qr-code.png"} id='qrcode'/>
        </div>
        <PlayerMinigame/>
    </div>
}