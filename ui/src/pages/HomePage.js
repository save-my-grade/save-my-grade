import React, {useState, useEffect} from 'react';
import logo from "../images/logo_text.png"
import classNames from "classnames";

function HomePage() {
    const [isActive, setActive] = useState(false);

    function toggleMenu() {
        isActive ? setActive(false) : setActive(true);
    }

    const [selectedCycle, setSelectedCycle] = useState("prep");

    function selectCycle(str) {
        setSelectedCycle("str");
    }

    useEffect(() => {
        document.body.classList.add('has-navbar-fixed-top');
        return function cleanup() {
            document.body.classList.remove('has-navbar-fixed-top');
        }
    });
    return (
        <div>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"
                 style={{backgroundColor: "#fafafa"}}>
                <div className="navbar-brand">
                    <a className="navbar-item" href="/home/" style={{paddingLeft: "5%"}}>
                        <img src={logo} alt="logo"/>
                    </a>

                    <a role="button" className={classNames("navbar-burger burger", {"is-active": isActive})}
                       aria-label="menu" aria-expanded="false"
                       data-target="navbarMenu" onClick={toggleMenu}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarMenu" className={classNames("navbar-menu", {"is-active": isActive})}>
                    <div className="navbar-end">
                        <a className="navbar-item">
                            Ajouter une fiche
                        </a>
                    </div>
                </div>
            </nav>
            <div className="page-content" style={{paddingTop: 40}}>
                <h1 className="title">Matières</h1>
                <div className="buttons has-addons">
                    <span className={classNames("button", {"is-info is-selected": selectedCycle === "prep"})}
                          onClick={() => setSelectedCycle("prep")}>Prépa</span>
                    <span className={classNames("button", {"is-info is-selected": selectedCycle === "cii"})}
                          onClick={() => setSelectedCycle("cii")}>CII</span>
                    <span className={classNames("button", {"is-info is-selected": selectedCycle === "ing"})}
                          onClick={() => setSelectedCycle("ing")}>Cycle ingénieur</span>
                </div>
            </div>
        </div>
    );

}

export default HomePage;