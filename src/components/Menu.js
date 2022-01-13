import React from 'react';
import useStore from '../store';
import { useState } from 'react';
import menu from '../menu.svg';

export const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const goal = useStore(state => state.goal);
    const setGoal = useStore(state => state.setGoal);

    const isMenuOpen = () => {
        setShowMenu(!showMenu);
    };

    /* const toggleMenu = () => {
        if (showMenu) {
            // div with user inputs
        }
    }; */

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
            {/* temporary - fix the weird white dot behaviour */}
            {showMenu ? (
                <div className="menu">
                    <div className="label-input">
                        <label for="goal">Goal</label>
                        <input
                            type="number"
                            value={goal}
                            onChange={e => setGoal(e.target.value)}
                        />
                    </div>
                    <div className="label-input">
                        <label for="duration">Session Duration</label>
                        <input type="number" />
                    </div>
                    <div className="label-input">
                        <label for="until-break">Sessions until Break</label>
                        <input type="number" />
                    </div>
                    <div className="label-input">
                        <label for="break">Break Duration</label>
                        <input type="number" />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
