import {ActionsEnum, Player} from "../models/Player.ts";
import useFetchService from "./useFetchService.ts";


export const usePlayerService = () => {
    const { postRequest } = useFetchService();



    function createPlayer(name: string): Promise<Player> {
        return postRequest<Player>(`/player/${name}`);

    }
    function actionPlayer(playerId: number, action: ActionsEnum):Promise<void> {
        return postRequest<void>(`/player/${playerId}/${action}`);

    }

    function startGame():Promise<void> {
        return postRequest<void>(`/game/start`);
    }


    function reset():Promise<void> {
        return postRequest<void>(`/reset`);
    }

    return { createPlayer, actionPlayer ,startGame,reset};

}


