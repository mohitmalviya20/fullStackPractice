import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
        <div className="nav-wrapper white" >
          <Link className="brand-logo left" to="/">
          Logo
          </Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createPost">createPost</Link></li>
          </ul>
        </div>
      </nav>
        );

    
}

export default Navbar
