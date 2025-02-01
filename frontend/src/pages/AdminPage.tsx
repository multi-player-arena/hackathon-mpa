import {usePlayerService} from "../services/usePlayerService.ts";

export function AdminPage() {

    const {startGame} = usePlayerService()

    const handleOnSubmit = () => {
        startGame()
    }


    return (
        <div>
            {/*Only on desktop*/}
            {/*<button id='shortcut'><a href={"./game"}>Go to main page</a></button>*/}

            <div id="join-container">
                <button id='join' onClick={handleOnSubmit}>
                    Start le jeu
                </button>
            </div>
        </div>
    );

}