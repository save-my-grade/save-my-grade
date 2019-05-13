import React from "react";
import PropTypes from 'prop-types';

function CourseLink(props) {
    const {to, text} = props;
    return (
        <a href={to} className="button is-medium is-fullwidth" style={{marginBottom: "1.5rem"}}>{text}</a>
    );

}

CourseLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default CourseLink;