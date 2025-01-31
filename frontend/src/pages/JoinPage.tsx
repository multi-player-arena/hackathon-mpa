import {useState} from "react";
import {usePlayerService} from "../services/usePlayerService.ts";
import { InputText } from 'primereact/inputtext';

export function JoinPage() {

    const [name, setName] = useState('')
    const {createPlayer} = usePlayerService()

    const handleOnSubmit = () => {
        const res = createPlayer(name);
        res.then(() => {
            window.location.href = '/game';
        }).catch(
            (error) => {
                console.log(error);
            }
        );
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