import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* basic timer psuedo code:
1. import usestate/useEffect
2. add onclicks to controls svgs for set timer on true/false
    - reset set time to default
3. add a reset button that appears only after pause is clicked
    - or play/pause toggles on left and reset arrow on right
    - create logic in controls to hide/show buttons
3. pass controls return as props to timer
4. create timer state
    - timer itself with 25 default (change to user input when complete)
    - state of timer on set to default of false
5. add time usestate to timer div
6. create useEffect function to run when timer on variable changes
7. in useEffect: use set interval and create if/else logic for when timer turns on and off 
8. in timer div, create spans for hour, minutes, seconds with calculations using time state
9. 
*/

export const Timer = () => {
    const [time, setTime] = useState(25);
    const [timerOn, setTimerOn] = useState(false);
    console.log(timerOn);
    console.log(time);

    return (
        <div>
            <div className="timer">{time}</div>
            <div className="controls">
                <img src={play} alt="play" onClick={() => setTimerOn(true)} />
                1/12
                <img
                    src={pause1}
                    alt="pause"
                    onClick={() => setTimerOn(false)}
                />
            </div>
            <div className="reset">
                <img src={reset} alt="reset" onClick={() => setTime(time)} />
            </div>
        </div>
    );
};
