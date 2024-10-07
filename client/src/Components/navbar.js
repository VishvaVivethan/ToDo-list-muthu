
// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/nav.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
           
            <ul className="nav-links">
            <h1 className="logo display-5">Menu</h1>
                <li>
                    <Link to="/storylist">View Task</Link>
                </li>
                <li>
                    <Link to="/TodoList">User List</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
