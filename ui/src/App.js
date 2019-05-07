import React from 'react';
import Clock from "./components/Clock";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} className="App-logo" alt="logo"/>
                <p>
                    Save My Grade
                </p>
                <Clock />
            </header>
        </div>
    );
}

export default App;
