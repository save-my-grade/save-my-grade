import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import axios from "axios";
import Loader from "../../components/Loader";

AdminUsersPage.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function AdminUsersPage({connectedUser}) {
    const [users, setUsers] = useState(null);
    const [areUsersLoading, setAreUsersLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        setAreUsersLoading(true);
        axios({
            method: 'get',
            url: '/api/users',
        })
            .then((response) => {
                let fetchedUsers = response.data.body;
                setUsers(fetchedUsers);
                setAreUsersLoading(false)
            }).catch((e) => {
            alert(e);
        })
    }

    return (
        <div>
            <NavBar connectedUser={connectedUser}/>
            <div className="page-content">
                <h1 className="title" style={{paddingTop: 40}}>Utilisateurs</h1>
                {areUsersLoading ? (<Loader/>) : (
                    <table className="table is-bordered is-fullwidth">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Oui" : "Non"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminUsersPage;
