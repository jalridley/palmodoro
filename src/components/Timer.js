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
    let userTime = 25 * 60000;
    const [time, setTime] = useState(userTime);
    const [timerOn, setTimerOn] = useState(false);

    // runs when component is rendered every time timer on changes
    useEffect(() => {
        // when timer is on or off logic
        // use setInterval js method
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime(previous => previous - 10); // decrease time by 10 milliseconds
            }, 10);
        } else {
            clearInterval(interval);
        }

        // cleanup to stop interval when user leaves the page
        return () => {
            clearInterval(interval);
        };
    }, [timerOn]);

    return (
        <div>
            <div className="timer">
                {/* slice(-2) to only show last 2 digits, inlcuding 0 on single digit numbers */}
                {/* 60k ms in a minute */}
                <span>
                    {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>

                {/* 1000 = 1 second */}
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>

                {/* 10 = ms */}
                <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
            </div>
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
                <img
                    src={reset}
                    alt="reset"
                    onClick={() => setTime(userTime)}
                />
            </div>
        </div>
    );
};
