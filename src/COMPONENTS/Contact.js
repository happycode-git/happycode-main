import React, { useEffect, useState } from 'react'
// 
import './STYLESHEETS/Webline.css'
import Footer from './UTILITIES/Footer'
import Navigation from './UTILITIES/Navigation'
// 
import { HiXMark } from 'react-icons/hi2'
import { firebaseSignIn } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLoadingState } from '../REDUX/REDUCERS/LoadingSlice'
import { Helmet } from 'react-helmet'
// 

export default function Webline() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }


    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='main'>
             <Helmet>
                <title>Contact | Happy Code Dev.</title>
                <meta name="description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta name="keywords" content="web development, small business, low cost, maintenance benefits, Happy Code" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://wearehappycode.com`} />
                <meta property="og:title" content="Happy Code Template | Contact" />
                <meta property="og:description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta property="og:url" content={`https://wearehappycode.com`} />
                <meta property="og:image" content={`https://wearehappycode.com/src/PHOTOS/stock.png`} />
            </Helmet>
            <Navigation />
            <h1 className='webline-title'>Contact Us</h1>
          
            <div className='webline-panel2'>
                <h1>Page in development</h1>
                <p className='rotate apply-now'>working on it...</p>
                <h2>
                    In the meantime, feel free to text us or email us using the contact methods below.
                </h2>
                <br/>
                <br/>
                <h1>+1 619 875 6441</h1>
                <br/>
                <h1>happycode.inbox<br/>@gmail.com</h1>
            </div>
          


            <Footer />
        </div>
    )
}
