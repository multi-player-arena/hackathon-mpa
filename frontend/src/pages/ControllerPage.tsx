import {ActionsEnum} from "../models/Player.ts";
import {usePlayer} from "../providers/PlayerContext.tsx";
import {useEffect, useState} from "react";
import {usePlayerService} from "../services/usePlayerService.ts";
import {useNavigate} from "react-router-dom";

export function ControllerPage() {

    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const {player} = usePlayer();
    const {actionPlayer} = usePlayerService();
    const navigate = useNavigate();

    useEffect(() => {
        if (!player) {
            navigate("/join");
        }
    }, [player, navigate]);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
        };

        window.addEventListener("resize", checkOrientation);
        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    function sendAction(action: ActionsEnum) {
        actionPlayer(player!.id, action).catch((error) => console.error(error));
    }

    if (!player) {
        return;
    }

    if (isPortrait) {
        console.log('Portrait mode');
        return (
            <div>
                <h1>{player.name}</h1>
                <p>🔄 Veuillez tourner votre téléphone en mode paysage 🔄</p>
            </div>
        )
    }

    return (
        <div>
            <h1>{player.name}</h1>
            <div>
                <button onClick={() => sendAction(ActionsEnum.UP)}>▲</button>
                <button onClick={() => sendAction(ActionsEnum.LEFT)}>◀</button>
                <button onClick={() => sendAction(ActionsEnum.RIGHT)}>▶</button>
                <button onClick={() => sendAction(ActionsEnum.DOWN)}>▼</button>
            </div>
            <div>
                <button onClick={() => sendAction(ActionsEnum.A)}>A</button>
                <button onClick={() => sendAction(ActionsEnum.B)}>B</button>
            </div>
        </div>
    )
}