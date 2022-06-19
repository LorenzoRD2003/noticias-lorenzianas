import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/Authentication";

import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import NewsArticle from "./components/NewsArticle";
import AuthorPage from "./components/AuthorPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Publish from "./components/Publish";
import Error from "./components/Error";

function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const [error, setError] = useState([]);

    useEffect(() => {
        const get = async () => {
            const session = await AuthService.session();

            if (Object.keys(session.data).length) {
                setToken(session.data.token);
                setUser(session.data.user);
            }
        }
        if (!token) {
            try {
                get();
            } catch (err) {
                console.log(err);
            }
        }
    }, [token]);

    return (
        <div className="container mb-3">
            <Navbar
                title="Agencia de Noticias Lorenzianas"
                homeLink="/"
                loggedIn={Boolean(token)}
            />
            <main className="mt-3">
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage setError={setError} />}
                    />
                    <Route
                        path="/news/:newsId"
                        element={<NewsArticle setError={error} />}
                    />
                    <Route
                        path="/author/:authorId"
                        element={<AuthorPage user={user} setError={setError} />}
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
                    <Route
                        path="/profile"
                        element={<Navigate to={`/author/${user?._id}`} replace={true} />}
                    />
                    <Route
                        path="/publish"
                        element={token ? <Publish user={user} /> : <Navigate to="/" replace={true} />}
                    />
                    <Route
                        path="/error"
                        element={<Error error={error} />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
