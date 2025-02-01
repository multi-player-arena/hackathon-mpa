import {ActionsEnum} from "../models/Player.ts";
import {usePlayer} from "../providers/PlayerContext.tsx";
import {useEffect, useState} from "react";
import {usePlayerService} from "../services/usePlayerService.ts";
import {useNavigate} from "react-router-dom";
import 'primeicons/primeicons.css';

export function ControllerPage() {

    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const {player} = usePlayer();
    const {actionPlayer, stopActionPlayer} = usePlayerService();
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

    function sendStopAction() {
        stopActionPlayer(player!.id)
    }

    if (!player) {
        return;
    }

    if (isPortrait) {
        return (
            <div>
                <h1>{player.name}</h1>
                <p>🔄 Veuillez tourner votre téléphone en mode paysage 🔄</p>
            </div>
        )
    }

    return (

        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "5rem",
        }}>
            <div className="button-grid">
                <button className="controlUp pi pi-caret-up"  onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.UP)}/>
                <button className="controlLeft pi pi-caret-left" onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.LEFT)}/>
                <button className="controlRight pi pi-caret-right" onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.RIGHT)}/>
                <button className="controlDown pi pi-caret-down" onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.DOWN)}/>
            </div>
            <div style={{
                alignItems: "center",
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                gap: "3rem"
            }}>
                <button className="actionButton" onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.A)}>A</button>
                <button className="actionButton" onMouseLeave={() => sendStopAction()} onMouseUp={() => sendStopAction()} onMouseDown={() => sendAction(ActionsEnum.B)}>B</button>
            </div>
        </div>
    )
}