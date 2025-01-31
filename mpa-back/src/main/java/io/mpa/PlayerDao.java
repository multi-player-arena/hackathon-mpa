package io.mpa;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerDao {
    private List<String> players = new ArrayList<>();

    public PlayerDao() {
    }

    public List<String> getPlayers() {
        return players;
    }

    public int addPlayer(String player) {
        players.add(player);
        return players.size();
    }
}
