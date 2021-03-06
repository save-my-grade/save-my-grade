import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";
import EditSheetModal from "../components/EditSheetModal";
import Breadcrumb from "../components/Breadcrumb";

function SheetPage({match, connectedUser}) {
    const sheetId = match.params.id;

    const [sheet, setSheet] = useState({});
    const [author, setAuthor] = useState(null);
    const [course, setCourse] = useState(null);
    const [isSheetLoading, setIsSheetLoading] = useState(true);
    useEffect(() => {
        setIsSheetLoading(true);
        axios({
            method: 'get',
            url: '/api/sheets/' + sheetId,
        })
            .then((response) => {
                let fetchedSheet = response.data.body;
                setSheet(fetchedSheet);
                fetchAuthor(fetchedSheet.authorId);
                fetchCourse(fetchedSheet.courseId);
                setIsSheetLoading(false)
            })
            .catch((e) => {
                alert(e);
            });
    }, [match.params.id]);

    const fetchAuthor = (authorId) => {
        axios({
            method: 'get',
            url: '/api/users/' + authorId,
        })
            .then((response) => {
                let author = response.data.body;
                setAuthor(author);
            })
    };

    const fetchCourse = (courseId) => {
        axios({
            method: 'get',
            url: '/api/courses/' + courseId,
        })
            .then((response) => {
                let course = response.data.body;
                setCourse(course);
            })
    };

    let tags = [];
    if (sheet.tags)
        tags = sheet.tags.split(',');


    const handleDelete = () => {
        axios({
            method: 'delete',
            url: '/api/sheets/' + sheetId,
        })
            .then(() => {
                window.location.href = "/"
            }).catch((e) => {
            alert(e);
        });
    };

    const [isEditSheetModalActive, setEditSheetModalActive] = useState(false);
    const handleEdit = () => {
        setEditSheetModalActive(!isEditSheetModalActive);
    };
    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            {!isSheetLoading && (
                <div className="page-content">
                    <section className="section">
                        {course && <Breadcrumb course={course} sheet={sheet}/>}
                        <div className="level">
                            <div className="level-left">
                                <h1 className="title">{sheet.name}</h1>
                            </div>
                            <div className="level-right">
                                {author && <h2 className="subtitle">{author.firstName + " " + author.lastName}</h2>}
                            </div>
                        </div>
                        <div className="tags">
                            {
                                tags.map((tag) => <span className="tag" key={Math.random()}>{tag}</span>)
                            }
                        </div>
                    </section>
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <img src={require("../../../user-files/sheets/" + sheet.filePath)} alt="sheet"
                                     style={{width: '100%'}}/>
                            </div>
                        </div>
                    </section>

                    <EditSheetModal isActive={isEditSheetModalActive}
                                    connectedUser={connectedUser} sheet={sheet} toggle={handleEdit}/>
                    {(sheet.authorId === connectedUser.id || connectedUser.isAdmin) && (
                        <div className="buttons">
                            <button onClick={handleEdit}
                                    className="button is-outlined is-info">
                                Modifier
                            </button>
                            <button onClick={handleDelete}
                                    className="button is-danger is-outlined">
                                Supprimer
                            </button>
                        </div>
                    )}
                </div>

            )}
        </React.Fragment>
    );

}

export default SheetPage;
