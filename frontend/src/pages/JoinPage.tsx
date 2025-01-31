import {useState} from "react";
import {usePlayerService} from "../services/usePlayerService.ts";
import {useNavigate} from "react-router-dom";
import {usePlayer} from "../providers/PlayerContext.tsx";
import { InputText } from 'primereact/inputtext';

export function JoinPage() {

    const [name, setName] = useState('')
    const {createPlayer} = usePlayerService()
    const {setPlayer} = usePlayer();

    const navigate = useNavigate();
    const handleOnSubmit = () => {
        const res = createPlayer(name);
        res.then((player) => {
            setPlayer(player);
            navigate(`/controller`);
        }).catch((error) => console.error(error));
        setName('');
    }

    return (
        <div>
            <label htmlFor="playerName" className='takima'>Player Name</label><br/>
            <InputText value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleOnSubmit}>
                Join
            </button>
        </div>
    );

}