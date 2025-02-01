package io.mpa.player;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerDao {
    private List<Player> players = new ArrayList<>();

    public PlayerDao() {
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void reset() {
        players = new ArrayList<>();
    }
}
