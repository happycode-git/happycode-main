import React from 'react'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/Footer.css'

export default function Footer() {
    return (
        <footer className='bg-darker light font'>
            <div>
                <h1 className='yellow'>Happy coding is what we do.</h1>
                <p>Happy Code is a web development company that creates beautiful and fully functional websites using the latest technologies and tools. Their experienced team focuses on user experience design and works closely with clients to deliver websites that are fast, reliable, and scalable. From simple brochure websites to complex e-commerce platforms, Happy Code has the expertise to exceed expectations.</p>
            </div>
            <div className='footer-links'>
                <Link to="/" className='footer-link light'>Home</Link>
                <Link to="/webline" className='footer-link light'>Webline</Link>
                <Link to="/referrals" className='footer-link light'>Referrals</Link>
                {/* <Link to="/appline" className='footer-link light'>Appline</Link> */}
                {/* <Link to="/products" className='footer-link light'>Products</Link>
                <Link to="/support" className='footer-link light'>Support</Link> */}
                {/* <Link to="/blog" className='footer-link light'>Blog</Link> */}
                <Link to="/contact" className='footer-link light'>Contact</Link>
            </div>
            <p className='footer-copyright yellow'>
                &copy; Happy Code 2022. All Rights Reserved.
            </p>
        </footer>
    )
}
