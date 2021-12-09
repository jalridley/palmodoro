import React from 'react';
import { Header } from './components/Header';
import { ImageContainer } from './components/ImageContainer';
import { Menu } from './components/Menu';
import { Timer } from './components/Timer';
// import { Controls } from './components/Controls';

import './App.scss';
// import image from '../palm-flam.jpg';

const App = () => {
    return (
        <div className="container">
            <Header />
            <div className="image-container">
                <ImageContainer />
                <Menu />
            </div>
            <div>
                <Timer />
            </div>
            {/* <div>
                <Controls />
            </div> */}
        </div>
    );
};

export default App;
