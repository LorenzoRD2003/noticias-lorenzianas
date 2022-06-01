import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar/Navbar";

import MainPage from "./components/MainPage";

function App() {
    const [user, setUser] = useState(null);

    const onLogin = user => {
        setUser(user);
    }

    return (
        <div className="container">
            <Navbar
                title="Agencia de Noticias Lorenzianas"
                homeLink="/"
                loggedIn={Boolean(user)}
            />
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/login" />
            </Routes>
        </div>
    );
}

export default App;
