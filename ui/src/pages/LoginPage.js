import React, {useState} from 'react';
import logo_text from "../images/logo_text.png";
import {ErrorMessage, Field, Form, Formik} from "formik";

function LoginPage({handleLogin}) {
    const [signUpFormVisibility, setSignUpFormVisibility] = useState(false);
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
                                <br/>
                                <button className="button is-link is-large is-outlined"
                                        style={{marginTop: 10}}
                                        onClick={() => setSignUpFormVisibility(true)}>
                                    Inscription
                                </button>
                                {signUpFormVisibility && <SignupForm/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SignupForm() {
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
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <button type="submit" disabled={isSubmitting}>
                        S'inscrire
                    </button>
                </Form>
            )}
        </Formik>
    );

}

export default LoginPage;