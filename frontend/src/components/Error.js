import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!error?.error?.length)
            navigate("/", { replace: true });
    }, []);

    return (
        <>
            <h1>¡Ocurrió un error!</h1>
            <h3>Status: {error?.status} - {error?.statusText}</h3>
            <ul>
                {error?.error?.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </>
    );
};

export default Error;
