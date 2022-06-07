import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthorService from "../services/Author";

const Logout = ({ setToken, setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            (async () => {
                setToken(null);
                setUser({});
                await AuthorService.logout();
                navigate("/", { replace: true });
            })();
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
