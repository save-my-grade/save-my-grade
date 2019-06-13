import React from 'react';
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";

CourseRenameModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    renamedCallback: PropTypes.func.isRequired
};

function CourseRenameModal({isActive, toggle, course, renamedCallback}) {
    function successCallback() {
        toggle();
        renamedCallback();
    }

    function failureCallback() {
        alert("Failure !");
    }

    return (
        <div className={classNames("modal", {'is-active': isActive})}>
            <div className="modal-background" onClick={toggle}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Renommer une matière</p>
                    <button className="delete" aria-label="close" onClick={toggle}/>
                </header>
                <section className="modal-card-body has-text-centered">
                    <Formik
                        initialValues={{
                            name: course.name,
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.name) {
                                errors.name = "Le nom de la matière ne peut pas être vide";
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            axios({
                                method: 'put',
                                url: '/api/courses/' + course.id,
                                data: values
                            })
                                .then(() => {
                                    setSubmitting(false);
                                    successCallback();
                                    resetForm();
                                })
                                .catch(() => {
                                    setSubmitting(false);
                                    failureCallback();
                                });
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <Field type="text" name="name" className="input" placeholder="Nom de la matière"/>
                                <ErrorMessage name="name" component="div"/>
                                <div style={{marginTop: 10}}/>
                                <button type="submit" disabled={isSubmitting}
                                        className={classNames("button", "is-info", {"is-loading": isSubmitting})}>
                                    Renommer la matière
                                </button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>
    );

}

export default CourseRenameModal;
