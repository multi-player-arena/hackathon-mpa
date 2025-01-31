package io.mpa.player;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    private final PlayerDao playerDao;
    private int idIncrement = 0;

    public PlayerService(PlayerDao playerDao) {
        this.playerDao = playerDao;
    }

    public Player addPlayer(String name) {
        Player player = createPlayer(name);
        playerDao.addPlayer(player);
        return player;
    }

    private Player createPlayer(String name) {
        return new Player(idIncrement++, name);
    }
}
