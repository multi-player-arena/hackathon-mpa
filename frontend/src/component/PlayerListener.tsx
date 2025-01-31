import {useState} from "react";
import {useSubscription} from "react-stomp-hooks";
import {Player} from "../models/Player.ts";

export function  PlayerListener () {
    const [message, setMessage] = useState("");
    // Subscribe to the topic that we have opened in our spring boot app
    useSubscription('/topic/player', (message) => {setMessage(message.body)});

    return (
        // Parse message to Player object

        <div>Message reçu: "{message}"</div>
    )
}