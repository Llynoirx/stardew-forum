import React from 'react';
import junimo from '../assets/junimo-dance.gif'; // Importing the gif
import './LoadingPage.css'; // Import the CSS file for styling

const LoadingPage = () => {
    return (
        <div className="loading-container">
            {/* Mini container for loading content */}
            <div className="loading-box">
                <p className="loading-text">Loading...</p>
                <img src={junimo} className="loading-logo" alt="Loading..." />
            </div>
        </div>
    );
};

export default LoadingPage;
