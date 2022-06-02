import React, { useState, useEffect } from "react";
import NewsService from "../services/News";
import { Link } from "react-router-dom";

const NewsItem = props => {
    const date = (new Date(props.data.createdAt)).toLocaleDateString("FR-CA");
    return (
        <Link
            className="card news-card"
            to={`/news/${props.data._id}`}
        >
            <img className="card-img-top" src={props.data.image} alt={props.data.headline}/>
            <div className="card-body">
                <h5 className="card-title">{props.data.headline}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
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

            const newsItems = news.data.map(item => <NewsItem key={item._id} data={item} />);

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
