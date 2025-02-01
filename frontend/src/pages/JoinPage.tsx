import {useState} from "react";
import {usePlayerService} from "../services/usePlayerService.ts";
import {useNavigate} from "react-router-dom";
import {usePlayer} from "../providers/PlayerContext.tsx";
import {InputText} from 'primereact/inputtext';
import {ChooseAvatarComponent} from "../component/ChooseAvatarComponent.tsx";

export function JoinPage() {

    const [name, setName] = useState('')
    const {createPlayer} = usePlayerService()
    const {player, setPlayer} = usePlayer();
    const navigate = useNavigate();

    const handleOnSubmit = () => {
        const res = createPlayer(name,player?.avatar || "absol");
        res.then((player) => {
            setPlayer(player);
            navigate(`/controller`);
        }).catch((error) => console.error(error));
        setName('');
    }

    return (
        <div>
            {/*Only on desktop*/}
            {/*<button id='shortcut'><a href={"./game"}>Go to main page</a></button>*/}

            <div id="join-container">
                <label htmlFor="playerName" className='takima'>Player Name:</label><br/>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>
                <button id='join' onClick={handleOnSubmit}>
                    Join
                </button>
                <ChooseAvatarComponent></ChooseAvatarComponent>
            </div>
        </div>
    );

}