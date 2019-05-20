import PropTypes from 'prop-types'
import React, {useState} from 'react';
import logo_text from "../images/logo_text.png";
import SignupForm from "../components/forms/SignupForm";
import LoginForm from "../components/forms/LoginForm";

LoginPage.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

function LoginPage({handleLogin}) {
    const [signUpFormVisibility, setSignUpFormVisibility] = useState(false);
    const [loginFormVisibility, setLoginFormVisibility] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    function signinSuccess() {
        setSignUpFormVisibility(false);
        setShowSuccess(true);
    }

    function signinFailure() {
        setShowSuccess(false);
        setShowFailure(true);
    }

    function loginSuccess(user) {
        handleLogin(user);
    }

    function loginFailure() {
        alert("La connexion a échoué.");
    }

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
                                {showSuccess ? (
                                        <h2 className="subtitle has-text-success">Inscription réussie ! Veuillez maintenant
                                            vous
                                            connecter</h2>
                                    ) :
                                    (showFailure ? (
                                        <h2 className="subtitle has-text-danger">{"L'inscription a échoué..."}</h2>) : (
                                        <h2 className="subtitle">Souhaitez-vous vous connecter ou vous inscrire
                                            ?</h2>))}
                                <button className="button is-link is-large"
                                        onClick={() => setLoginFormVisibility(true)}>Connexion
                                </button>
                                {loginFormVisibility && (
                                    <React.Fragment>
                                        <br/>
                                        <LoginForm successCallback={loginSuccess} failureCallback={loginFailure}/>
                                    </React.Fragment>
                                )}
                                <br/>
                                <button className="button is-link is-large is-outlined"
                                        style={{marginTop: 10}}
                                        onClick={() => setSignUpFormVisibility(true)}>
                                    Inscription
                                </button>
                                {signUpFormVisibility && <SignupForm successCallback={signinSuccess}
                                                                     failureCallback={signinFailure}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
