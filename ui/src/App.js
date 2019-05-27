import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import './styles/css/styles.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useCookies} from "react-cookie";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import FormPage from "./pages/FormPage";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id']);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [connectedUser, setConnectedUser] = useState({});

    useEffect(() => {
        if (!isLoggedIn && cookies.token && cookies.id) {
            axios({
                method: 'post',
                url: '/api/login/token',
                data: {"id": cookies.id, "token": cookies.token}
            })
                .then((response) => {
                    let user = response.data.body;
                    setConnectedUser(user);
                    setLoggedIn(true);
                }).catch((e) => {
                alert(e);
            })
        }
    });

    function handleLogin(user) {
        setConnectedUser(user);
        setCookie('token', user.token, {path: '/'});
        setCookie('id', user.id, {path: '/'});
        setLoggedIn(true);
    }

    function handleLogout() {
        alert("Déconnexion...");
        removeCookie('token', {path: '/'});
        removeCookie('id', {path: '/'});
        setLoggedIn(false);
        window.location.href = "/";
    }

    return (
        <Router>
            <Switch>
                <Route path="/login" render={() => isLoggedIn ? <Redirect to={{pathname: "/"}}/> :
                    <LoginPage handleLogin={handleLogin}/>}/>
                <PrivateRoute path="/home" component={HomePage} isLoggedIn={isLoggedIn}
                              componentProps={{connectedUser}}/>
                <PrivateRoute path="/profile" component={ProfilePage} isLoggedIn={isLoggedIn}
                              componentProps={{handleLogout, connectedUser}}/>
                <PrivateRoute path="/courses/:id" component={CoursePage} isLoggedIn={isLoggedIn}
                              componentProps={{connectedUser}}/>
                <Route path="/FormPage" component={FormPage}/>
                <Route render={() => <Redirect to={{pathname: "/home"}}/>}/>
            </Switch>
        </Router>
    );
}

function PrivateRoute({component: Component, isLoggedIn, componentProps, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => isLoggedIn ? (
                <Component {...props} {...componentProps}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {referrer: props.location}
                    }}
                />
            )}
        />
    );
}

export default App;
