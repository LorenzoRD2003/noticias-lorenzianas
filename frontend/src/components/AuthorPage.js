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
            <ul>
                {news}
            </ul>
        </div>
    );
}

const AuthorPage = () => {
    const [data, setData] = useState({});
    const { authorId } = useParams();

    useEffect(() => {
        const get = async () => {
            const author = (await AuthorService.get(authorId)).data;
            if (author.status == "FAILED")
                throw new Error(author.data.error);

            console.log(author.data);
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
        </>
    );
}

export default AuthorPage;
