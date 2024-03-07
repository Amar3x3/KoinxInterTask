

import React, { Component,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleLinkClick = (link) => {
    handleMenuToggle();
  };
  const location = useLocation();
  return (
    <>
     {console.log(location)}
    <nav className={`navbarr ${isMenuOpen ? 'open' : ''}`}>
      <div className="">
        <div className="nav_container">
          <div className="logo">
            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709619303/koinx/Frame_26863_t28ai1.png" className="logo" alt="" />
          </div>
          <div className="hamburger-menu" onClick={handleMenuToggle}>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div className="links">
        <ul>
          <li className="nav_item">
            <Link to="/" className='' onClick={() => handleLinkClick('home')}>Crypto Taxes</Link>
          </li>
          <li className="nav_item">
            <Link to="/Aboutus" className='' onClick={() => handleLinkClick('AboutUs')}>Free Tools</Link>
          </li>
          <li className="nav_item">
            <Link to="/Products" className='' onClick={() => handleLinkClick('Products')}>Resource Center</Link>
          </li>
          <li className="">
            <Link to="/Services" className='active_nav' onClick={() => handleLinkClick('Services')}>Get Started</Link>
          </li>

        </ul>
      </div>
    </nav>
      {/* <div className="navbar">
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/aboutus'}>About Us</Link></li>
        <li><Link to={'/products'}>Products</Link></li>
        <li><Link to={'/services'}>Services</Link></li>
        <li><Link to={'/contactus'}>Contact Us</Link></li>
      </div> */}
    </>
  )
}
