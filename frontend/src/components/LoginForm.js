import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "./Form";

const LoginForm = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        setDisabled(true);
        console.log(data);
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
            <FormButton text="Ingresar" disabled={disabled}/>
        </form>
    );
}

export default LoginForm;
