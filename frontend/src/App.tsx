import './App.css'
import {GamePage} from "./pages/GamePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {JoinPage} from "./pages/JoinPage.tsx";
import {PrimeReactProvider} from "primereact/api";
import {ControllerPage} from "./pages/ControllerPage.tsx";
import {PlayerProvider} from "./providers/PlayerContext.tsx";
import {GamePageV2} from "./pages/GamePageV2.tsx";
import {AdminPage} from "./pages/AdminPage.tsx";

function App() {
    return (
        <PrimeReactProvider>
            <PlayerProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/join"/>}/>
                        <Route path="/join" element={<JoinPage/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
                        <Route path="/game" element={<GamePage/>}/>
                        <Route path="/gamev2" element={<GamePageV2/>}/>
                        <Route path="/controller" element={<ControllerPage/>}/>
                    </Routes>
                </BrowserRouter>
            </PlayerProvider>
        </PrimeReactProvider>
    )
}

export default App
