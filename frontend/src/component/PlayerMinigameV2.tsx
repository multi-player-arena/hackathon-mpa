import {useSocketService} from "../services/useSocketService.ts";
import {Action, ActionsEnum, Player} from "../models/Player.ts";
import {useState} from "react";
import {Graphics, Sprite, Stage} from "@pixi/react";

interface Infos {
    player: Player;
    x: number;
    y: number;
}


export function PlayerMinigameV2() {
    // const {players, getPlayer} = usePlayersInGame()
    const [infos, setInfos] = useState<Infos[]>([])

    const getNextPositionInfo: (info: Infos, action: ActionsEnum) => Infos = (info, action) => {
        switch (action) {
            case ActionsEnum.UP:
                return {
                    ...info,
                    y: info.y - 10
                };
            case ActionsEnum.DOWN:
                return {
                    ...info,
                    y: info.y + 10
                };
            case ActionsEnum.LEFT:
                return {
                    ...info,
                    x: info.x - 10
                }
            case ActionsEnum.RIGHT:
                return {
                    ...info,
                    x: info.x + 10
                }
            case ActionsEnum.A:
            case ActionsEnum.B:
                return info;
        }
    }

    useSocketService<Player>('/topic/player', player => {
        setInfos(prevState => [...prevState, {player: player, x: 100, y: 100}]);

    })

    useSocketService<Action>('/topic/action', action => {
        console.log('action', action)

        const updatedInfos = infos.filter(info => info.player.id != action.playerId);
        console.log('updatedInfos', updatedInfos)

        const oldInfo = infos.filter(info => info.player.id == action.playerId)[0]
        console.log('oldInfo', oldInfo)

        const nextPosition = getNextPositionInfo(oldInfo, action.actionType)
        console.log('nextPosition', nextPosition)

        let info: Infos;
        if (!checkCollision(nextPosition)) {
            info = nextPosition
        } else {
            info = oldInfo
        }

        setInfos([...updatedInfos, info]);


    })

    const walls = [
        { x: 300, y: 250, width: 100, height: 200 }, // Wall 1
        { x: 500, y: 100, width: 150, height: 50 },  // Wall 2
        { x: 100, y: 400, width: 200, height: 50 },  // Wall 3
    ];
    const checkCollision = (newPos: { x: number; y: number }) => {
        return walls.some(wall => (
            newPos.x + 10 > wall.x && // Right collision
            newPos.x < wall.x + wall.width + 10 && // Left collision
            newPos.y + 15 > wall.y && // Bottom collision
            newPos.y < wall.y + wall.height + 15 // Top collision
        ));
    };



    return (
        <Stage width={800} height={600} options={{backgroundColor: 0x1099bb}}>
            {
                infos.map(info => {
                    return <Sprite key={info.player.id}
                                   image="https://pixijs.io/pixi-react/img/bunny.png"
                                   anchor={0.5}
                                   x={info.x}
                                   y={info.y}

                    />
                })
            }

            {walls.map((wall) => (
                <Graphics
                    key={wall.x * 100 + wall.y}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(0xff0000); // Red color
                        g.drawRect(wall.x, wall.y, wall.width, wall.height);
                        g.endFill();
                    }}
                />
            ))}
        </Stage>
    )
}