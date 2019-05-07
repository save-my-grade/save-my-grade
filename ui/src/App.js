import React from 'react';
import Clock from "./components/Clock";
import 'bulma/css/bulma.css';
import './styles/css/styles.css';
import logo from './images/logo.png';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="title is-1 has-text-primary">
                    Save My Grade
                </h1>
                <Clock />
            </header>
        </div>
    );
}

export default App;
