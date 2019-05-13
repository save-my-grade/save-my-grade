import React from 'react';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="content has-text-centered">
                <Link to="/">Back to hub</Link>
            </div>
        </footer>
    );

}

export default Footer;