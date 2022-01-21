import React from 'react';
import useStore from '../store';
import { useState } from 'react';
import menu from '../menu.svg';

export const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);
    //states for inputs from store.js using zustand
    const goal = useStore(state => state.goal);
    const setGoal = useStore(state => state.setGoal);
    const duration = useStore(state => state.duration);
    const setDuration = useStore(state => state.setDuration);
    const untilBreak = useStore(state => state.untilBreak);
    const setUntilBreak = useStore(state => state.setUntilBreak);
    const breakDuration = useStore(state => state.breakDuration);
    const setBreakDuration = useStore(state => state.setBreakDuration);

    const isMenuOpen = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            {/* if showMenu is true, show menus svg and the dropdown menu
            else just show the svg */}
            <img
                className="menu-icon"
                src={menu}
                alt="menu"
                onClick={() => isMenuOpen()}
            />
            {/* temporary - fix the weird white dot thing i don't know where is comes from */}
            {showMenu ? (
                <div className="menu">
                    <div className="label-input">
                        <label>Goal</label>
                        <input
                            /* changes the className to use in css to make red border error input */
                            className={goal === 0 ? 'error' : 'defaultNumber'}
                            type="number"
                            onChange={e => setGoal(e.target.value)}
                            value={goal}
                        />
                    </div>
                    <div className="label-input">
                        <label>Session Duration</label>
                        <input
                            className={
                                duration === 0 ? 'error' : 'defaultNumber'
                            }
                            type="number"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="label-input">
                        <label>Sessions until Break</label>
                        <input
                            type="number"
                            value={untilBreak}
                            onChange={e => setUntilBreak(e.target.value)}
                        />
                    </div>
                    <div className="label-input">
                        <label>Break Duration</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={e => setBreakDuration(e.target.value)}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
