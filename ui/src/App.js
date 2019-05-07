import React from 'react';
import logo from './Logo_Small.png';
import './App.css';
import Clock from "./Components/Clock";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Save My Grade
                </p>
                <Clock />
            </header>
        </div>
    );
}

export default App;
