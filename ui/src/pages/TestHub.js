import React from 'react';
import {Link} from "react-router-dom";

function TestHub() {
    return (
        <div>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">Test Hub</h1>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <nav className="subtitle is-4">
                        <ul>
                            <li>
                                <Link to="/login/">Login page</Link>
                            </li>
                            <li>
                                <Link to="/test/">Test page</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );

}

export default TestHub;