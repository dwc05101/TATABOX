import React from 'react';

function elapsedTime(events) {
    let elapsed = 0;

    for(let i=0; i<events.length; i += 2) {
        const start = events[i]
        const stop = events[i+1] || new Date()
        elapsed += stop - start
    }

    let tempTime = Math.floor(elapsed/1000);
    let minutes = Math.floor(tempTime/60);
    let seconds = ('0' + (tempTime - 60*minutes)).slice(-2);
    
    return minutes+":"+seconds
}

export default function ElapsedTime(props) {
    return (
        <div className='elapsed-time'>
            {elapsedTime(props.timingEvents)}
        </div>
    )
}