import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* to do
-clean up logs and add comments
-reset button remove
-resize reset button at goal reached
-change button colors between  ink and green when activated 
*/

export const Timer = () => {
    // only for testing purposes. will come from menu component user inputs
    const initUserTime = 2 * 100;
    const initUserCount = 6;
    const initUserBreakTime = 1 * 1000;
    const initUserBreakCount = 2;
    const initCount = 1;
    // let breakTime = false;

    const [time, setTime] = useState(initUserTime);
    const [timerOn, setTimerOn] = useState(false);
    const [count, setCount] = useState(initCount);
    const [breakCounter, setBreakCounter] = useState(initUserBreakCount);
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
            // if (!isBreak) {
            //     console.log(
            //         `inside !isbreak for count increment should be true: ${!isBreak}`
            //     );
            //     setCount(previousCount => previousCount + 1);
            //     console.log(`inside !isbreak after increment count: ${count}`);
            // }

            if (count === breakCounter) {
                //THIS NEEDS TO CHANGE TO WORK!!!
                // setIsBreak(true);
                // console.log(
                //     `inside setting break isbreak should be true: ${isBreak}`
                // );

                setTime(initUserBreakTime);
                console.log('inside setting break time and break counter');
                setBreakCounter(
                    previousBreakCounter =>
                        previousBreakCounter + initUserBreakCount
                );
                console.log(` new BreakCounter: ${breakCounter}`);
                setIsBreak(false);
            } else {
                setCount(previousCount => previousCount + 1);
                setTime(initUserTime);
            }
            console.log('count', count);
            console.log('breakcounter', breakCounter);
        }
        //DO A RETURN CLEAR?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, breakCounter, count, isBreak]);

    function renderCountGoalBreak() {
        if (count - 1 === initUserCount + 1) {
            // play triumphant sound
            console.log('hitting goal?');
            return 'GOAL REACHED!';
        } else if (count !== 0 && count === breakCounter - initUserBreakCount) {
            return 'BREAK TIME!';
        } else {
            return `${count - 1} / ${initUserCount}`;
        }
    }
    const setTimer = () => {
        // if count is already goal
        if (count - 1 === initUserCount + 1) {
            setCount(initCount);
            setBreakCounter(initUserBreakCount);
        } else {
            setTimerOn(true);
        }
    };
    return (
        <div>
            <div className="timer">
                <span>{minutes}:</span>
                <span>{seconds}:</span>
                <span>{milliseconds}</span>
            </div>
            <div className="controls">
                {count - 1 === initUserCount + 1 ? (
                    <img src={reset} alt="reset" onClick={() => setTimer()} />
                ) : (
                    <img src={play} alt="play" onClick={() => setTimer()} />
                )}
                {renderCountGoalBreak()}
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
                    onClick={() => setTime(initUserTime)}
                />
            </div>
        </div>
    );
};
