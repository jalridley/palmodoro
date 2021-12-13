import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* counter functionality pseudo code
1. put minutes. seconds, milliseconds in variables
2. insert varioable into timer jsx
3. create count variable = 0
4. if time equals 0 AND count != userCount, play bell sound add 1 to count
5. if count === userCount, play triumph sound, print congratulations! goal reached! to screen
6. reset timer to userTime  
7. reset count to 0
*/

export const Timer = () => {
    // only for testing purposes
    let userTime = 1 * 60000;
    let userCount = 1;
    // let count = 0;

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
        setCount(count + 1);
        setTimerOn(false);
    }

    if (count === userCount) {
        // play triumphant sound
        console.log('GOAL REACHED!');
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
                {count}/{userCount}
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
