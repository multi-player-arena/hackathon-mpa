import {useSubscription} from "react-stomp-hooks";

export function useSocketService<T> (path: string, t: (value: T) => void) {

    useSubscription(path, (message) => {
        t(JSON.parse(message.body))
    });

}