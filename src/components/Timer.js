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
    let userTime = 2 * 1000;
    let userCount = 2;
    let goal = false;
    let userBreakTime = 1 * 1000;
    let userBreakCount = 1;
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
    /* 
    1. if timer === 0;
    2. setTimerOn false
    3. play bell
    4. setCount = (count + 1) */

    /* NOT WORKING CODE
    if (time === 0) {
        setTimerOn(false);
        // play bell sound
        setCount(previousCount => previousCount + 1);
        //time will then reference if number of sprints before break have been reached
        //if true, time(userBreak), print break time! where counter is?
        setTime(userTime);
    }
    console.log(count);
    if (count === userCount) {
        // play triumphant sound
        goal = true;
        // setCount(0);
    } else if (count === userBreakCount) {
        setTime(userBreakTime);
        //add to ternary jsx
        breakTime = true;
        console.log('if it is break time: ' + time);
    } */
    // } else {
    //     setTime(userTime);
    //     console.log('if not goal or break, time is: ' + time);
    // }

    /* 5. if count = userCount
    true:
        -play triumphant song
        - print goal reached
    else if count = userBreakCount
        -setTime(userBreakTime)
    else
        -setTime(userTime) */

    // WORKING CODE
    useEffect(() => {
        if (time === 0) {
            // play bell sound
            setTimerOn(false);
            setCount(previousCount => previousCount + 1);
            setTime(userTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    function checkGoal(count) {
        if (count === userCount) {
            // play triumphant sound
            //changes state without rerendering the useffect interval function
            //setTimerOn[0] = false;
            return 'GOAL REACHED!';
        } else {
            // put in variable
            return `${count} / ${userCount}`;
        }
        //count needs to go back to zero but where and when?
        //setCount(0);
    }

    function checkBreak(count) {
        //time will then reference if number of sprints before break have been reached
        //if true, time(userBreak), print break time! where counter is?
        breakTime = false;
        if (count === userBreakCount) {
            setTime[0] = userBreakTime;
            //return break time! to jsx
            // ternuary if breakTime is true brint break time to jsx
            breakTime = true;
            return 'BREAK TIME!';
        } else {
            //put in variable
            return `${count} / ${userCount}`;
        }
    }

    // return () => {
    //     cleanup
    // }
    //else if (count === userBreakCount) {
    //     //changes state without rerendering the useffect interval function
    //     setTime(userBreakTime);
    //     //add to ternary jsx
    //     breakTime = true;
    // }

    return (
        <div>
            <div className="timer">
                <span>{minutes}:</span>
                <span>{seconds}:</span>
                <span>{milliseconds}</span>
            </div>
            <div className="controls">
                <img src={play} alt="play" onClick={() => setTimerOn(true)} />
                {checkGoal(count)}
                {/* {checkBreak(count)} */}
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
