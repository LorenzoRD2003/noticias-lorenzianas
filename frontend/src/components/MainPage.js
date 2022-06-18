import React, { useState } from "react";

import NewsList from "./NewsList";

const PageTitle = () => (
    <h1>Noticias recientes</h1>
);

const categories = [
    "Cultura",
    "Deportes",
    "Economía",
    "Policiales",
    "Política",
    "Variedad",
];

const CategoryFilter = ({ categoryChange }) => {
    const categoryItems = categories.map((category, index) => (
        <option key={index}>
            {category}
        </option>
    ));

    return (
        <select className="form-select" onChange={categoryChange}>
            <option value="">Todas las noticias</option>
            {categoryItems}
        </select>
    );
};

const MainPage = ({ setError }) => {
    const [category, setCategory] = useState("");

    const categoryChange = event => {
        console.log(event.target.value);
        setCategory(event.target.value);
    }

    return (
        <div>
            <PageTitle />
            <CategoryFilter categoryChange={categoryChange} />
            <NewsList category={category} setError={setError} />
        </div>
    );
}

export default MainPage;
