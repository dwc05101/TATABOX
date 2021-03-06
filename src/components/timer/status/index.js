import React from 'react';
import { isProperty } from '@babel/types';

const checkonStyle = {
    height: "50%",
    fontSize: "20px",
    textAlign: "center"
}

const checkoffStyle = {
    height: "50%",
    fontSize: "20px",
    textAlign: "center"
}

const statusupStyle = {
    height: "50%",
    fontSize: "20px",
    textAlign: "center"
}

const statusdownStyle = {
    height: "50%",
    fontSize: "20px",
    textAlign: "center"
}

const timeStyle = {
    height: "50%",
    fontSize: "20px",
    textAlign: "center"
}

function addZero(input) {
    return ('0' + input).slice(-2)
}

var weekday=new Array();
weekday[0]="Sun";
weekday[1]="Mon";
weekday[2]="Tue";
weekday[3]="Wed";
weekday[4]="Thu";
weekday[5]="Fri";
weekday[6]="Sat";

function Status(props) {
    const today = props.currentTime
    
    let time = today.getFullYear() + "-" + addZero((today.getMonth()+1)) + "-" + addZero(today.getDate()) + "(" + weekday[today.getDay()] + ")";
    let date;
    if (today.getHours() > 12) {
        date = "PM" + addZero(today.getHours() - 12) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds())
    } else {
        date = "AM" + addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds())
    }

    const label = props.timingEvents.length

    if (label == 0) {
        
        return (
            <div className = "timer-status">
                <div className = "status_up" style = {statusupStyle}>
                    Press START button
                </div>
                <div className = "status_down" style = {statusdownStyle}>
                    to start check
                </div>
            </div>
        )
    } else if (label % 2 == 1) {
        return (
            <div className = "timer-status">
                <div className = "checkon-status" style = {checkonStyle}>
                    Checking...
                </div>
                <div className = "current-time" style = {timeStyle}>
                    {time} {date}
                </div>
            </div>
        )
    } else {
        return (
            <div className = "timer-status">
                <div className = "checkoff-status" style = {checkoffStyle}>
                    Check Finished!
                </div>
                <div className = "current-time" style = {timeStyle}>
                    {time} {date}
                </div>
            </div>
        )
    }
}

export default Status;