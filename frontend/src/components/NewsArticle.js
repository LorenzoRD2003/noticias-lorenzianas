import React, { useState, useEffect } from "react";
import NewsService from "../services/News";
import { Link, useParams } from "react-router-dom";
import formatDate from "../functions/formatDate";

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

const NewsData = props => (
    <div>
        <h4>
            <Link to={`/author/${props.authorId}`}>Por {props.authorName}</Link> --- {formatDate(props.date)}
        </h4>
        <h6>Vista {props.views} veces</h6>
    </div>
);

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
