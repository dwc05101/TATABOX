import React from 'react';
import ElapsedTime from './elapsed-time';
import Buttons from './buttons';
import Status from './status';
import Reset from './reset';
import './style.css';

class Timer extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            timingEvents: [],
            nonce: 0,
            status: 'Press START button to start check',
            currentTime: new Date(),
        }

        this.addTimerEvent = this.addTimerEvent.bind(this)
        this.tick = this.tick.bind(this)
        this.poll = setInterval(this.tick, 1000)
        this.resetTimerEvent = this.resetTimerEvent.bind(this)
    }

    tick() {
        this.setState((prevState) => ({nonce: prevState.nonce+1}))
    }

    addTimerEvent() {
        this.setState({
            timingEvents: [
                ...this.state.timingEvents,
                new Date()
            ],
            currentTime: new Date()
        })
    }

    resetTimerEvent(index) {
        /* this.setState({
            timingEvents: this.state.timingEvents.filter((_, i) => i !== index)
        }); */
        delete this.state.timingEvents;
        this.setState({
            timingEvents: [],
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
                <Status
                    timingEvents = {this.state.timingEvents}
                    currentTime = {this.state.currentTime}
                />
                <ElapsedTime 
                    timingEvents = {this.state.timingEvents}
                />
                <Buttons 
                    handleClick = {this.addTimerEvent}
                    timingEvents = {this.state.timingEvents}
                />
                <Reset
                    handleClick = {this.resetTimerEvent}
                    timingEvents = {this.state.timingEvents}
                />
            </div>
        )
    }
}

export default Timer;