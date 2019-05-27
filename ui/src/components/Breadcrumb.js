import PropTypes from 'prop-types'
import React from 'react';
import {NavLink} from "react-router-dom";
import classNames from "classnames";


const cycleFromCode = (code) => {
    if (code === 'cii') {
        return "CII";
    } else if (code === 'prep') {
        return "Prépa intégrée";
    } else {
        return "Cycle ingénieur";
    }
};

Breadcrumb.propTypes = {
    course: PropTypes.object.isRequired,
    sheet: PropTypes.object
};

function Breadcrumb({course, sheet}) {
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><NavLink to={"/"}>{cycleFromCode(course.cycle)}</NavLink></li>
                <li className={classNames({'is-active': !sheet})}><NavLink
                    to={"/courses/" + course.id}>{course.name}</NavLink></li>
                {sheet && <li className="is-active"><a href="#" aria-current="page">{sheet.name}</a></li>}
            </ul>
        </nav>
    );

}

export default Breadcrumb;
