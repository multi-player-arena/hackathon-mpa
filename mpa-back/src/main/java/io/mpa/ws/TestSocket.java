package io.mpa.ws;

import io.mpa.action.Action;
import io.mpa.player.Player;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class TestSocket {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestSocket.class);

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastMessage(@Payload Player message) {
        messagingTemplate.convertAndSend("/topic/reply", message);
    }

    public void broadcastAction(@Payload Action action) {
        messagingTemplate.convertAndSend("/topic/action", action);
    }
}
