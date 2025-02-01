import {Cell} from "../component/PlayerMinigame.tsx";

export const grid: Cell[][] =
    [
        [{type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'},],
        [{type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'VOID'},],
        [{type: 'WALL'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'WALL'}, {type: 'WALL'},],
        [{type: 'WALL'}, {type: 'VOID'}, {type: 'VOID'}, {type: 'WALL'}, {type: 'VOID'},],
        [{type: 'WALL'}, {type: 'VOID'}, {type: 'END!'}, {type: 'WALL'}, {type: 'VOID'},],

    ]
