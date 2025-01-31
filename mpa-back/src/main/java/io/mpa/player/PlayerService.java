package io.mpa.player;

import io.mpa.ws.TestSocket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerDao playerDao;
    private final TestSocket testSocket;
    private int idIncrement = 0;

    public Player addPlayer(String name) {
        Player player = createPlayer(name);
        playerDao.addPlayer(player);
        testSocket.broadcastMessage(player);
        return player;
    }

    private Player createPlayer(String name) {
        return new Player(idIncrement++, name);
    }
}
