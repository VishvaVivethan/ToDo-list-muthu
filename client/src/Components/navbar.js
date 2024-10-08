
import React, { useState } from 'react';
import '../assets/css/nav.css';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className='navbar'>
        <h2 className='nav-h2'>User DashBoard</h2>
      <div >
        
        <button className="navbar-toggle " onClick={toggleNavbar}>
          {isOpen ? 'Close' : 'Open'} Menu
        </button>
        
        <div className={`offcanvas-navbar ${isOpen ? 'open' : ''}`}>
          <ul  className='nav-ul'>
            
          <li className='nav-li'><a href="/home" className='nav-a'>Home</a></li>
            <li className='nav-li'><a href="/storylist" className='nav-a'>View Task</a></li>
            <li className='nav-li'><a href="/TodoList" className='nav-a'>User List</a></li>
          
          </ul>
        </div>
      </div>
      </div>
    );
  };
  
  export default Navbar;