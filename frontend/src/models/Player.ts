export interface Player {
    id: number;
    name: string;
    avatar: string;
}
export interface StopAction {
    playerId: number;
}


export enum ActionsEnum {
    UP ='UP',
    DOWN = 'DOWN',
    LEFT= 'LEFT',
    RIGHT = 'RIGHT',
    A ='A',
    B='B'
}

export interface Action {
    playerId: number,
    actionType: ActionsEnum
}