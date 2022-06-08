import React, { useState, useEffect } from "react";
import AuthorService from "../services/Author";
import { Link, useParams, useNavigate } from "react-router-dom";
import formatDate from "../functions/formatDate";
import { FormInput, FormButton, FormErrors } from "./Form";
import processError from "../functions/processError";

const AuthorTitle = props => (
    <h1>Información sobre {props.username}</h1>
);

const AuthorData = props => (
    <ul>
        <li>Nombre de usuario: {props.username}</li>
        <li>E-mail: {props.email}</li>
        <li>Autor desde {formatDate(props.date)}</li>
    </ul>
);

const AuthorNews = props => (
    <li>
        <Link to={`/news/${props.id}`}>
            {props.headline}
        </Link>
        ({formatDate(props.date)})
    </li>
);

const AuthorNewsList = props => {
    const news = props.news?.map((item, index) => (
        <AuthorNews
            key={index}
            id={item._id}
            headline={item.headline}
            date={item.createdAt}
        />
    ));

    return (
        <div>
            <h3>Noticias escritas por el autor</h3>
            {props.news && props.news?.length > 0 ?
                <ul>
                    {news}
                </ul> :
                <h6>¡Este autor aún no tiene noticias escritas!</h6>
            }
        </div>
    );
}

const AuthorConfig = props => {
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleClick = event => {
        event.target.disabled = true;
        setShowUpdatePassword(true);
    }

    return (
        <div>
            <h3>Panel de usuario</h3>
            <div className="row">
                <div className="col-md-4 text-center">
                    <Link to={"/publish"} className="btn btn-primary">
                        Escribir una noticia
                    </Link>
                </div>
                <div className="col-md-4 text-center">
                    <button className="btn btn-secondary" onClick={handleClick}>Actualizar contraseña</button>
                </div>
                <div className="col-md-4 text-center">
                    <button className="btn btn-danger">Borrar cuenta</button>
                </div>
            </div>
            {showUpdatePassword ?
                <UpdatePasswordForm id={props.id} /> :
                <></>
            }
        </div>
    );
};

const UpdatePasswordForm = props => {
    const [data, setData] = useState({ newPassword: "" });
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setDisabled(true);

        try {
            const result = (await AuthorService.updatePassword(props.id, data)).data;
            
            if (result.status === "FAILED")
                throw new Error(result.data.error);
            
            navigate("/");
        } catch(err) {
            const processedError = processError(err);
            setErrors(processedError.error);
            setDisabled(false);
        }
    }

    return (
        <form className="col-lg-6 col-md-6 col-sm-12" onSubmit={handleSubmit}>
            <FormInput
                id="newPassword"
                text="Nueva contraseña"
                type="password"
                onChange={handleChange}
            />
            <FormErrors errors={errors} />
            <FormButton text="Ingresar" disabled={disabled} />
        </form>
    );
}

const AuthorPage = props => {
    const [data, setData] = useState({});
    const { authorId } = useParams();

    useEffect(() => {
        const get = async () => {
            const author = (await AuthorService.get(authorId)).data;
            if (author.status === "FAILED")
                throw new Error(author.data.error);

            setData(author.data);
        }

        try {
            get();
        } catch (err) {
            console.log(err);
        }
    }, [authorId]);

    return (
        <>
            <AuthorTitle username={data.username} />
            <AuthorData
                username={data.username}
                email={data.email}
                date={data.createdAt}
            />
            <AuthorNewsList news={data.news} />
            {props.user._id === data._id ?
                <AuthorConfig id={props.user._id} /> :
                <></>
            }
        </>
    );
}

export default AuthorPage;
