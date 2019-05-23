import React from 'react';
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CreateSheetForm from "./forms/CreateSheetForm";

CreateSheetModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function CreateSheetModal({isActive, toggle, connectedUser}) {
    return (
        <div className={classNames("modal", {'is-active': isActive})}>
            <div className="modal-background" onClick={toggle}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Nouvelle fiche</p>
                    <button className="delete" aria-label="close" onClick={toggle}/>
                </header>
                <section className="modal-card-body">
                    <CreateSheetForm connectedUser={connectedUser} successCallback={() => {
                        alert("Good")
                    }} failureCallback={() => {
                        alert("Not good")
                    }}/>
                </section>
            </div>
        </div>
    );

}

export default CreateSheetModal;
