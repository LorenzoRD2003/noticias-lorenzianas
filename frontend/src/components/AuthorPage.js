import React, { useState, useEffect } from "react";
import AuthorService from "../services/Author";
import { Link, useParams } from "react-router-dom";
import formatDate from "../functions/formatDate";

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

const AuthorConfig = props => (
    <div>
        <h3>Panel de usuario</h3>
        <div className="row">
            <div className="col-md-4 text-center">
                <Link to={"/publish"} className="btn btn-primary">
                    Escribir una noticia
                </Link>
            </div>
            <div className="col-md-4 text-center">
                <button className="btn btn-secondary">Actualizar contraseña</button>
            </div>
            <div className="col-md-4 text-center">
                <button className="btn btn-danger">Borrar cuenta</button>
            </div>
        </div>
    </div>
);

const AuthorPage = ({ user }) => {
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
            {user._id === data._id ?
                <AuthorConfig /> :
                <></>
            }
        </>
    );
}

export default AuthorPage;
