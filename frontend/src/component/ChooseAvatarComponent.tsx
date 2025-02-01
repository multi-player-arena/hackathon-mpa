export function ChooseAvatarComponent() {
    const avatars = [
        "src/assets/avatars/chansey.png",
        "src/assets/avatars/absol.png",
        "src/assets/avatars/charizard.png",
    ];

    return (
        <div style={{display: "flex", gap: "20px"}}>
            {avatars.map((avatar) => (
                <img
                    key={avatar}
                    src={avatar}
                    alt={avatar}
                    width={64}
                />
            ))}
        </div>
    );
}
