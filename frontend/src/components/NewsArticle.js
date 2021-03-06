import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import NewsService from "../services/News";
import formatDate from "../functions/formatDate";
import processError from "../functions/processError";

const NewsCategory = props => (
    <h6>{props.category?.toUpperCase()}</h6>
);

const NewsHeadline = props => (
    <h1>{props.headline}</h1>
);

const NewsLead = props => (
    <h3>{props.lead}</h3>
);

const NewsImage = props => (
    <img
        src={props.src}
        alt={props.alt}
        className="news-image"
    />
);

const NewsData = props => {
    const authorLink = <Link to={`/author/${props.authorId}`}>{props.authorName}</Link>;

    return (
        <div>
            <h4>
                Por {authorLink} --- {formatDate(props.date)}
            </h4>
            <h6>Vista {props.views} veces</h6>
        </div>
    );
}

const NewsBody = props => {
    const paragraphs = props.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>);
    return <>{paragraphs}</>;
};

const NewsTags = props => {
    const tags = props.tags?.map((tag, index) => <h6 key={index}>{tag?.toUpperCase()}</h6>);
    return (
        <div>
            <h5>TEMAS RELACIONADOS</h5>
            <ul>
                {tags}
            </ul>
        </div>
    );
}

const NewsArticle = ({ setError }) => {
    const [data, setData] = useState({});
    const { newsId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const news = (await NewsService.get(newsId)).data;
                if (news.status === "FAILED")
                    throw new Error(news.data.error);

                const author = (await NewsService.getAuthorName(newsId)).data;
                if (author.status === "FAILED")
                    throw new Error(news.data.error);

                setData({
                    ...news.data,
                    ...author.data
                });
            } catch (err) {
                setError(processError(err));
                navigate("/error", { replace: true });
            }
        })();
    }, [newsId, navigate, setError]);

    return (
        <>
            <NewsCategory category={data.category} />
            <NewsHeadline headline={data.headline} />
            <NewsLead lead={data.lead} />
            <NewsImage src={data.image} alt={data.headline} />
            <NewsData authorId={data.author} authorName={data.username} date={data.createdAt} views={data.views} />
            <NewsBody body={data.body} />
            <NewsTags tags={data.tags} />
        </>
    );
}

export default NewsArticle;
