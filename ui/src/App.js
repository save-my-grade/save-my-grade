import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './styles/css/styles.css';
import TestPage from "./pages/TestPage";
import TestHub from "./pages/TestHub";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
            <Route path="/" exact component={TestHub}/>
            <Route path="/test/" component={TestPage}/>
            <Route path="/login/" component={LoginPage}/>
            <Route path="/home/" component={HomePage}/>
        </Router>
    );
}

export default App;
