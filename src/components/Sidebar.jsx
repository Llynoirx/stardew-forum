import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
        <h3>AMONG-US CREWMATE CUSTOMIZATION</h3>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-crewmate">Create Crewmate</Link></li>
            <li><Link to="/crewmate-gallery">Crewmate Gallery</Link></li>
        </ul>
        </div>
    );
    }; 

export default Sidebar; 