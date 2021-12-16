import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* to do
-exclude break as a count increment
-add full reset if  goal is  reached
*/

export const Timer = () => {
    // only for testing purposes. will come from menu component user inputs
    let userTime = 2 * 100;
    let userCount = 6;
    let userBreakTime = 1 * 1000;
    let userBreakCount = 2;
    let breakTime = false;

    const [time, setTime] = useState(userTime);
    const [timerOn, setTimerOn] = useState(false);
    const [count, setCount] = useState(0);
    const [breakCounter, setBreakCounter] = useState(userBreakCount);

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

    // console.log(time);

    useEffect(() => {
        if (time === 0) {
            // play bell sound
            setTimerOn(false);
            if (!breakTime) {
                setCount(previousCount => previousCount + 1);
            }
            console.log('---------');
            console.log(`count: ${count}`);
            console.log(`BreakCounter: ${breakCounter}`);
            console.log(count + 1 === breakCounter);
            if (count + 1 === breakCounter) {
                setTime(userBreakTime);
                console.log(`userBreakCount: ${userBreakCount}`);
                setBreakCounter(
                    previousBreakCounter =>
                        previousBreakCounter + userBreakCount
                );
                console.log(` new BreakCounter: ${breakCounter}`);
            } else {
                setTime(userTime);
            }
        }
        //DO A RETURN CLEAR?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, breakCounter, count]);

    function checkGoalBreak(count, breakCounter) {
        console.log(`function beginning count: ${count}`);
        console.log(`function beginning breakCounter: ${breakCounter}`);
        if (count === userCount) {
            // play triumphant sound
            return 'GOAL REACHED!';
        } else if (count !== 0 && count === breakCounter - userBreakCount) {
            console.log(
                `inside breaktime and breakCounter is: ${breakCounter}`
            );
            console.log('count is: ' + count);
            //count remains same as userBreakCount causing infinite loop!
            return 'BREAK TIME!';
            // return breakTime;
        } else {
            // put in variable
            return `${count} / ${userCount}`;
        }
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
                {checkGoalBreak(count, breakCounter)}
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
