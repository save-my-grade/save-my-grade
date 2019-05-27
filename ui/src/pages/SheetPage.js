import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";

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
        })
    }, [match.params.id]);
    const sheetPath="../../../user-files/sheets/"+sheet.filePath;
    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            {!isSheetLoading && (
                <div className="page-content">
                    <section className="section">
                        <h1 className="title">{sheet.name}</h1>
                    </section>
                    <section className="section">
                        <img src={require(sheetPath)}  alt="sheet"></img>
                    </section>
                </div>
            )}
        </React.Fragment>
    );

}

//sheet.filePath
export default SheetPage;
