import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar/Navbar";
import { items, loggedInItems } from "./components/Navbar/NavbarItems";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <Navbar
                title="Agencia de Noticias Lorenzianas"
                homeLink="#"
                items={loggedIn ? loggedInItems : items}
            />
        </div>
    );
}

export default App;
