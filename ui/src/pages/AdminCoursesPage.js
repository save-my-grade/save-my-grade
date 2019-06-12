import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from "../components/Loader";
import CourseCreator from "../components/forms/CourseCreator";

AdminCoursesPage.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function AdminCoursesPage({connectedUser}) {
    const [courses, setCourses] = useState({});
    const [areCoursesLoading, setAreCoursesLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    function fetchCourses() {
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
    }

    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            {
                areCoursesLoading ? (
                    <Loader/>
                ) : (
                    courses.map((course) =>
                        <CourseItem name={course.name}/>
                    )
                )
            }
            <CourseCreator successCallback={fetchCourses}/>
        </React.Fragment>
    );
}

function CourseItem({name}) {
    return <li>{name}</li>
}

export default AdminCoursesPage;