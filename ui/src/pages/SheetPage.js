import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";

function SheetPage({match, connectedUser}) {
    const sheetId = match.params.id;
    
    const [sheet, setSheet] = useState({});
    const [author, setAuthor] = useState({});
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
    

        var test=() =>{
            axios({
                method: 'delete',
                url: '/api/sheets/' + sheetId,
            })
                .then((response) => {
                    window.location.href="/"
                }).catch((e) => {
                alert(e);
            });
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
                        <img src={require("../../../user-files/sheets/"+sheet.filePath)}  alt="sheet"></img>
                    </section>
                    <button onClick={test}>
                        Delete
                    </button>
                </div>
            )}
        </React.Fragment>
    );

}

export default SheetPage;
