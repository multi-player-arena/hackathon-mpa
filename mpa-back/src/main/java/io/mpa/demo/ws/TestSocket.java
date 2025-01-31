package io.mpa.demo.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TestSocket {
  private static final Logger LOGGER = LoggerFactory.getLogger(TestSocket.class);

    @MessageMapping("/broadcast")
    @SendTo("/topic/reply")
    public String broadcastMessage(@Payload String message) {
        LOGGER.info("Message received: {}",message);
        return "Hello depuis le back";
    }
}
