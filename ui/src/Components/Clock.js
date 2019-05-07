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

    return <h3>It is now {date.toLocaleTimeString()}</h3>;
}

// class Clock extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {date: new Date()}
//     }
//
//     componentDidMount() {
//         this.timerID = setInterval(
//             () => this.tick(),
//             1000
//         );
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }
//
//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }
//
//     render() {
//         return <h3>It is now {this.state.date.toLocaleTimeString()}</h3>
//     }
//
// }

export default Clock;