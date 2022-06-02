import React, { useState, useEffect } from "react";
import NewsService from "../services/News";
import { useParams } from "react-router-dom";

const NewsHeadline = props => (
    <h1>{props.headline}</h1>
);

const NewsImage = props => (
    <img src={props.src} alt={props.alt}/>
);

const NewsAuthor = props => (
    <h3>Por {props.author}</h3>
);

const NewsArticle = () => {
    const [data, setData] = useState({});
    let { newsId } = useParams();

    useEffect(() => {
        const get = async () => {
            const news = (await NewsService.get(newsId)).data;
            if (news.status === "FAILED")
                throw new Error(news.data.error);

            const author = (await NewsService.getAuthorName(newsId)).data;
            if (author.status === "FAILED")
                throw new Error(news.data.error);

            console.log(news.data);
            setData({
                ...news.data,
                ...author.data
            });
        }

        try {
            get();
        } catch (err) {
            console.log(err);
        }
    }, [newsId]);

    return (
        <>
            <NewsHeadline headline={data.headline} />
            <NewsImage src={data.image} alt={data.headline} />
            <NewsAuthor author={data.username} />
        </>
    );
}

export default NewsArticle;
