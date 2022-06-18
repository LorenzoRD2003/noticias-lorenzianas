import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FormInput, FormButton, FormErrors } from "./Form";

import formatDate from "../functions/formatDate";
import processError from "../functions/processError";

import NewsService from "../services/News";
import AuthorService from "../services/Author";

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
        {props.isLoggedIn ?
            <>
                <button
                    className="mx-2 btn btn-danger btn-sm"
                    onClick={props.onDelete}
                >
                    Borrar noticia
                </button>
            </> :
            <></>
        }
    </li>
);

const AuthorNewsList = props => {
    const news = props.news?.map(item => (
        <AuthorNews
            key={item._id}
            id={item._id}
            headline={item.headline}
            date={item.createdAt}
            isLoggedIn={props.isLoggedIn}
            onDelete={() => props.onDelete(item._id)}
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
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.target.disabled = true;
        setShowUpdatePassword(true);
    }

    const handleDelete = async () => {
        let answer = window.confirm("¿Seguro que quiere borrar su cuenta?");
        if (!answer)
            return;

        try {
            await AuthorService.delete(props.id);
            navigate("/logout");
        } catch (err) {
            console.log(err);
        }
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
                    <button className="btn btn-secondary" onClick={handleUpdate}>Actualizar contraseña</button>
                </div>
                <div className="col-md-4 text-center">
                    <button className="btn btn-danger" onClick={handleDelete}>Borrar cuenta</button>
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
        } catch (err) {
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

const AuthorPage = ({ user, setError }) => {
    const { authorId } = useParams();
    const [data, setData] = useState({});
    const [update, setUpdate] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Get author data
        (async () => {
            try {
                const author = (await AuthorService.get(authorId)).data;
                if (author.status === "FAILED")
                    throw new Error(author.data.error);

                setData({
                    isLoggedIn: user._id === authorId,
                    ...author.data
                });
            } catch (err) {
                setError(processError(err));
                navigate("/error", { replace: true });
            }
        })();
    }, [authorId, user, navigate, update, setError]);

    const deleteNews = async id => {
        try {
            let answer = window.confirm("¿Seguro que quiere borrar la noticia?");
            if (!answer)
                return;

            await NewsService.delete(id);
            setUpdate(update => update + 1);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <AuthorTitle username={data.username} />
            <AuthorData
                username={data.username}
                email={data.email}
                date={data.createdAt}
            />
            <AuthorNewsList news={data.news} onDelete={deleteNews} isLoggedIn={data.isLoggedIn} />
            {data.isLoggedIn ?
                <AuthorConfig id={authorId} /> :
                <></>
            }
        </>
    );
}

export default AuthorPage;
