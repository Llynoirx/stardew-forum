/* Functional component rendering the loading screen w/ 
text and an animated gif */

import React from 'react';
import junimo from '../assets/junimo-dance.gif'; 
import './LoadingPage.css'; 

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
