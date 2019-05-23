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
    const [loginFormVisibility, setLoginFormVisibility] = useState(true);

    const toggleForm = () => {
        if (loginFormVisibility) {
            setLoginFormVisibility(false);
            setSignUpFormVisibility(true);
        } else {
            setSignUpFormVisibility(false);
            setLoginFormVisibility(true);
        }
    };

    const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);

    function signUpSuccess() {
        setSignUpFormVisibility(false);
        setShowSignUpSuccess(true);
        setLoginFormVisibility(true);
    }

    const [showSignUpFailure, setShowSignUpFailure] = useState(false);

    function signUpFailure() {
        setShowSignUpSuccess(false);
        setShowSignUpFailure(true);
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
                                {showSignUpSuccess ? (
                                        <h2 className="subtitle has-text-success">Inscription réussie ! Veuillez maintenant
                                            vous
                                            connecter</h2>
                                    ) :
                                    (showSignUpFailure ? (
                                        <h2 className="subtitle has-text-danger">{"L'inscription a échoué..."}</h2>) : (
                                        <h2 className="subtitle">Souhaitez-vous vous connecter ou vous inscrire
                                            ?</h2>))}
                                {loginFormVisibility &&
                                <LoginForm successCallback={loginSuccess} failureCallback={loginFailure}/>}
                                {signUpFormVisibility && <SignupForm successCallback={signUpSuccess}
                                                                     failureCallback={signUpFailure}/>}
                                <button className="button is-text has-text-info"
                                        style={{marginTop: 10}}
                                        onClick={toggleForm}>
                                    {loginFormVisibility ? "S'inscrire" : "Se connecter"}
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
