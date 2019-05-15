import React from 'react';
import logo_text from "../images/logo_text.png";

function LoginPage({handleLogin}) {
    return (
        <div className="page-container" id="login-page-container">
            <div className="content-wrap">
                <div id="login-background"/>
                <div className="section">
                    <div className="container login-logo">
                        <img src={logo_text} alt={logo_text}/>
                    </div>
                </div>
                <div className="section">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className="box has-text-centered" id="login-box">
                                <h1 className="title is-spaced">Bienvenue</h1>
                                <h2 className="subtitle">Veuillez vous connecter à votre compte ISEP</h2>
                                <button className="button is-link is-large"
                                        onClick={handleLogin}>Connexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;