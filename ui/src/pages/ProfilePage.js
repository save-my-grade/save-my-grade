import PropTypes from 'prop-types'
import React from 'react';
import NavBar from "../components/NavBar";
import {NavLink} from "react-router-dom";

ProfilePage.propTypes = {
    connectedUser: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
};

function ProfilePage({handleLogout, connectedUser}) {
    return (
        <React.Fragment>
            <NavBar connectedUser={connectedUser}/>
            <section className="section">
                <h1 className="title">Mon profil</h1>
                <h3>{connectedUser.firstName}</h3>
                {connectedUser.lastName && <h3>{connectedUser.lastName}</h3>}
                <h3>{connectedUser.email}</h3>
            </section>
            <section className="section">
                <button className="button is-danger" onClick={handleLogout}>
                    Déconnexion
                </button>
            </section>
            <NavLink to="/sheet/13773" className="navbar-item link">
                <h1>test</h1>
            </NavLink>
        </React.Fragment>
    );

}

export default ProfilePage;
