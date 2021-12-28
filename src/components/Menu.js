import React from 'react';
import { useState } from 'react';
import menu from '../menu.svg';

export const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const isMenuOpen = () => {
        setShowMenu(!showMenu);
        console.log('inside is menu open function');
    };
    console.log(showMenu);

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
            {showMenu ? (
                <div className="menu">
                    <p style={{ color: 'white' }}>menu open</p>
                </div>
            ) : (
                <p>showMenu false</p>
            )}
        </div>
    );
};
