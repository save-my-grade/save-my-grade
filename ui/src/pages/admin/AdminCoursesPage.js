import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from "../../components/Loader";
import CourseCreator from "../../components/forms/CourseCreator";
import CourseRenameModal from "../../components/CourseRenameModal";

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

    const [isRenameModalActive, setRenameModalActive] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    function renameCourse(course) {
        setSelectedCourse(course);
        setRenameModalActive(true);
    }

    function renamedCallback() {
        fetchCourses();
        setSelectedCourse(null);
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
                            <CourseItems courses={courses} renameCourse={renameCourse} cycle="prep"/>
                        </div>

                        <div className="column">
                            <h1 className="title is-4">CII</h1>
                            <CourseItems courses={courses} renameCourse={renameCourse} cycle="cii"/>
                        </div>

                        <div className="column">
                            <h1 className="title is-4">Cycle Ingénieur</h1>
                            <CourseItems courses={courses} renameCourse={renameCourse} cycle="ing"/>
                        </div>
                    </div>
                )
            }
            <CourseCreator successCallback={fetchCourses}/>

            {selectedCourse &&
            <CourseRenameModal isActive={isRenameModalActive} course={selectedCourse} toggle={() => {
                setRenameModalActive(!isRenameModalActive);
                if (!isRenameModalActive)
                    setSelectedCourse(null)
            }} renamedCallback={renamedCallback}/>}
        </React.Fragment>
    );
}

CourseItems.propTypes = {
    courses: PropTypes.array.isRequired,
    cycle: PropTypes.string.isRequired,
    renameCourse: PropTypes.func.isRequired
};

function CourseItems({courses, cycle, renameCourse}) {
    return (
        <table className="table">
            <tbody>
            {
                courses.filter(course => course.cycle === cycle).map((course) =>
                    <CourseItem course={course} renameCourse={() => {
                        renameCourse(course)
                    }} key={course.id}/>
                )
            }
            </tbody>
        </table>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
    renameCourse: PropTypes.func.isRequired
};

function CourseItem({course, renameCourse}) {
    return (
        <tr>
            <th>{course.name}</th>
            <td>
                <button className="button is-primary" onClick={() => renameCourse(course)}>Renommer</button>
            </td>
            <td>
                <button className="button is-danger">Supprimer</button>
            </td>
        </tr>
    )
}

export default AdminCoursesPage;