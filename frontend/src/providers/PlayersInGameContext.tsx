import {createContext, ReactNode, useContext, useState} from "react";
import {Player} from "../models/Player.ts";


interface PlayersInGameContextType {
    players: Player[];
    addPlayer: (player: Player) => void;
}

const PlayersInGameContext = createContext<PlayersInGameContextType | undefined>(undefined);

export function PlayersInGameProvider({children}: { children: ReactNode }) {
    const [players, setPlayers] = useState<Player[]>([]);

    // Function to add a player
    const addPlayer = (player:Player) => {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
    };

    return (
        <PlayersInGameContext.Provider value={{players, addPlayer}}>
            {children}
        </PlayersInGameContext.Provider>
    );
}

// Custom hook to use the context
export const usePlayersInGame = () => {
    const context = useContext(PlayersInGameContext);
    if (!context) {
        throw new Error("usePlayers must be used within a PlayerProvider");
    }
    return context;
};
