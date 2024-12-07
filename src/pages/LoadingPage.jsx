import React from 'react';
import junimo from '../assets/junimo-dance.gif'; 
import './LoadingPage.css'; 

// Functional component rendering the loading screen with text and an animated gif
const LoadingPage = () => {
    return (
        <div className="loading-container">
            <div className="loading-box">
                <p className="loading-text">Loading...</p>
                <img src={junimo} className="loading-logo" alt="Loading..." />
            </div>
        </div>
    );
};

export default LoadingPage;
