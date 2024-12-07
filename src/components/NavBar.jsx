import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import stardewlogo from '../assets/stardew-logo.png'

const Navbar = () => {

    /* Stardew Valley Logo on top left; Link to Home, Create Post on top right */
    return (
        <div className="navbar">
            <img src={stardewlogo} height="100px"/>
            <div className="nav-item">
                <Link to="/"><p>Home</p></Link>
                <Link to="/create"><p>Create Post</p></Link>
            </div>
        </div>
    )
};

export default Navbar;