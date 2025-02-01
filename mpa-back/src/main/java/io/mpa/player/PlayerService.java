package io.mpa.player;

import io.mpa.action.Action;
import io.mpa.ws.TestSocket;
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

    public Player addPlayer(String name, String avatar) {
        Player player = createPlayer(name, avatar);
        playerDao.addPlayer(player);
        testSocket.broadcastMessage(player);
        return player;
    }

    public void addAction(Action action) {
        testSocket.broadcastAction(action);
    }

    public void resetPlayers() {
        idIncrement = 0;
        playerDao.reset();
    }

    private Player createPlayer(String name, String avatar) {
        return new Player(idIncrement++, name, avatar);
    }

    public void startGame() {
        testSocket.broadcastStart();
    }

    public void stopAction(String playerId) {
        testSocket.stopAction(new StopAction(playerId));

    }
}
