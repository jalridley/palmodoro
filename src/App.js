import React from 'react';
import { Header } from './components/Header';
import { ImageContainer } from './components/ImageContainer';
import './App.scss';
// import image from '../palm-flam.jpg';

const App = () => {
    return (
        <div className="container">
            <Header />
            <div className="image-container">
                <ImageContainer />
            </div>
        </div>
    );
};

export default App;
