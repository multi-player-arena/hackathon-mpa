import './App.css'
import {GamePage} from "./pages/GamePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {JoinPage} from "./pages/JoinPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/join"/>}/>
                <Route path="/join" element={<JoinPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
