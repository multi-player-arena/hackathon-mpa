import {Button} from "primereact/button";
import {usePlayerService} from "../services/usePlayerService.ts";
import {Actions, Player} from "../models/Player.ts";

export function MockButton() {
    const {createPlayer, actionPlayer} = usePlayerService();

    const mockDate = async () => {
        const player1 = await createPlayer("Fabio")
        const player2 = await createPlayer("Yann")
        const player3 = await createPlayer("Gaut")
        const player4 = await createPlayer("Bastien")

        const mockPlayers: Player[] = [player1, player2, player3, player4]

        setInterval(() => {
            const values = Object.values(Actions);
            const randomIndex = Math.floor(Math.random() * values.length);
            const action:Actions = values[randomIndex];
            actionPlayer(mockPlayers[Math.floor(Math.random() * mockPlayers.length)].id, action)
        }, 5000);

    }

    return <Button label="Mock" onClick={mockDate}/>

}