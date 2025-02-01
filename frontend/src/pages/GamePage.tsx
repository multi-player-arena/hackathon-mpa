import {StompSessionProvider} from "react-stomp-hooks";
import {PlayersInGameProvider} from "../providers/PlayersInGameContext.tsx";
import {GameRender} from "../component/GameRender.tsx";

export function GamePage() {

    return (
        <PlayersInGameProvider>
            <StompSessionProvider
                url={'http://localhost:8080/ws-endpoint'}>
                <GameRender/>

            </StompSessionProvider>
        </PlayersInGameProvider>
    )
}