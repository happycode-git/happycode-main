import React from 'react'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/Footer.css'

export default function Footer() {
    return (
        <footer className='bg-darker light font'>
            <div>
                <h1 className='yellow'>Happy coding is what we do.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan. Integer auctor nunc dui, ut vehicula turpis pretium accumsan. Sed ullamcorper tortor justo, vel aliquam nisi suscipit a. </p>
            </div>
            <div className='footer-links'>
                <Link to="/" className='footer-link light'>Home</Link>
                <Link to="/webline" className='footer-link light'>Webline</Link>
                {/* <Link to="/appline" className='footer-link light'>Appline</Link> */}
                <Link to="/products" className='footer-link light'>Products</Link>
                <Link to="/support" className='footer-link light'>Support</Link>
                {/* <Link to="/blog" className='footer-link light'>Blog</Link> */}
                <Link to="/contact" className='footer-link light'>Contact</Link>
            </div>
            <p className='footer-copyright yellow'>
                &copy; Happy Code 2022. All Rights Reserved.
            </p>
        </footer>
    )
}
