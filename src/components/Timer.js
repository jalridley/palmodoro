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
    const initUserTime = 2 * 10;
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
            // break logic
            if (count === breakCounter) {
                // set the time to the user's chosen break length
                setTime(initUserBreakTime);
                setBreakCounter(
                    //increment the break counter by the user's chosen break count
                    // so the next break time will be when the counter reaches it
                    // ex. breaking after every 2 sprints causes break time at 2, 4, 6, etc.
                    previousBreakCounter =>
                        previousBreakCounter + initUserBreakCount
                );
                setIsBreak(false);
            } else {
                // increment sprint count
                setCount(previousCount => previousCount + 1);
                setTime(initUserTime);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, breakCounter, count, isBreak]);

    // what will be rendered to screen in between control buttons
    function renderCountGoalBreak() {
        if (count - 1 === initUserCount + 1) {
            // play triumphant sound
            return 'GOAL REACHED!';
        } else if (count !== 0 && count === breakCounter - initUserBreakCount) {
            return 'BREAK TIME!';
        } else {
            return `${count - 1} / ${initUserCount}`;
        }
    }
    const setTimer = () => {
        // if count is already goal
        // set the timer to the user's initial sprint time
        // a bit of a hack solution to get the functionality of goal checking to work
        // because count is starting at 0 therefore always behind
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
                {/* a bit of a hack solution to get the functionality of goal checking to work
                because count is starting at 0 therefore always behind 
                either shows reset button if goal was reached, or play if goal was not reached */}
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
            {/* sets the time to initial user inputed time after goal is reached */}
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
