import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthorService from "../services/Author";
import { FormInput, FormButton, FormErrors } from "./Form";
import processError from "../functions/processError";

const LoginForm = ({ setToken, setUser }) => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();
    const previousPage = location.state?.from?.pathname || "/";

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async event => {
        event.preventDefault();
        setDisabled(true);
        const { username, password } = data;

        try {
            const result = (await AuthorService.login({ username, password })).data;
            
            if (result.status === "FAILED")
                throw new Error(result.data.error);

            setToken(result.data.token);
            setUser(result.data.author);
            navigate(previousPage, { replace: true });
        } catch (err) {
            const processedError = processError(err);
            setErrors(processedError.error);
            setDisabled(false);
        }
    }

    return (
        <form className="col-lg-6 col-md-6 col-sm-12" onSubmit={onSubmit}>
            <h1>Iniciar sesión</h1>
            <FormInput
                id="username"
                text="Nombre de usuario"
                type="text"
                onChange={handleChange}
            />
            <FormInput
                id="password"
                text="Contraseña"
                type="password"
                onChange={handleChange}
            />
            <FormErrors errors={errors} />
            <FormButton text="Ingresar" disabled={disabled} />
        </form>
    );
}

export default LoginForm;
