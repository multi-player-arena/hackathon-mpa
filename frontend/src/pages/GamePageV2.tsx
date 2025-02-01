import {StompSessionProvider} from "react-stomp-hooks";
import {PlayersInGameProvider} from "../providers/PlayersInGameContext.tsx";
import {GameRenderV2} from "../component/GameRenderV2.tsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function GamePageV2() {

    return (
        <PlayersInGameProvider>
            <StompSessionProvider
                url={`${apiBaseUrl}/ws-endpoint`}>
                <GameRenderV2/>

            </StompSessionProvider>
        </PlayersInGameProvider>
    )
}