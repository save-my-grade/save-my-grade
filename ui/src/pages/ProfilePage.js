import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";
import Loader from "../components/Loader";
import ProfileForm from "../components/forms/ProfileForm";

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
    connectedUser: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
};

function ProfilePage({match, handleLogout, connectedUser}) {
    const userId = match.params.id;
    const isOwnProfile = connectedUser.id === parseInt(userId);

    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        setIsUserLoading(true);
        axios({
            method: 'get',
            url: '/api/users/' + userId,
        })
            .then((response) => {
                let fetchedUser = response.data.body;
                setUser(fetchedUser);
                setIsUserLoading(false);
            })
            .catch((e) => {
                alert(e);
            });
    }

    const [isEditing, setIsEditing] = useState(false);

    function editedCallback() {
        setIsEditing(false);
        fetchUser();
    }

    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            {isUserLoading ? (<Loader/>) : (
                <div className="page-content">
                    {
                        isEditing ? (
                            <ProfileForm user={user} adminRights={connectedUser.isAdmin}
                                         successCallback={editedCallback}/>
                        ) : (
                            <React.Fragment>
                                <section className="section">
                                    <h1 className="title">{isOwnProfile ? "Mon profil" : user.firstName ? "Profil de " + user.firstName : "Profil n°" + user.id}</h1>
                                    <h3 className="subtitle"><b>Prénom : </b>{user.firstName}</h3>
                                    {user.lastName && <h3 className="subtitle"><b>Nom : </b>{user.lastName}</h3>}
                                    <h3 className="subtitle"><b>Email : </b>{user.email}</h3>
                                    {connectedUser.isAdmin &&
                                    <h3 className="subtitle"><b>Administrateur : </b>{user.isAdmin ? "Oui" : "Non"}
                                    </h3>}
                                </section>
                                <section className="section">
                                    <div className="buttons">
                                        <button className="button is-info" onClick={() => {
                                            setIsEditing(true)
                                        }}>
                                            Modifier les informations
                                        </button>
                                        {isOwnProfile && <button className="button is-danger" onClick={handleLogout}>
                                            Déconnexion
                                        </button>}
                                    </div>
                                </section>
                            </React.Fragment>
                        )
                    }
                </div>
            )}
        </div>
    );

}

export default ProfilePage;
