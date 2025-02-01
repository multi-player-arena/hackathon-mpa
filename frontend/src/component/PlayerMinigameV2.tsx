import {useSocketService} from "../services/useSocketService.ts";
import {Action, ActionsEnum, Player} from "../models/Player.ts";
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

const GAMESIZE_WIDTH = 1400
const GAMESIZE_HEIGHT = 600

const BLOCK_HEIGHT = GAMESIZE_WIDTH/150
const BLOCK_WEIGHT = GAMESIZE_WIDTH/30

export function PlayerMinigameV2() {
    const [started, setStarted] = useState<boolean>(false)
    const [infos, setInfos] = useState<Infos[]>([])
    const [winner, setWinner] = useState<Player | undefined>(undefined)
    const winZone: Wall = {x: 650, y: 500, width: 200, height: GAMESIZE_HEIGHT}

    const wallsLobby: Wall[] = [{x: 0, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: GAMESIZE_WIDTH - 1, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: 0, y: 0, width: GAMESIZE_WIDTH, height: 1},
        {x: 0, y: GAMESIZE_HEIGHT - 1, width: GAMESIZE_WIDTH, height: 1}]

    const walls: Wall[] = [{x: 0, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: GAMESIZE_WIDTH - 1, y: 0, width: 1, height: GAMESIZE_HEIGHT},
        {x: 0, y: 0, width: GAMESIZE_WIDTH, height: 1},
        {x: 0, y: GAMESIZE_HEIGHT - 1, width: GAMESIZE_WIDTH, height: 1},
        {x: 50, y: 50, width: 100, height: 20},
        {x: 200, y: 50, width: 20, height: 100},
        {x: 300, y: 50, width: 100, height: 20},
        {x: 400, y: 100, width: 20, height: 100},
        {x: 500, y: 150, width: 100, height: 20},
        {x: 600, y: 150, width: 20, height: 100},
        {x: 700, y: 200, width: 100, height: 20},
        {x: 50, y: 250, width: 100, height: 20},
        {x: 150, y: 250, width: 20, height: 100},
        {x: 250, y: 250, width: 100, height: 20},
        {x: 350, y: 300, width: 20, height: 100},
        {x: 450, y: 300, width: 100, height: 20},
        {x: 550, y: 350, width: 20, height: 100},
        {x: 650, y: 350, width: 100, height: 20},
        {x: 750, y: 400, width: 20, height: 100},
        {x: 100, y: 450, width: 100, height: 20},
        {x: 200, y: 450, width: 20, height: 100},
        {x: 300, y: 450, width: 100, height: 20},
        {x: 400, y: 500, width: 20, height: 100},
        {x: 500, y: 500, width: 100, height: 20},
        {x: 600, y: 550, width: 20, height: 100},
        {x: 700, y: 550, width: 100, height: 20},
        {x: 50, y: 600, width: 100, height: 20},
        {x: 150, y: 600, width: 20, height: 100},
        {x: 250, y: 600, width: 100, height: 20},
        {x: 350, y: 50, width: 20, height: 100},
        {x: 450, y: 50, width: 100, height: 20},
        {x: 550, y: 100, width: 20, height: 100},
        {x: 650, y: 100, width: 100, height: 20},
        {x: 750, y: 150, width: 20, height: 100},
        {x: 100, y: 200, width: 100, height: 20},
        {x: 200, y: 200, width: 20, height: 100},
        {x: 300, y: 200, width: 100, height: 20},
        {x: 400, y: 250, width: 20, height: 100},
        {x: 500, y: 250, width: 100, height: 20},
        {x: 600, y: 300, width: 20, height: 100},
        {x: 700, y: 300, width: 100, height: 20},
        {x: 100, y: 350, width: 100, height: 20},
        {x: 200, y: 350, width: 20, height: 100},
        {x: 300, y: 350, width: 100, height: 20},
        {x: 400, y: 400, width: 20, height: 100},
        {x: 500, y: 400, width: 100, height: 20},
        {x: 600, y: 450, width: 20, height: 100},
        {x: 700, y: 450, width: 100, height: 20},
        {x: 50, y: 500, width: 100, height: 20},
        {x: 150, y: 500, width: 20, height: 100},
        {x: 250, y: 500, width: 100, height: 20},
        {x: 350, y: 550, width: 20, height: 100},
        {x: 450, y: 550, width: 100, height: 20},
        {x: 550, y: 600, width: 20, height: 100},
        {x: 650, y: 600, width: 100, height: 20},
        // Add more walls to reach 200 walls...
        {x: 150, y: 50, width: 20, height: 100},
        {x: 200, y: 150, width: 100, height: 20},
        {x: 250, y: 200, width: 20, height: 100},
        {x: 300, y: 300, width: 100, height: 20},
        {x: 350, y: 350, width: 20, height: 100},
        {x: 400, y: 400, width: 100, height: 20},
        {x: 450, y: 450, width: 20, height: 100},
        {x: 500, y: 500, width: 100, height: 20},
        {x: 550, y: 550, width: 20, height: 100},
        {x: 600, y: 600, width: 100, height: 20},
        // More walls here until 200 total


    ];

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
        console.log('player', player);
        console.log(avatarsMapping[player.avatar])
        setInfos(prevState => [...prevState, {player: player, x: 100, y: 100}]);

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

        const oldInfo = infos.filter(info => info.player.id == action.playerId)[0]

        const nextPosition = getNextPositionInfo(oldInfo, action.actionType)

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
        return walls.some(wall => (
            newPos.x + 10 > wall.x && // Right collision
            newPos.x < wall.x + wall.width + 10 && // Left collision
            newPos.y + 15 > wall.y && // Bottom collision
            newPos.y < wall.y + wall.height + 15 // Top collision
        ));
    };


    const resetGame = () => {
        setInfos(infos => {
            return infos.map(info => ({
                player: info.player, x: 100, y: 100
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
                                    fill: 'black',
                                    align: 'center',
                                }}
                            />
                            <Sprite
                                image="https://pixijs.io/pixi-react/img/bunny.png"
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
                                        fill: 'black',
                                        align: 'center',
                                    }}
                                />
                                <Sprite
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