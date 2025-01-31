import {StompSessionProvider} from "react-stomp-hooks";
import {ChildComponent} from "../component/ChildComponent.tsx";
import {PublishComponent} from "../component/PublishComponent.tsx";

export function GamePage() {

    return (
        <StompSessionProvider
            url={'http://localhost:8080/ws-endpoint'}>

            <ChildComponent />
            <PublishComponent/>

        </StompSessionProvider>
    )
}