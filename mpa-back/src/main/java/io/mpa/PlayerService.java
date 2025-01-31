package io.mpa;

import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    private final PlayerDao playerDao;

    public PlayerService(PlayerDao playerDao) {
        this.playerDao = playerDao;
    }

    public int addPlayer(String name) {
        return playerDao.addPlayer(name);
    }
}
