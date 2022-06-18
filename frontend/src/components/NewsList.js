import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import NewsService from "../services/News";
import formatDate from "../functions/formatDate";
import processError from "../functions/processError";

const NewsItem = props => {
    return (
        <Link
            className="card news-card"
            to={`/news/${props.id}`}
        >
            <img className="card-img-top" src={props.image} alt={props.headline} />
            <div className="card-body">
                <h5 className="card-title">{props.headline}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{formatDate(props.date)}</h6>
            </div>
        </Link>
    );
}

const NewsRow = props => (
    <div className="row mb-3">
        <div className="col-md-4">
            {props.first}
        </div>
        <div className="col-md-4">
            {props.second}
        </div>
        <div className="col-md-4">
            {props.third}
        </div>
    </div>
);

const NewsList = ({ category, setError }) => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const news = (await NewsService.getAll(100, category)).data;

                if (news.status === "FAILED")
                    throw new Error(news.data.error);

                const newsItems = news.data.map(item => (
                    <NewsItem
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        headline={item.headline}
                        date={item.createdAt}
                    />
                ));

                setNews(newsItems);
            } catch (err) {
                setError(processError(err));
                navigate("/error", { replace: true });
            }
        })();
    }, [navigate, category, setError]);

    // Organize the news in rows of three elements
    const organizeInRows = () => {
        const rows = Math.floor(news.length / 3);
        const newsRows = [];
        for (let i = 0; i <= rows; i++) {
            newsRows.push(
                <NewsRow
                    key={i}
                    first={news[3 * i]}
                    second={news[3 * i + 1]}
                    third={news[3 * i + 2]}
                />
            );
        }
        return newsRows;
    }

    return (
        <div>
            <ul className="container mx-auto mt-4">
                {organizeInRows(news)}
            </ul>
        </div>
    );
}

export default NewsList;
