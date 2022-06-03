import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authorValidation from "../functions/authorValidation";
import AuthorService from "../services/Author";

const FormInput = props => (
    <div className="form-group my-3">
        <label htmlFor={props.id}>
            {props.text}
        </label>
        <input
            id={props.id}
            name={props.id}
            type={props.type}
            className="form-control"
            onChange={props.onChange}
        />
    </div>
);

const FormButton = props => {
    return (
        <button
            type="submit"
            className="btn btn-primary"
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};

const FormErrors = props => {
    const errors = props.errors.map((error, index) => <li key={index}>{error}</li>)
    return (
        <ul>
            {errors}
        </ul>
    );
};

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
    });
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = async event => {
        event.preventDefault();
        setDisabled(true);

        const { email, username, password, repeatPassword } = data;
        const validationMessages = authorValidation(email, username, password, repeatPassword);

        if (validationMessages.length > 0) {
            setErrors(validationMessages);
            return setDisabled(false); // Activate the button again
        }

        try {
            const newAuthor = (await AuthorService.create({ email, username, password })).data;
            
            if (newAuthor.status == "FAILED")
                throw new Error(newAuthor.data.error);

            navigate(`/author/${newAuthor.data._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className="col-lg-6 col-md-6 col-sm-12" onSubmit={onSubmit}>
            <h1>Registrarse como autor</h1>
            <FormInput
                id="username"
                text="Nombre de usuario"
                type="text"
                onChange={handleChange}
            />
            <FormInput
                id="email"
                text="Email"
                type="text"
                onChange={handleChange}
            />
            <FormInput
                id="password"
                text="Contraseña"
                type="password"
                onChange={handleChange}
            />
            <FormInput
                id="repeatPassword"
                text="Repetir contraseña"
                type="password"
                onChange={handleChange}
            />
            <FormErrors errors={errors} />
            <FormButton text="Crear cuenta" disabled={disabled}/>
        </form>
    );
}

export default RegisterForm;
