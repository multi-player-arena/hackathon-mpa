import './App.css'
import {GamePage} from "./pages/GamePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {JoinPage} from "./pages/JoinPage.tsx";
import {PrimeReactProvider} from "primereact/api";

function App() {

    return (
        <PrimeReactProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/join"/>}/>
                    <Route path="/join" element={<JoinPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Routes>
            </BrowserRouter>
        </PrimeReactProvider>
    )
}

export default App
