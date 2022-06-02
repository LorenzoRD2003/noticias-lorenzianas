import React, { useState, useEffect } from "react";
import NewsService from "../services/News";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
    const [data, setData] = useState({});
    const { authorId } = useParams();

    return (
        <>
            <h1>Página del autor</h1>
        </>
    );
}

export default AuthorPage;
