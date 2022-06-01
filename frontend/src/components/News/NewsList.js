import React, { useState, useEffect } from "react";
import NewsService from "../../services/News";

const NewsItem = props => {
    console.log(props);
    return (
        <li>
            Noticia.
        </li>
    );
}

const NewsList = props => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        try {
            NewsService.getAll();
        } catch (err) {
            console.log(err);
        }
    });

    const newsItems = news.map((item, index) => <NewsItem key={index} news={item}/>);
    return (
        <ul className="news-list">
            {newsItems}
        </ul>
    );
}

export default NewsList;
