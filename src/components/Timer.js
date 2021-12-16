import React, { useState, useEffect } from 'react';
// import Controls from './Controls'
import pause1 from '../pause1.svg';
import pause2 from '../pause2.svg';
import play from '../play.svg';
import reset from '../reset.svg';

/* functionality for break pseudo code

-add full reset on  reset button if  goal is  reached
-add logic to either run userTimer or userBreakTime at beginning
*/

export const Timer = () => {
    // only for testing purposes. will come from menu component user inputs
    let userTime = 3 * 1000;
    let userCount = 3;
    let goal = false;
    let userBreakTime = 2 * 1000;
    let userBreakCount = 2;
    let breakCounter = userBreakCount;
    let breakTime = false;

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
    console.log(time);

    useEffect(() => {
        if (time === 0) {
            // play bell sound
            setTimerOn(false);
            setCount(previousCount => previousCount + 1);
            setTime(userTime);
        }
        //DO A RETURN CLEAR?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    useEffect(() => {
        if (breakTime) {
            //this is weird code
            breakTime = false;
            setTime(userBreakTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    function checkGoalBreak(count) {
        breakTime = false;
        if (count === userCount) {
            // play triumphant sound
            return 'GOAL REACHED!';
        } else if (count === breakCounter) {
            //need to set time to break time!!!!
            //this does not work, and setTime(userBreakTime) causes too many render error
            //setTime[0] = userTime // does not work becasue it doesnt rerender
            breakTime = true;
            breakCounter += userBreakCount;
            console.log(
                'inside breaktime and breakCounter is: ' + breakCounter
            );
            console.log('count is: ' + count);
            //count remains same as userBreakCount causing infinite loop!
            //return 'BREAK TIME!'
            return breakTime;
        } else {
            // put in variable
            return `${count} / ${userCount}`;
        }
        //count needs to go back to zero but where and when?
        //setCount(0);
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
                {checkGoalBreak(count)}
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
