import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from "../../components/Loader";
import CourseCreator from "../../components/forms/CourseCreator";

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
                    <div className="columns is-multiline">
                        <div className="column">
                            <h1 className="title is-4">Prépa Intégrée</h1>
                            <CourseItems courses={courses} cycle="prep"/>
                        </div>

                        <div className="column">
                            <h1 className="title is-4">CII</h1>
                            <CourseItems courses={courses} cycle="cii"/>
                        </div>

                        <div className="column">
                            <h1 className="title is-4">Cycle Ingénieur</h1>
                            <CourseItems courses={courses} cycle="ing"/>
                        </div>
                    </div>
                )
            }
            <CourseCreator successCallback={fetchCourses}/>
        </React.Fragment>
    );
}

CourseItems.propTypes = {
    courses: PropTypes.array.isRequired,
    cycle: PropTypes.string.isRequired
};

function CourseItems({courses, cycle}) {
    return (
        <table className="table">
            <tbody>
            {
                courses.filter(course => course.cycle === cycle).map((course) =>
                    <CourseItem name={course.name} key={course.id}/>
                )
            }
            </tbody>
        </table>
    )
}

CourseItem.propTypes = {
    name: PropTypes.string.isRequired
};

function CourseItem({name}) {
    return (
        <tr>
            <th>{name}</th>
            <td>
                <button className="button is-primary">Renommer</button>
            </td>
            <td>
                <button className="button is-danger">Supprimer</button>
            </td>
        </tr>
    )
}

export default AdminCoursesPage;