import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
            const session = JSON.parse(localStorage.getItem("session"));

            if (session) {
                setToken(session.token);
                setUser(session.user);
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
                        element={<AuthorPage token={token} user={user} setError={setError} />}
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
                        element={token ?
                            <Navigate to={`/author/${user?.id}`} replace={true} /> :
                            <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/publish"
                        element={token ?
                            <Publish token={token} user={user} /> :
                            <Navigate to="/login" />
                        }
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
