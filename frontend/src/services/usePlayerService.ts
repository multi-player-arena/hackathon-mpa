import {ActionsEnum, Player, TypeEnum} from "../models/Player.ts";
import useFetchService from "./useFetchService.ts";


export const usePlayerService = () => {
    const { postRequest,putRequest } = useFetchService();



    function createPlayer(name: string, avatar: string): Promise<Player> {
        return postRequest<Player>(`/player/${name}/avatar/${avatar}`);
    }

    function actionPlayer(playerId: number, action: ActionsEnum):Promise<void> {
        return postRequest<void>(`/player/${playerId}/${action}`);

    }

    function stopActionPlayer(playerId: number):Promise<void> {
        return putRequest<void>(`/player/${playerId}`);

    }

    function startGame():Promise<void> {
        return postRequest<void>(`/game/start`);
    }



    return { createPlayer, actionPlayer ,startGame,stopActionPlayer};

}


