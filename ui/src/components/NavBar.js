import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react';
import logo from "../images/logo_text.png"
import classNames from "classnames";
import Avatar from 'react-avatar';
import {NavLink} from "react-router-dom";

NavBar.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function NavBar({connectedUser}) {
    const [isActive, setActive] = useState(false);

    function toggleMenu() {
        isActive ? setActive(false) : setActive(true);
    }

    useEffect(() => {
        document.body.classList.add('has-navbar-fixed-top');
        return function cleanup() {
            document.body.classList.remove('has-navbar-fixed-top');
        }
    });

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"
             style={{backgroundColor: "#fafafa"}}>
            <div className="navbar-brand">
                <NavLink className="navbar-item" to="/home" style={{paddingLeft: "5%"}}>
                    <img src={logo} alt="logo"/>
                </NavLink>

                <span role="button" className={classNames("navbar-burger burger", {"is-active": isActive})}
                      aria-label="menu" aria-expanded="false"
                      data-target="navbarMenu" onClick={toggleMenu}>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </span>
            </div>
            <div id="navbarMenu" className={classNames("navbar-menu", {"is-active": isActive})}>
                <div className="navbar-end">
                    <a href="/home" className="navbar-item">
                        Ajouter une fiche
                    </a>
                    <NavLink to="/profile" className="navbar-item link">
                        <Avatar name={connectedUser.firstName} round={true} size={40}/>
                    </NavLink>
                </div>
            </div>
        </nav>

    );

}

export default NavBar;
