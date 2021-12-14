import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* functionality for break pseudo code
1. if timer === 0;
2. setTimerOn false
3. play bell
4. sertCount = (count + 1)
5. if count = userCount
    true:
        -play triumphant song
        - print goal reached
    else if count = userBreakCount
        -setTime(userBreakTime)
    else
        -setTime(userTime)
6. add logic to either run userTimer or userBreakTime at beginning
*/

export const Timer = () => {
    // only for testing purposes. will come from menu component user inputs
    let userTime = 2 * 1000;
    let userCount = 2;
    let goal = false;
    let userBreakTime = 1;
    let userBreakCount = 1;

    const [time, setTime] = useState(userTime);
    const [timerOn, setTimerOn] = useState(false);
    const [count, setCount] = useState(0);

    //60k ms in a minute
    const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
    // 1000 = 1 second
    const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
    //10 = ms
    const milliseconds = ('0' + ((time / 10) % 100)).slice(-2);

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

    if (time === 0 && count !== userCount) {
        // play bell sound
        setTimerOn(false);
        setCount(previousCount => previousCount + 1);
        //time will then reference if number of sprints before break have been reached
        //if true, time(userBreak), print break time! where counter is?
        setTime(userTime);
    }

    if (count === userCount) {
        // play triumphant sound
        //changes state without rerendering the useffect interval function
        setTimerOn[0] = false;
        goal = true;
        // setCount(0);
    }

    return (
        <div>
            <div className="timer">
                <span>{minutes}:</span>
                <span>{seconds}:</span>
                <span>{milliseconds}</span>
            </div>
            <div className="controls">
                <img src={play} alt="play" onClick={() => setTimerOn(true)} />
                {goal ? 'GOAL REACHED!' : `${count} / ${userCount}`}
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
