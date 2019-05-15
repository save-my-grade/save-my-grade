import React, {useState, useEffect} from 'react';
import logo from "../images/logo_text.png"
import classNames from "classnames";
import PropTypes from 'prop-types';
import CourseLink from "../components/CourseLink";
import Avatar from 'react-avatar';


function HomePage({handleLogout}) {
    const [isActive, setActive] = useState(false);

    function toggleMenu() {
        isActive ? setActive(false) : setActive(true);
    }

    const [selectedCycle, setSelectedCycle] = useState("prep");

    useEffect(() => {
        document.body.classList.add('has-navbar-fixed-top');
        return function cleanup() {
            document.body.classList.remove('has-navbar-fixed-top');
        }
    });

    function CycleButton(props) {
        const {code, text} = props;
        return (
            <span className={classNames("button", {"is-info is-selected": selectedCycle === code})}
                  onClick={() => setSelectedCycle(code)}>{text}</span>
        );
    }

    CycleButton.propTypes = {
        code: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    return (
        <div>
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
                            <Avatar name="Mark Zuckerberg" round={true} size={40}/>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="page-content">
                <section className="section">
                    <h1 className="title">Matières</h1>
                    <div className="buttons has-addons">
                        <CycleButton code="prep" text="Prépa"/>
                        <CycleButton code="cii" text="CII"/>
                        <CycleButton code="ing" text="Cycle ingénieur"/>
                    </div>
                </section>
                <section className="section">
                    <CourseLink to="#" text="Physique"/>
                    <CourseLink to="#" text="Mathématiques"/>
                </section>
            </div>
        </div>
    );

}

export default HomePage;