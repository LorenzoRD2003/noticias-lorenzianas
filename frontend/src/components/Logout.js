import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthorService from "../services/Author";

const Logout = ({ setToken, setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const logout = async () => await AuthorService.logout();

            setToken(null);
            setUser({});
            logout();
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
        }
    });

    return (
        <div>
            <h1>Cerrando sesión...</h1>
        </div>
    );
}

export default Logout;
