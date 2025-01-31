import {useState} from "react";
import {createPlayer} from "../services/playerService.ts";

export function JoinPage() {

    const [name, setName] = useState('')

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
            <input onChange={(e) => setName(e.target.value)} value={name}/>
            <button onClick={handleOnSubmit}>
                Join
            </button>
        </div>
    );

}