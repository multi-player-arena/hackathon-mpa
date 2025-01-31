import {useStompClient} from "react-stomp-hooks";

export function PublishComponent () {
    const stompClient = useStompClient();

    const publishMessage = () => {
        if(stompClient) {
            stompClient.publish({destination: '/app/broadcast', body: 'Hello depuis le front'})
        }
    }
    return (
        <div onClick={publishMessage}> Send message </div>
    )
}
