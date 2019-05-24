import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import CourseLink from "../components/CourseLink";
import NavBar from "../components/NavBar";
import axios from "axios";
import Loader from "../components/Loader";


HomePage.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function HomePage({connectedUser}) {

    const [selectedCycle, setSelectedCycle] = useState("prep");

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

    CycleButton.propTypes = {
        code: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    function CycleButton(props) {
        const {code, text} = props;
        return (
            <span className={classNames("button", {"is-info is-selected": selectedCycle === code})}
                  onClick={() => setSelectedCycle(code)}>{text}</span>
        );
    }

    function CourseLinks({courses, selectedCycle}) {
        return (
            <React.Fragment>
                {courses.map((course) =>
                    course.cycle === selectedCycle &&
                    <CourseLink to={"/courses/" + course.id} text={course.name} key={course.id}/>)}
            </React.Fragment>
        );

    }

    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            <div className="page-content">
                <section className="section">
                    <h1 className="title">Matières</h1>
                    <div className="buttons has-addons">
                        <CycleButton code="prep" text="Prépa"/>
                        <CycleButton code="cii" text="CII"/>
                        <CycleButton code="ing" text="Cycle ingénieur"/>
                    </div>
                </section>
                <section className="section">
                    {
                        areCoursesLoading ?
                            (
                                <Loader/>
                            ) : (
                                <CourseLinks courses={courses} selectedCycle={selectedCycle}/>
                            )
                    }
                </section>
            </div>
        </div>
    );

}

export default HomePage;