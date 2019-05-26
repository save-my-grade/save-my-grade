import React from "react";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

function CourseLink(props) {
    const {to, text} = props;
    return (
        <NavLink to={to} className="button is-medium is-fullwidth" style={{marginBottom: "1.5rem"}}>{text}</NavLink>
    );

}

CourseLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default CourseLink;