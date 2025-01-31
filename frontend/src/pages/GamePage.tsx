import {StompSessionProvider} from "react-stomp-hooks";
import {PlayerListener} from "../component/PlayerListener.tsx";
import {PublishComponent} from "../component/PublishComponent.tsx";

export function GamePage() {

    return (
        <StompSessionProvider
            url={'http://localhost:8080/ws-endpoint'}>

            <PlayerListener />
            <PublishComponent/>

        </StompSessionProvider>
    )
}