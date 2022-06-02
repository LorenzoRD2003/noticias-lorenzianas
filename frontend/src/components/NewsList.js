import React, { useState, useEffect } from "react";
import NewsService from "../services/News";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";

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
    <div className="row">
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

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const get = async () => {
            const news = (await NewsService.getAll()).data;

            if (news.status === "FAILED")
                throw new Error(news.data.error);

            const newsItems = news.data.map(item => (
                <NewsItem
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    date={item.createdAt}
                />
            ));

            setNews(newsItems);
        }

        try {
            get();
        } catch (err) {
            console.log(err);
        }
    }, []);

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
        <ul className="container mx-auto mt-4">
            {organizeInRows(news)}
        </ul>
    );
}

export default NewsList;
