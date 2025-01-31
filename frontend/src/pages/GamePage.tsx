import {StompSessionProvider} from "react-stomp-hooks";
import {PlayerListener} from "../component/PlayerListener.tsx";
import {PublishComponent} from "../component/PublishComponent.tsx";
import {MockButton} from "../component/MockButton.tsx";
import {PlayersInGameProvider} from "../providers/PlayersInGameContext.tsx";

export function GamePage() {

    return (
        <StompSessionProvider
            url={'http://localhost:8080/ws-endpoint'}>
            <PlayersInGameProvider>
                <MockButton />
                <PlayerListener />
                <PublishComponent/>
            </PlayersInGameProvider>
        </StompSessionProvider>
    )
}