package io.mpa.player;

import io.mpa.action.Action;
import io.mpa.action.ActionType;
import io.mpa.ws.TestSocket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/", produces = APPLICATION_JSON_VALUE)
public class PlayerController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlayerController.class);

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/player/{playerName}/avatar/{avatarName}")
    public Player addPlayer(@PathVariable String playerName, @PathVariable String avatarName) {
        return playerService.addPlayer(playerName, avatarName);
    }

    @PostMapping("/player/{playerId}/{action}")
    public void receiveAction(@PathVariable String playerId, @PathVariable ActionType action) {
        LOGGER.info("Player " + playerId + " send action: " + action);
        playerService.addAction(new Action(playerId, action, Instant.now()));
    }

    @PostMapping("/reset")
    public void resetPlayers() {
        playerService.resetPlayers();
    }
}
