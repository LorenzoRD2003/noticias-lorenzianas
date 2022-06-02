import React, { useState, useEffect } from "react";
import NewsService from "../../services/News";

const NewsItem = props => {
    return (
        <li className="list-group-item clearfix">
            <img className="img-responsive mini-image" src={props.data.image}/>
            <h5>{props.data.headline}</h5>
        </li>
    );
}

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const get = async () => {
            const news = (await NewsService.getAll()).data;

            if (news.status == "FAILED")
                throw new Error(news.data.error);
            
            const newsItems = news.data.map((item, index) => <NewsItem key={index} data={item} />);
            setNews(newsItems);
        }

        try {
            get();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ul className="list-group">
            {news}
        </ul>
    );
}

export default NewsList;
