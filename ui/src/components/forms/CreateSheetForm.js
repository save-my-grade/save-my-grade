import PropTypes from 'prop-types'
import React from 'react';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import classNames from "classnames";

CreateSheetForm.propTypes = {
    failureCallback: PropTypes.func.isRequired,
    successCallback: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function CreateSheetForm({connectedUser, successCallback, failureCallback}) {
    return (
        <Formik
            initialValues={{authorId: connectedUser.id, courseId: '', name: '', tags: ''}}
            validate={values => {
                let errors = {};
                if (!values.courseId) {
                    errors.courseId = "Vous devez sélectionner une matière";
                }
                if (!values.name) {
                    errors.name = "Vous devez donner un nom à votre fiche";
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                axios({
                    method: 'post',
                    url: '/api/sheets',
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
                    <Field type="text" name="file" className="input" placeholder="Fichier PDF, PNG..." disabled/>
                    <div style={{marginTop: 10}}/>
                    <Field type="text" name="name" className="input" placeholder="Nom de la fiche"/>
                    <ErrorMessage name="name" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <div className="select">
                        <Field component="select" name="courseId" placeholder="Matière">
                            <option value={"maths"}>Mathématiques</option>
                            <option value={"physique"}>Physique</option>
                            <option value={"java"}>Java</option>
                        </Field>
                    </div>
                    <ErrorMessage name="courseId" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <button type="submit" disabled={isSubmitting}
                            className={classNames("button", "is-info", {"is-loading": isSubmitting})}>
                        Mettre en ligne
                    </button>
                </Form>
            )}
        </Formik>
    );

}

export default CreateSheetForm;

