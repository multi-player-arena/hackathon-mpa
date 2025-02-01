package io.mpa.player;

import io.mpa.action.Action;
import io.mpa.ws.TestSocket;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    private final PlayerDao playerDao;
    private final TestSocket testSocket;
    private int idIncrement = 0;

    public PlayerService(PlayerDao playerDao, TestSocket testSocket) {
        this.playerDao = playerDao;
        this.testSocket = testSocket;
    }

    public Player addPlayer(String name) {
        Player player = createPlayer(name);
        playerDao.addPlayer(player);
        testSocket.broadcastMessage(player);
        return player;
    }

    public void addAction(Action action) {
        testSocket.broadcastAction(action);
    }

    public Player resetPlayers() {
        idIncrement = 0;
        playerDao.reset();
    }

    private Player createPlayer(String name) {
        return new Player(idIncrement++, name);
    }
}
