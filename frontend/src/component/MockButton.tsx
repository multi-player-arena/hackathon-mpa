import {Button} from "primereact/button";
import {usePlayerService} from "../services/usePlayerService.ts";
import {Actions} from "../models/Player.ts";

export function MockButton() {
    const {createPlayer, actionPlayer} = usePlayerService();

    const mockDate = async () => {
        const player1 = await createPlayer("Fabio")
        // const player2 = await createPlayer("Yann")
        // const player3 = await createPlayer("Gaut")
        // const player4 = await createPlayer("Bastien")

        setInterval(() => {
            actionPlayer(player1.id, Actions.B)
        }, 5000);

    }

    return <Button label="Mock" onClick={mockDate}/>

}