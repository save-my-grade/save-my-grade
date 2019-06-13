import PropTypes from 'prop-types'
import React from 'react';
import NavBar from "../../components/NavBar";

AdminUsersPage.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function AdminUsersPage({connectedUser}) {
    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            <div className="page-content">
                <h1 className="title" style={{paddingTop: 40}}>Utilisateurs</h1>
                <table className="table">
                </table>
            </div>
        </div>
    );
}

export default AdminUsersPage;
