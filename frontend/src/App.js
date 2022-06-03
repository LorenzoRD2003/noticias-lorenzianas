import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import NewsArticle from "./components/NewsArticle";
import AuthorPage from "./components/AuthorPage";
import RegisterForm from "./components/RegisterForm";

function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="container">
            <Navbar
                title="Agencia de Noticias Lorenzianas"
                homeLink="/"
                loggedIn={Boolean(user)}
            />
            <div className="mt-3">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/news/:newsId" element={<NewsArticle />} />
                    <Route path="/author/:authorId" element={<AuthorPage />} />
                    <Route path="/login" />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
