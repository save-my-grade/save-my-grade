import PropTypes from 'prop-types'
import React from "react";
import NavBar from "../../components/NavBar";
import {NavLink} from "react-router-dom";

AdminHubPage.propTypes = {
    connectedUser: PropTypes.object
};

function AdminHubPage({connectedUser}) {
    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            <div className="page-content">
                <h1 className="title" style={{paddingTop: 40}}>Espace administrateur</h1>
                <NavLink to="/admin/courses">
                    <h2 className="subtitle is-4 has-text-link">Gestion des matières</h2>
                </NavLink>
                <div style={{height: 20}}/>
                <NavLink to="/admin/users">
                    <h2 className="subtitle is-4 has-text-link">Gestion des utilisateurs</h2>
                </NavLink>
            </div>
        </div>
    );
}

export default AdminHubPage;
