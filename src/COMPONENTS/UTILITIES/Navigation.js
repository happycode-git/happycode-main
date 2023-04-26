import React, { useEffect } from 'react'
// 
import '../STYLESHEETS/Navigation.css'
// 
import { HiMenuAlt3 } from 'react-icons/hi'
import { HiXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom';

export default function Navigation() {
  function openNav() {
    document.querySelector(".navbody").style.width = "100vw";
  }

  function closeNav() {
    document.querySelector(".navbody").style.width = "0";
  }

  useEffect(() => {
    if (window.innerWidth < 800) {
      closeNav()
    }
  }, [])
  return (
    <div className="nav">
      <div className='navbar'>
        <HiMenuAlt3 className='navbar-icon' onClick={openNav} />
      </div>
      <div className='navbody'>
        <HiXMark className="navbody-icon" onClick={closeNav} />

        <div className='nav-links'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/webline" className='nav-link rotate bg-purple white'>Webline</Link>
          <Link to="/template" className='nav-link'>Template</Link>
          <Link to="/referrals" className='nav-link'>Referrals</Link>
          <Link to="/calculator" className='nav-link rotate bg-yellow dark'>Health Calculator</Link>
          {/* <Link to="/blog" className='nav-link'>Blog</Link> */}
          <Link to="/products" className='nav-link rotate bg-purple'>Products</Link>
          <Link to="/contact" className='nav-link'>Contact</Link>

          
          <Link to="/admin" className='small-nav-link'>Admin</Link>
        </div>

        <div className='nav-footer'>
          Copyright &copy; Happy Code 2022. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}
