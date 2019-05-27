import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";
import EditSheetModal from "../components/EditSheetModal";

function SheetPage({match, connectedUser}) {
    const sheetId = match.params.id;

    const [sheet, setSheet] = useState({});
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
                setIsSheetLoading(false)
            }).catch((e) => {
            alert(e);
        });
    }, [match.params.id]);

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
    const handleEdit=() =>{
        setEditSheetModalActive(!isEditSheetModalActive);
    };
    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            {!isSheetLoading && (
                <div className="page-content">
                    <section className="section">
                        <h1 className="title">{sheet.name}</h1>
                        <div className="tags">
                            {
                                tags.map((tag) => <span className="tag" key={Math.random()}>{tag}</span>)
                            }
                        </div>
                    </section>
                    <section className="section">
                        <img src={require("../../../user-files/sheets/" + sheet.filePath)} alt="sheet"/>
                    </section>
                    <button onClick={handleDelete}
                            className="button is-danger is-outlined">
                        Supprimer
                    </button>

                    <button onClick={handleEdit}
                            className="button is-outlined">
                        Modifier
                    </button>

                <EditSheetModal isActive={isEditSheetModalActive}
                connectedUser={connectedUser} sheet={sheet} toggle={handleEdit}/>
                </div>

            )}
        </React.Fragment>
    );

}

export default SheetPage;
