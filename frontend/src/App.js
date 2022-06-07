import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import NewsArticle from "./components/NewsArticle";
import AuthorPage from "./components/AuthorPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});

    return (
        <div className="container">
            <Navbar
                title="Agencia de Noticias Lorenzianas"
                homeLink="/"
                loggedIn={Boolean(token)}
            />
            <main className="mt-3">
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/news/:newsId"
                        element={<NewsArticle />}
                    />
                    <Route
                        path="/author/:authorId"
                        element={<AuthorPage />}
                        user={user}
                    />
                    <Route
                        path="/login"
                        element={<LoginForm setToken={setToken} setUser={setUser} />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterForm setToken={setToken} setUser={setUser} />}
                    />
                    <Route
                        path="/logout"
                        element={<Logout setToken={setToken} setUser={setUser} />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
