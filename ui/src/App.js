import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import './styles/css/styles.css';
import TestHub from "./pages/TestHub";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleLogout() {
        alert("Signing out...");
        setLoggedIn(false);
        window.location.href = "/";
    }

    return (
        <Router>
            <Switch>
                <Route path="/login/" render={() => isLoggedIn ? <Redirect to={{pathname: "/"}}/> :
                    <LoginPage handleLogin={handleLogin}/>}/>
                <PrivateRoute path="/" exact component={TestHub} isLoggedIn={isLoggedIn}/>
                <PrivateRoute path="/home/" component={HomePage} isLoggedIn={isLoggedIn}
                              componentProps={{handleLogout}}/>
                <Route render={() => <Redirect to={{pathname: "/"}}/>}/>
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
