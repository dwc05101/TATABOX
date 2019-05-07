import React from 'react';
import ElapsedTime from './elapsed-time';
import Buttons from './buttons';
//import Reset from './reset'
import './style.css';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timingEvents: [],
            nonce: 0,
            status: '',
        }

        // this.changeStatus = this.changeStatus.bind(this)
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

    /* changeStatus() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        if (this.state.timingEvents.length%2 === 0) {
            // start
            this.setState({
                status: 'Start Checking...',
            })
        } else {
            // stop
            this.setState({
                status: 'Check Finished!' + date,
            })
        }
    } */

    /* deleteTimerEvent() {
        this.setState({
            timingEvents: this.state.timingEvents.filter(num => typeof(num) != number),
        })
    } */

    render() {
        return(
            <div className = "timer-container">
                <div className = "timer-status">
                    {this.state.status}
                </div>
                <ElapsedTime 
                    timingEvents = {this.state.timingEvents}
                />
                <Buttons 
                    handleClick = {this.addTimerEvent}
                    // handleClick = {this.changeStatus}
                    timingEvents = {this.state.timingEvents}
                />
                {/* <Reset
                    handleClick = {this.deleteTimerEvent}
                    timingEvents = {this.state.timingEvents}
                /> */}
            </div>
        )
    }
}

export default Timer;