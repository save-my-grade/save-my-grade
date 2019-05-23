import PropTypes from 'prop-types'
import React, {useState} from 'react';
import logo from "../images/logo_text.png"
import classNames from "classnames";
import Avatar from 'react-avatar';

NavBar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    connectedUser: PropTypes.object.isRequired
};

function NavBar({handleLogout, connectedUser}) {
    const [isActive, setActive] = useState(false);

    function toggleMenu() {
        isActive ? setActive(false) : setActive(true);
    }

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"
             style={{backgroundColor: "#fafafa"}}>
            <div className="navbar-brand">
                <a className="navbar-item" href="/home/" style={{paddingLeft: "5%"}}>
                    <img src={logo} alt="logo"/>
                </a>

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
                    <a href="/home/" className="navbar-item">
                        Ajouter une fiche
                    </a>
                    <a href="/home/" className="navbar-item link" onClick={() => {
                        handleLogout()
                    }}>
                        <Avatar name={connectedUser.firstName} round={true} size={40}/>
                    </a>
                </div>
            </div>
        </nav>

    );

}

export default NavBar;
