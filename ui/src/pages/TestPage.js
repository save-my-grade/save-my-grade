import React from 'react';
import logo from '../images/logo.png';
import Clock from "../components/Clock";
import Footer from "../components/Footer";

function TestPage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="title is-1 has-text-primary">
                    Save My Grade
                </h1>
                <Clock/>
            </header>
            <Footer/>
        </div>
    );
}

export default TestPage;