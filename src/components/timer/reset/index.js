import React from 'react';

export default function Reset(props) {
    return (
        <div className='timer-buttons'>
            <button
                onClick = {props.handleClick}
                disabled = {props.timingEvents.length === 0}
            >
                Reset
            </button>
        </div>
    )
}