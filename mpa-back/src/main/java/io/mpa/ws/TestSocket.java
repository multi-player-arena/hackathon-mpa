package io.mpa.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class TestSocket {
  private static final Logger LOGGER = LoggerFactory.getLogger(TestSocket.class);

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/broadcast")
    public void broadcastMessage(@Payload String message) {
        LOGGER.info("Message received: {}",message);
//        return "Hello depuis le back";
        messagingTemplate.convertAndSend("/topic/reply", "You have received a message: " + message);
    }
}
