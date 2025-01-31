package io.mpa;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/", produces = APPLICATION_JSON_VALUE)
public class Controller {

    private final PlayerService playerService;

    public Controller(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/players/{playerName}")
    public int addPlayer(@PathVariable String playerName) {
        return playerService.addPlayer(playerName);
    }
}
