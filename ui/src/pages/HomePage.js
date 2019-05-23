import React, {useState} from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import CourseLink from "../components/CourseLink";
import NavBar from "../components/NavBar";


HomePage.propTypes = {
    connectedUser: PropTypes.object.isRequired
};

function HomePage({connectedUser}) {

    const [selectedCycle, setSelectedCycle] = useState("prep");

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
            <NavBar connectedUser={connectedUser}/>
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