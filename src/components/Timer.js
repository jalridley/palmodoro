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
    // let breakTime = false;

    const [time, setTime] = useState(userTime);
    const [timerOn, setTimerOn] = useState(false);
    const [count, setCount] = useState(0);
    const [breakCounter, setBreakCounter] = useState(userBreakCount);
    const [isBreak, setIsBreak] = useState(false);

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
            // console.log('---------');
            // console.log(`count: ${count}`);
            // console.log(`BreakCounter: ${breakCounter}`);
            // console.log(count + 1 === breakCounter);

            //breaktime is false already
            console.log(isBreak);
            // console.log(!isBreak);
            if (!isBreak) {
                console.log(
                    `inside !isbreak for count increment should be true: ${!isBreak}`
                );
                setCount(previousCount => previousCount + 1);
                console.log(`inside !isbreak after increment count: ${count}`);
            }

            if (count + 1 === breakCounter) {
                //THIS NEEDS TO CHANGE TO WORK!!!
                // setIsBreak(true);
                // console.log(
                //     `inside setting break isbreak should be true: ${isBreak}`
                // );

                setTime(userBreakTime);
                console.log('inside setting break time and break counter');
                setBreakCounter(
                    previousBreakCounter =>
                        previousBreakCounter + userBreakCount
                );
                console.log(` new BreakCounter: ${breakCounter}`);
                setIsBreak(false);
            } else {
                setTime(userTime);
            }
        }
        //DO A RETURN CLEAR?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, breakCounter, count, isBreak]);

    function checkGoalBreak(count, breakCounter) {
        if (count === userCount) {
            // play triumphant sound
            return 'GOAL REACHED!';
        } else if (count !== 0 && count === breakCounter - userBreakCount) {
            return 'BREAK TIME!';
        } else {
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
