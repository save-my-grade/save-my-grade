import React from 'react';
import {NavLink} from "react-router-dom";

function SheetCard({sheet,to}) {
    let tags = [];
    if (sheet.tags)
        tags = sheet.tags.split(',');
    return (
        <NavLink to={to}  className="box has-text-centered">
            <h2 className="title is-4">{sheet.name}</h2>
            {tags.length > 0 && <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="tags">
                    {
                        tags.map((tag) => <span className="tag" key={Math.random()}>{tag}</span>)
                    }
                </div>
            </div>}
        </NavLink>
    );
}

export default SheetCard;