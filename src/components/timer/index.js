import React from 'react';
import ElapsedTime from './elapsed-time';
import Buttons from './buttons';
import Status from './status';
import './style.css';

class Timer extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            timingEvents: [],
            nonce: 0,
            status: 'Press START button to start check',
        }

        this.addTimerEvent = this.addTimerEvent.bind(this)
        this.tick = this.tick.bind(this)
        this.poll = setInterval(this.tick, 1000)
    }

    tick() {
        this.setState((prevState) => ({nonce: prevState.nonce+1}))
    }

    addTimerEvent() {
        this.setState({
            timingEvents: [
                ...this.state.timingEvents,
                new Date()
            ]
        })
    }

    render() {
        return(
            <div className = "timer-container">
                {/* <div className = "timer-status">
                    <div className = "status">
                        {this.state.status}
                    </div>
                </div> */}
                <Status timingEvents = {this.state.timingEvents} />
                <ElapsedTime 
                    timingEvents = {this.state.timingEvents}
                />
                <Buttons 
                    handleClick = {this.addTimerEvent}
                    timingEvents = {this.state.timingEvents}
                />
            </div>
        )
    }
}

export default Timer;