import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = ({ setToken, setAuthor }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        setToken(null);
        setAuthor({});
        navigate("/", { replace: true });
    });

    return (
        <div>
            <h1>Cerrando sesión...</h1>
        </div>
    );
}

export default Logout;
