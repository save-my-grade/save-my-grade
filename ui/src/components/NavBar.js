import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import logo from "../images/logo_text.png"
import classNames from "classnames";
import Avatar from 'react-avatar';
import {NavLink} from "react-router-dom";
import CreateSheetModal from "./CreateSheetModal";

NavBar.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function NavBar({connectedUser}) {
    useEffect(() => {
        document.body.classList.add('has-navbar-fixed-top');
        return function cleanup() {
            document.body.classList.remove('has-navbar-fixed-top');
        }
    });

    const [isMenuActive, setMenuActive] = useState(false);

    function toggleMenu() {
        isMenuActive ? setMenuActive(false) : setMenuActive(true);
    }

    const [isCreateSheetModalActive, setCreateSheetModalActive] = useState(false);
    const toggleCreateSheetModal = () => {
        setCreateSheetModalActive(!isCreateSheetModalActive);
    };


    return (
        <React.Fragment>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"
                 style={{backgroundColor: "#fafafa"}}>
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="/home" style={{paddingLeft: "5%"}}>
                        <img src={logo} alt="logo"/>
                    </NavLink>

                    <span role="button" className={classNames("navbar-burger burger", {"is-active": isMenuActive})}
                          aria-label="menu" aria-expanded="false"
                          data-target="navbarMenu" onClick={toggleMenu}>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </span>
                </div>
                <div id="navbarMenu" className={classNames("navbar-menu", {"is-active": isMenuActive})}>
                    <div className="navbar-end">
                        <button onClick={toggleCreateSheetModal}
                                className="navbar-item button is-text has-text-info"
                                style={{height: '100%'}}>
                            Ajouter une fiche
                        </button>
                        <NavLink to="/profile" className="navbar-item link">
                            <Avatar name={connectedUser.firstName} round={true} size={40}/>
                        </NavLink>
                    </div>
                </div>
            </nav>
            <CreateSheetModal isActive={isCreateSheetModalActive} toggle={toggleCreateSheetModal}
                              connectedUser={connectedUser}/>
        </React.Fragment>
    );

}

export default NavBar;
