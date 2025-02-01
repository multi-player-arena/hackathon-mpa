export const avatarsMapping: Record<string, string> = {
    "absol": "avatars/absol.png",
    "charizard": "avatars/charizard.png",
    "steve": "avatars/steve.png",
    "king": "avatars/king.png",
    "chansey": "avatars/chansey.png",
    "subway": "avatars/subway.png",
    "mario": "avatars/mario.png",
    "cuphead": "avatars/cuphead.png",
    "knight": "avatars/knight.png",
    "cat": "avatars/cat.png",
};

interface ChooseAvatarComponentProps {
    selectedAvatar: string;
    handleAvatarSelect: (avatarName: string) => void;
}

export function ChooseAvatarComponent({selectedAvatar, handleAvatarSelect}: ChooseAvatarComponentProps) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: "20px",
        }}>
            {Object.entries(avatarsMapping).map(([name, path]) => (
                <img
                    key={name}
                    src={path}
                    alt={name}
                    width={64}
                    style={{
                        cursor: "pointer",
                        border: name === selectedAvatar ? "3px solid #ee0b6f" : "none",
                        borderRadius: "8px",
                    }}
                    onClick={() => handleAvatarSelect(name)}
                />
            ))}
        </div>
    );
}
