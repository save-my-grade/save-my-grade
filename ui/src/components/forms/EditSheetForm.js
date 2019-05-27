import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import classNames from "classnames";

NewSheetInfoForm.propTypes = {
    failureCallback: PropTypes.func.isRequired,
    successCallback: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function CourseOptions({courses, selectedCycle}) {
    return (
        <React.Fragment>
            {courses.map((course) =>
                course.cycle === selectedCycle && <option value={course.id} key={course.id}>{course.name}</option>)}
        </React.Fragment>
    );

}

function NewSheetInfoForm({setSheetEditionStage,sheet,connectedUser, successCallback, failureCallback}) {
    const [selectedCycle, setSelectedCycle] = useState("");
    const [areCoursesLoading, setAreCoursesLoading] = useState(true);
    const [courses, setCourses] = useState({});
    useEffect(() => {
        setAreCoursesLoading(true);
        axios({
            method: 'get',
            url: '/api/courses',
        })
            .then((response) => {
                let fetchedCourses = response.data.body;
                setCourses(fetchedCourses);
                setAreCoursesLoading(false)
            }).catch((e) => {
            alert(e);
        })
    }, []);


    return (
        <Formik
            initialValues={{
                id: sheet.id,
                authorId: connectedUser.id,
                courseId: '',
                name: '',
                tags: '',
                filePath: sheet.filePath
            }}
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
            onSubmit={(values, {setSubmitting, resetForm}) => {
                axios({
                    method: 'put',
                    url: '/api/sheets/' + sheet.id,
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
                    <Field type="text" name="file" className="input" placeholder="Fichier PDF, PNG..." disabled/>
                    <div style={{marginTop: 10}}/>
                    <Field type="text" name="name" className="input" placeholder="Nom de la fiche"/>
                    <ErrorMessage name="name" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <div className={classNames("select", {'is-loading': areCoursesLoading})} style={{width: '100%'}}>
                        <select name="cycle" placeholder="Cycle" style={{width: '100%'}}
                                onChange={(e) => setSelectedCycle(e.target.value)}
                                value={selectedCycle}
                                disabled={areCoursesLoading}>
                            <option value="" disabled hidden>Cycle</option>
                            <option value={"prep"}>Prépa</option>
                            <option value={"cii"}>CII</option>
                            <option value={"ing"}>Ingé</option>
                        </select>
                    </div>
                    <div style={{marginTop: 10}}/>
                    <div className={classNames("select", {'is-loading': areCoursesLoading})} style={{width: '100%'}}>
                        <Field component="select" name="courseId" placeholder="Matière" style={{width: '100%'}}
                               disabled={areCoursesLoading || selectedCycle === ""}>
                            <option value="" disabled hidden>Matière</option>
                            {!areCoursesLoading && <CourseOptions courses={courses} selectedCycle={selectedCycle}/>}
                        </Field>
                    </div>
                    <ErrorMessage name="courseId" component="div"/>
                    <div style={{marginTop: 10}}/>
                    <Field type="text" name="tags" className="input"
                           placeholder="Tags (chapitre, sujet...) séparés d'une virgule"/>
                    <div style={{marginTop: 10}}/>
                    <button type="submit" disabled={isSubmitting}
                            className={classNames("button", "is-info", {"is-loading": isSubmitting})}>
                        Mettre à jour
                    </button>
                </Form>
            )}
        </Formik>
    );

}

export default NewSheetInfoForm;

