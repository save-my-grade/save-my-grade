import React, {useState} from 'react';
import logo_text from "../images/logo_text.png";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import classNames from "classnames";

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
                                        <h2 className="subtitle has-text-danger">L'inscription a échoué...</h2>) : (
                                        <h2 className="subtitle">Souhaitez-vous vous connecter ou vous inscrire
                                            ?</h2>))}
                                <button className="button is-link is-large"
                                        onClick={() => setLoginFormVisibility(true)}>Connexion
                                </button>
                                {loginFormVisibility && (
                                    <React.Fragment>
                                        <br/>
                                        <LoginForm successCallback={handleLogin}/>
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

function LoginForm(props) {
    const {successCallback} = props;
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                axios({
                    method: 'post',
                    url: '/api/login',
                    data: values
                })
                    .then((response) => {
                        console.log(response);
                        setSubmitting(false);
                        successCallback();
                    })
                    .catch((response) => {
                        console.log(response);
                        setSubmitting(false);
                    });
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="email" name="email" className="input" placeholder="Email"/>
                    <ErrorMessage name="email" component="div"/>
                    <br/>
                    <Field type="password" name="password" className="input" placeholder="Mot de passe"/>
                    <ErrorMessage name="password" component="div"/>
                    <br/>
                    <button type="submit" disabled={isSubmitting}
                            className={classNames("button", {"is-loading": isSubmitting})}>
                        Se connecter
                    </button>
                </Form>
            )}
        </Formik>
    );
}

function SignupForm(props) {
    const {successCallback, failureCallback} = props;
    return (
        <Formik
            initialValues={{email: '', password: '', isAdmin: false}}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                axios({
                    method: 'post',
                    url: '/api/users',
                    data: values
                })
                    .then((response) => {
                        console.log(response);
                        setSubmitting(false);
                        successCallback();
                    })
                    .catch((response) => {
                        console.log(response);
                        setSubmitting(false);
                        failureCallback();
                    });
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="email" name="email" className="input" placeholder="Email"/>
                    <ErrorMessage name="email" component="div"/>
                    <br/>
                    <Field type="password" name="password" className="input" placeholder="Mot de passe"/>
                    <ErrorMessage name="password" component="div"/>
                    <br/>
                    <button type="submit" disabled={isSubmitting}
                            className={classNames("button", {"is-loading": isSubmitting})}>
                        S'inscrire
                    </button>
                </Form>
            )}
        </Formik>
    );

}

export default LoginPage;