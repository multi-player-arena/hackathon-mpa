import {useSocketService} from "../services/useSocketService.ts";
import {Action, ActionsEnum, Player, StopAction} from "../models/Player.ts";
import {Fragment, useState} from "react";
import {Graphics, Sprite, Stage, Text} from "@pixi/react";
import {Dialog} from "primereact/dialog";
import {avatarsMapping} from "./ChooseAvatarComponent.tsx";

interface Infos {
    player: Player;
    x: number;
    y: number;
}


interface Wall {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Wall {
    x: number;
    y: number;
    width: number;
    height: number;
}

const GAMESIZE_WIDTH = 800
const GAMESIZE_HEIGHT = 600

const BLOCK_HEIGHT = GAMESIZE_HEIGHT / 20
const BLOCK_WIDTH = GAMESIZE_WIDTH / 33

export function PlayerMinigameV2() {
    const [started, setStarted] = useState<boolean>(false)
    const [infos, setInfos] = useState<Infos[]>([])

    const wallsLobby: Wall[] = [{x: 0, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: GAMESIZE_WIDTH - 1, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: 0, y: 0, width: GAMESIZE_WIDTH, height: 1},
        {x: 0, y: GAMESIZE_HEIGHT - 1, width: GAMESIZE_WIDTH, height: 1}]

    const [winner, setWinner] = useState<Player | undefined>(undefined)
    const winZone: Wall = {x: 31 * BLOCK_WIDTH, y: 19 * BLOCK_HEIGHT, width: 200, height: GAMESIZE_HEIGHT}


    const walls: Wall[] = [{x: 0, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: GAMESIZE_WIDTH - 1, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: 0, y: 0, width: GAMESIZE_WIDTH, height: 1},
        {x: 0, y: GAMESIZE_HEIGHT - 1, width: GAMESIZE_WIDTH, height: 1},
        // More walls here until 200 total
        {x: 32 * BLOCK_WIDTH, y: 3 * BLOCK_HEIGHT, width: BLOCK_WIDTH, height: 15 * BLOCK_HEIGHT},
        {x: 0, y: 3 * BLOCK_HEIGHT, width: BLOCK_WIDTH, height: 27 * BLOCK_HEIGHT},
        {x: 0, y: 19 * BLOCK_HEIGHT, width: BLOCK_WIDTH * 31, height: BLOCK_HEIGHT},
        //custom
        {x: 2 * BLOCK_WIDTH, y: 3 * BLOCK_HEIGHT, width: 11 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 14 * BLOCK_WIDTH, y: 3 * BLOCK_HEIGHT, width: 13 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 3 * BLOCK_HEIGHT, width: 8 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 4 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 4 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 5 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 5 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 14 * BLOCK_WIDTH, y: 5 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 5 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 5 * BLOCK_HEIGHT, width: 7 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 14 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 6 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 7 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 20 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 8 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 7 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 20 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 30 * BLOCK_WIDTH, y: 9 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},

        {x: 2 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 14 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 20 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 10 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},

        {x: 0 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 20 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 11 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},

        {x: 4 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 28 * BLOCK_WIDTH, y: 12 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},

        {x: 2 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 12 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 30 * BLOCK_WIDTH, y: 13 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},

        {x: 2 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 12 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 30 * BLOCK_WIDTH, y: 14 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 10 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 12 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 7 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 30 * BLOCK_WIDTH, y: 15 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 14 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 16 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 20 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 30 * BLOCK_WIDTH, y: 16 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 2 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 8 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 9 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 18 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 3 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 22 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 26 * BLOCK_WIDTH, y: 17 * BLOCK_HEIGHT, width: 5 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 4 * BLOCK_WIDTH, y: 18 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 6 * BLOCK_WIDTH, y: 18 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT},
        {x: 24 * BLOCK_WIDTH, y: 18 * BLOCK_HEIGHT, width: 1 * BLOCK_WIDTH, height: BLOCK_HEIGHT}
    ];

    const speed = 12
    const getNextPositionInfo: (info: Infos, action: ActionsEnum) => Infos = (info, action) => {

        switch (action) {
            case ActionsEnum.UP:
                return {
                    ...info,
                    y: info.y - speed
                };
            case ActionsEnum.DOWN:
                return {
                    ...info,
                    y: info.y + speed
                };
            case ActionsEnum.LEFT:
                return {
                    ...info,
                    x: info.x - speed
                }
            case ActionsEnum.RIGHT:
                return {
                    ...info,
                    x: info.x + speed
                }
            case ActionsEnum.A:
            case ActionsEnum.B:
                return info;
        }
    }

    useSocketService<Player>('/topic/player', player => {
        setInfos(prevState => [...prevState, {player: player, x: Math.floor(Math.random() * (750 - 50 + 1)) + 50, y: 50}]);
    })

    useSocketService<Player>('/topic/start', () => {
        resetGame()
        setStarted(true)
    })

    useSocketService<Action>('/topic/action', action => {
        if (winner) {
            return
        }
        const updatedInfos = infos.filter(info => info.player.id != action.playerId);

        console.log("updatedInfos",updatedInfos)
        const oldInfo = infos.filter(info => info.player.id == action.playerId)[0]
        console.log("oldInfo",oldInfo)

        const nextPosition = getNextPositionInfo(oldInfo, action.actionType)
        console.log("nextPosition",nextPosition)

        let info: Infos;
        if (started) {
            if (!checkCollision(nextPosition,walls)) {
                info = nextPosition
            } else {
                info = oldInfo
            }
        } else {
            if (!checkCollision(nextPosition,wallsLobby)) {
                info = nextPosition
            } else {
                info = oldInfo
            }

        }
        console.log("info",info)

        setInfos([...updatedInfos, info]);
        if (checkWin(info)) {
            setWinner(info.player)
        }

    })

    const checkWin = (newPos: { x: number; y: number }) => {
        return newPos.x + 10 > winZone.x && // Right collision
            newPos.x < winZone.x + winZone.width + 10 && // Left collision
            newPos.y + 15 > winZone.y && // Bottom collision
            newPos.y < winZone.y + winZone.height + 15 // Top collision

            ;
    };
    const checkCollision = (newPos: { x: number; y: number }, walls: Wall[]) => {
        const size = 4
        return walls.some(wall => (
            newPos.x + size > wall.x && // Right collision
            newPos.x < wall.x + wall.width + size && // Left collision
            newPos.y + size > wall.y && // Bottom collision
            newPos.y < wall.y + wall.height + size // Top collision
        ));
    };


    const resetGame = () => {
        setInfos(infos => {
            return infos.map(info => ({
                player: info.player, x: Math.floor(Math.random() * (750 - 50 + 1)) + 50, y: 50
            }))
        })
        setWinner(undefined)
    }

    return (
        <>
            <Dialog header="Victory!" visible={winner !== undefined} style={{width: '50vw'}} onHide={() => {
                if (!winner) return;
                resetGame();
            }}>
                <p className="m-0">
                    GG à {winner?.name}!
                </p>
            </Dialog>
            {!started && <Stage width={GAMESIZE_WIDTH} height={GAMESIZE_HEIGHT} options={{backgroundColor: 0x1099bb}}>
                {wallsLobby.map((wall, i) => (
                    <Graphics
                        key={i}
                        draw={(g) => {
                            g.clear();
                            g.beginFill(0x343434);
                            // g.beginFill(0xff0000);
                            g.drawRect(wall.x, wall.y, wall.width, wall.height);
                            g.endFill();
                        }}
                    />
                ))}
                {
                    infos.map(info => {
                        return <Fragment key={info.player.id}>
                            <Text
                                text={info.player.name}
                                x={info.x}
                                y={info.y - 30}
                                anchor={0.5} // Center the text horizontally
                                style={{
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fill: 'white',
                                    align: 'center',
                                }}
                            />
                            <Sprite
                                width={35}
                                height={35}
                                image={avatarsMapping[info.player.avatar]}
                                anchor={0.5}
                                x={info.x}
                                y={info.y}

                            /></Fragment>
                    })
                }
            </Stage>}
            {winner === undefined && started &&
                <Stage width={GAMESIZE_WIDTH} height={GAMESIZE_HEIGHT} options={{backgroundColor: 0x1099bb}}>

                    <Graphics
                        draw={(g) => {
                            g.clear();
                            g.beginFill(0x88ff33);
                            // g.beginFill(0xff0000);
                            g.drawRect(winZone.x, winZone.y, winZone.width, winZone.height);
                            g.endFill();
                        }}
                    />
                    {walls.map((wall, i) => (
                        <Graphics
                            key={i}
                            draw={(g) => {
                                g.clear();
                                g.beginFill(0x343434);
                                // g.beginFill(0xff0000);
                                g.drawRect(wall.x, wall.y, wall.width, wall.height);
                                g.endFill();
                            }}
                        />
                    ))}
                    {
                        infos.map(info => {
                            return <Fragment key={info.player.id}>
                                <Text
                                    text={info.player.name}
                                    x={info.x}
                                    y={info.y - 30}
                                    anchor={0.5} // Center the text horizontally
                                    style={{
                                        fontFamily: 'Arial',
                                        fontSize: 16,
                                        fill: 'white',
                                        align: 'center',
                                    }}
                                />
                                <Sprite
                                    width={35}
                                    height={35}
                                    image={avatarsMapping[info.player.avatar]}
                                    anchor={0.5}
                                    x={info.x}
                                    y={info.y}
                                /></Fragment>
                        })
                    }
                </Stage>
            }
        </>
    )
}