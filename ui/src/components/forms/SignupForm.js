import PropTypes from 'prop-types'
import React from 'react';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import classNames from "classnames";

SignupForm.propTypes = {
    failureCallback: PropTypes.func.isRequired,
    successCallback: PropTypes.func.isRequired
};

function SignupForm(props) {
    const {successCallback, failureCallback} = props;
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isAdmin: false}}
            validate={values => {
                let errors = {};
                if (!values.firstName) {
                    errors.firstName = "Le prénom ne peut pas être vide";
                }
                if (!values.email) {
                    errors.email = "L'email ne peut pas être vide";
                }
                if (!values.password) {
                    errors.password = "Le mot de passe ne peut pas être vide";
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                axios({
                    method: 'post',
                    url: '/api/users',
                    data: values
                })
                    .then(() => {
                        setSubmitting(false);
                        successCallback();
                    })
                    .catch(() => {
                        setSubmitting(false);
                        failureCallback();
                    });
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="firstName" className="input" placeholder="Prénom (obligatoire)"/>
                    <ErrorMessage name="firstName" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <Field type="text" name="lastName" className="input" placeholder="Nom"/>
                    <ErrorMessage name="lastName" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <Field type="email" name="email" className="input" placeholder="Email (obligatoire)"/>
                    <ErrorMessage name="email" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <Field type="password" name="password" className="input" placeholder="Mot de passe (obligatoire)"/>
                    <ErrorMessage name="password" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <button type="submit" disabled={isSubmitting}
                            className={classNames("button", "is-info", {"is-loading": isSubmitting})}>
                        {"S'inscrire"}
                    </button>
                </Form>
            )}
        </Formik>
    );

}

export default SignupForm;

