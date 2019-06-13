import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import axios from "axios";
import Loader from "../components/Loader";

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

    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            {isUserLoading ? (<Loader/>) : (
                <div className="page-content">
                    <section className="section">
                        <h1 className="title">{isOwnProfile ? "Mon profil" : user.firstName ? "Profil de " + user.firstName : "Profil n°" + user.id}</h1>
                        <h3>{user.firstName}</h3>
                        {user.lastName && <h3>{user.lastName}</h3>}
                        <h3>{user.email}</h3>
                    </section>
                    {isOwnProfile && <section className="section">
                        <button className="button is-danger" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </section>}
                </div>
            )}
        </div>
    );

}

export default ProfilePage;
