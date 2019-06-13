import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from 'axios';
import classNames from 'classnames';

function ProfileForm({user, adminRights, successCallback}) {
    return (
        <section className="section">
            <h1 className="title">
                Edition du profil
            </h1>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin
                }}
                validate={values => {
                    let errors = {};
                    if (!values.firstName) {
                        errors.firstName = "Le prénom ne peut pas être vide";
                    }
                    if (!values.email) {
                        errors.email = "L'email ne peut pas être vide";
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    axios({
                        method: 'put',
                        url: '/api/users/' + user.id,
                        data: values
                    })
                        .then(() => {
                            setSubmitting(false);
                            successCallback();
                        })
                        .catch(() => {
                            setSubmitting(false);
                            alert("Il y a eu une erreur lors de l'édition du profil");
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
                        <button type="submit" disabled={isSubmitting}
                                className={classNames("button", "is-info", {"is-loading": isSubmitting})}>
                            Valider les changements
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );

}

export default ProfileForm;