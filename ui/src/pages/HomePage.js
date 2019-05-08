import React from 'react';
import logo from "../images/logo_text.png"

function HomePage() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/home/">
                    <img src={logo} alt="logo"/>
                </a>
            </div>
        </nav>
    );

}

export default HomePage;