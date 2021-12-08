import React from 'react';

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
    return <div className="timer">25:00:00</div>;
};
