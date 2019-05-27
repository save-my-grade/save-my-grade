import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";
import SheetCard from "../components/SheetCard";
import Loader from "../components/Loader";
import {NavLink} from "react-router-dom";

function CoursePage({match, connectedUser}) {
    const [course, setCourse] = useState({});
    const [isCourseLoading, setIsCourseLoading] = useState(true);
    useEffect(() => {
        setIsCourseLoading(true);
        axios({
            method: 'get',
            url: '/api/courses/' + match.params.id,
        })
            .then((response) => {
                let fetchedCourse = response.data.body;
                setCourse(fetchedCourse);
                setIsCourseLoading(false)
            }).catch((e) => {
            alert(e);
        })
    }, [match.params.id]);

    const [sheets, setSheets] = useState([]);
    const [areSheetsLoading, setAreSheetsLoading] = useState(true);
    useEffect(() => {
        setAreSheetsLoading(true);
        axios({
            method: 'get',
            url: '/api/courses/' + match.params.id + '/sheets',
        })
            .then((response) => {
                let fetchedSheets = response.data.body;
                setSheets(fetchedSheets);
                setAreSheetsLoading(false)
            }).catch((e) => {
            alert(e);
        })
    }, [match.params.id]);

    const cycleFromCode = (code) => { //TODO: remove duplicate
        if (code === 'cii') {
            return "CII";
        } else if (code === 'prep') {
            return "Prépa intégrée";
        } else {
            return "Cycle ingénieur";
        }
    };

    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            <div className="page-content">
                <section className="section">
                    {!isCourseLoading && (
                        <div>
                            <nav className="breadcrumb" aria-label="breadcrumbs">
                                <ul>
                                    <li><NavLink to={"/"}>{cycleFromCode(course.cycle)}</NavLink></li>
                                    <li className="is-active"><NavLink
                                        to={"/courses/" + course.id}>{course.name}</NavLink></li>
                                </ul>
                            </nav>
                            <h1 className="title">{course.name}</h1>
                        </div>
                    )}
                </section>
                <section className="section has-text-centered">
                    {areSheetsLoading ? (<Loader/>) :
                        sheets.length ? sheets.map(
                            (sheet) => <SheetCard sheet={sheet} to={"/sheet/" + sheet.id} key={sheet.id}/>
                        ) : (
                            <h2 className="subtitle">Il n'y a pas encore de fiche pour cette matière.</h2>
                        )}
                </section>
            </div>
        </React.Fragment>

    );
}

export default CoursePage;