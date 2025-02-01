import {StompSessionProvider} from "react-stomp-hooks";
import {PlayersInGameProvider} from "../providers/PlayersInGameContext.tsx";
import {GameRender} from "../component/GameRender.tsx";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function GamePage() {

    return (
        <PlayersInGameProvider>
            <StompSessionProvider
                url={`${apiBaseUrl}/ws-endpoint`}>
                <GameRender/>

            </StompSessionProvider>
        </PlayersInGameProvider>
    )
}