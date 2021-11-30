import React from 'react';
import { Header } from './components/Header';
import { ImageContainer } from './components/ImageContainer';
import { Menu } from './components/Menu';
import './App.scss';
import { Timer } from './components/Timer';
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
        </div>
    );
};

export default App;
