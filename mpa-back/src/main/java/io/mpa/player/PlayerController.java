package io.mpa.player;

import io.mpa.action.Action;
import io.mpa.action.ActionType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/player/{playerId}")
    public void stopAction(@PathVariable String playerId) {
        LOGGER.info("Player " + playerId + " Stoped action: " );
        playerService.stopAction(playerId);
    }

    @PostMapping("/game/start")
    public void startGame() {
        playerService.startGame();
    }

    @PostMapping("/reset")
    public void resetPlayers() {
        playerService.resetPlayers();
    }
}
