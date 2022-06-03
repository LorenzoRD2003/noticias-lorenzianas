import React from "react";
import NewsList from "./NewsList";

const PageTitle = () => (
    <h1>Noticias recientes</h1>
);

const MainPage = () => {
    return (
        <div>
            <PageTitle />
            <NewsList />
        </div>
    );
}

export default MainPage;
