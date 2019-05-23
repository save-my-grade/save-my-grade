import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import './styles/css/styles.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useCookies} from "react-cookie";
import axios from "axios";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id']);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [connectedUser, setConnectedUser] = useState({});

    useEffect(() => {
        if (cookies.token && cookies.id) {
            axios({
                method: 'post',
                url: '/api/login/token',
                data: {"id": cookies.id, "token": cookies.token}
            })
                .then(() => {
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
        alert("Signing out...");
        removeCookie('token', {path: '/'});
        removeCookie('id', {path: '/'});
        setLoggedIn(false);
        window.location.href = "/";
    }

    return (
        <Router>
            <Switch>
                <Route path="/login/" render={() => isLoggedIn ? <Redirect to={{pathname: "/"}}/> :
                    <LoginPage handleLogin={handleLogin}/>}/>
                <PrivateRoute path="/home/" component={HomePage} isLoggedIn={isLoggedIn}
                              componentProps={{handleLogout, connectedUser}}/>
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
                <Component {...componentProps}/>
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
