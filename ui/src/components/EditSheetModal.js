import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import classNames from "classnames";
import EditSheetForm from "./forms/EditSheetForm";

CreateSheetModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function CreateSheetModal({isActive, toggle, connectedUser, sheet}) {
    const [sheetEditionStage, setSheetEditionStage] = useState("update");

    return (
        <div className={classNames("modal", {'is-active': isActive})}>
            <div className="modal-background" onClick={toggle}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Nouvelle fiche</p>
                    <button className="delete" aria-label="close" onClick={toggle}/>
                </header>
                <section className="modal-card-body has-text-centered">
                    {sheetEditionStage === "update" && <EditSheetForm setSheetEditionStage={setSheetEditionStage} connectedUser={connectedUser} sheet={sheet} successCallback={() => {
                            window.location.href="/"
                        }} failureCallback={() => {
                            alert("Une erreur s'est produite lors de l'édition de la fiche.")
                        }}/>}
                </section>
            </div>
        </div>
    );

}

export default CreateSheetModal;
