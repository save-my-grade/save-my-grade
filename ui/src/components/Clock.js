import React, {useState, useEffect} from 'react';

function Clock() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        let timerID = setInterval(
            () => tick(),
            1000
        );
        return () => {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(new Date());
    }

    return <h3 className="title is-3 has-text-danger">It is now {date.toLocaleTimeString()}</h3>;
}
export default Clock;