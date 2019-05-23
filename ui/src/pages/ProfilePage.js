import PropTypes from 'prop-types'
import React from 'react';
import NavBar from "../components/NavBar";

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
        </React.Fragment>
    );

}

export default ProfilePage;
