import React from 'react';

function SheetCard({sheet}) {
    let tags = [];
    if (sheet.tags)
        tags = sheet.tags.split(',');
    return (
        <div className="box has-text-centered">
            <h2 className="title is-4">{sheet.name}</h2>
            {tags.length > 0 && <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="tags">
                    {
                        tags.map((tag) => <span className="tag" key={Math.random()}>{tag}</span>)
                    }
                </div>
            </div>}
        </div>
    );
}

export default SheetCard;