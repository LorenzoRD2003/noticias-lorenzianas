import React from "react";
import NewsList from "./NewsList";

const PageTitle = () => (
    <h1>Noticias recientes</h1>
);

const MainPage = ({ setError }) => {
    return (
        <div>
            <PageTitle />
            <NewsList setError={setError} />
        </div>
    );
}

export default MainPage;
