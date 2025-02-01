package io.mpa.ws;

import io.mpa.action.Action;
import io.mpa.player.Player;
import io.mpa.player.StopAction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class TestSocket {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestSocket.class);

    private final SimpMessagingTemplate messagingTemplate;

    public TestSocket(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void broadcastMessage(@Payload Player message) {
        messagingTemplate.convertAndSend("/topic/player", message);
    }

    public void broadcastAction(@Payload Action action) {
        messagingTemplate.convertAndSend("/topic/action", action);
    }

    public void broadcastStart() {
        messagingTemplate.convertAndSend("/topic/start","{}");
    }

    public void stopAction(StopAction stopAction) {
        messagingTemplate.convertAndSend("/topic/stop/action",stopAction);

    }
}
