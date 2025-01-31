import {useState} from "react";
import {useSubscription} from "react-stomp-hooks";

export function  ChildComponent () {
    const [message, setMessage] = useState("");
    // Subscribe to the topic that we have opened in our spring boot app
    useSubscription('/topic/reply', (message) => {setMessage(message.body)});

    return (
        <div>Message reçu: "{message}"</div>
    )
}