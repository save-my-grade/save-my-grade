import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import classNames from "classnames";
import NewSheetInfoForm from "./forms/NewSheetInfoForm";
import UploadSheetForm from "./forms/UploadSheetForm";

CreateSheetModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function CreateSheetModal({isActive, toggle, connectedUser}) {
    const [sheetCreationStage, setSheetCreationStage] = useState("upload");
    const [draftSheet, setDraftSheet] = useState({});

    function handleUploadSuccess(draftSheet) {
        setDraftSheet(draftSheet);
        setSheetCreationStage("info");
    }

    return (
        <div className={classNames("modal", {'is-active': isActive})}>
            <div className="modal-background" onClick={toggle}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Nouvelle fiche</p>
                    <button className="delete" aria-label="close" onClick={toggle}/>
                </header>
                <section className="modal-card-body has-text-centered">
                    {sheetCreationStage === "upload" ? (
                        <UploadSheetForm handleUploadSuccess={handleUploadSuccess}/>
                    ) : (
                        <NewSheetInfoForm connectedUser={connectedUser} draftSheet={draftSheet} successCallback={() => {
                            alert("Fiche créée avec succès !");
                            toggle();
                        }} failureCallback={() => {
                            alert("Une erreur s'est produite lors de la création de la fiche.")
                        }}/>
                    )}
                </section>
            </div>
        </div>
    );

}

export default CreateSheetModal;
