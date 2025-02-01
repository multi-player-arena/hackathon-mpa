import {usePlayer} from "../providers/PlayerContext.tsx";
import {useState} from "react";

export const avatarsMapping: Record<string, string> = {
    "absol": "/avatars/absol.png",
    "chansey": "https://github.com/multi-player-arena/hackathon-mpa/blob/main/frontend/src/assets/avatars/chansey.png?raw=true",
    "charizard": "https://github.com/multi-player-arena/hackathon-mpa/blob/main/frontend/src/assets/avatars/charizard.png?raw=true",
};

export function ChooseAvatarComponent() {
    const {player, setPlayer} = usePlayer();

    const [selectedAvatar, setSelectedAvatar] = useState<string>(player?.avatar || "blissey");

    const handleAvatarSelect = (avatarName: string) => {
        setSelectedAvatar(avatarName);
        if (player) {
            setPlayer({
                ...player,
                avatar: avatarName,
            });
        }
    };

    return (
        <div style={{display: "flex", gap: "20px"}}>
            {Object.entries(avatarsMapping).map(([name, path]) => (
                <img
                    key={name}
                    src={path}
                    alt={name}
                    width={64}
                    style={{
                        cursor: "pointer",
                        border: name === selectedAvatar ? "2px solid blue" : "none",
                        borderRadius: "8px",
                    }}
                    onClick={() => handleAvatarSelect(name)}
                />
            ))}
        </div>
    );
}
