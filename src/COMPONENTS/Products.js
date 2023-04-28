import React, { useEffect, useState } from 'react'
// 
import './STYLESHEETS/Products.css'
import Footer from './UTILITIES/Footer'
import Navigation from './UTILITIES/Navigation'
// 
import { HiXMark } from 'react-icons/hi2'
import { firebaseSignIn } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLoadingState } from '../REDUX/REDUCERS/LoadingSlice'
// 
import practicenowImg from '../PHOTOS/practicenow-logo.png'
import easysellImg from '../PHOTOS/easysell-logo.png'
import musicademyImg from '../PHOTOS/musicademy-logo.png'
import savatheonImg from '../PHOTOS/savatheon-logo.png'
import { Helmet } from 'react-helmet'

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    function signIn() {
        dispatch(setLoadingState(true))
        const email = document.querySelector('#tbEmail').value;
        const password = document.querySelector('#tbPass').value;
        firebaseSignIn(dispatch, navigate, email, password);
    }

    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='main'>
             <Helmet>
                <title>Products | Happy Code Dev.</title>
                <meta name="description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta name="keywords" content="web development, small business, low cost, maintenance benefits, Happy Code" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://wearehappycode.com`} />
                <meta property="og:title" content="Happy Code Template | Products" />
                <meta property="og:description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta property="og:url" content={`https://wearehappycode.com`} />
                <meta property="og:image" content={`https://wearehappycode.com/src/PHOTOS/stock.png`} />
            </Helmet>
            <Navigation />
            <h1 className='webline-title'>Products</h1>
            <div className='products-wrap'>
                <div className='product-block'>
                    <h1 className='product-name'>Practice Now! App</h1>
                    <img src={practicenowImg} className="product-img" />
                    <p className='product-desc'>An app made for music students and teachers. Music teachers can create assignments, plans, and assign practice to students with all the necessary information. Require recordings, provide useful resource media, and give essential feedback.As a student, you can have all the tools to recreate a perfect practice. Have access to Metronome, Drone, Teacher notes and feedback, recording tools, journal, and consistent communication.</p>
                    <span className='product-price'>$4.99</span>
                </div>
                <div className='product-block'>
                    <h1 className='product-name'>Easy Sell App</h1>
                    <img src={easysellImg} className="product-img" />
                    <p className='product-desc'>The future of commerce and trading. Easy Sell is an app that lets you post all your items and their individual info all within one listing. Rest easy as the process of buying and selling has never been more secure (new concept). Users will be able to view the listings closest to them and even search for those which have items they are looking for. Perfect for Swapmeets, Farmers Markets, Yard Sales, etc.</p>
                    <span className='product-price'>In-App Purchases</span>
                </div>
                <div className='product-block'>
                    <h1 className='product-name'>Musicademy. App</h1>
                    <img src={musicademyImg} className="product-img" />
                    <p className='product-desc'>Music students and teachers can now get access to a large library of music courses with no limit to specificity. Library includes Master Classes, Beginner Courses, Piece Insights, History Courses, and so much more! Once you purchase these courses as low as $1! you will have it for life. Watch as many times and interact with others to discuss opinions and knowledge.</p>
                    <span className='product-price'>In-App Purchases</span>
                </div>
                <div className='product-block'>
                    <h1 className='product-name'>Savatheon App</h1>
                    <img src={savatheonImg} className="product-img" />
                    <p className='product-desc'>Dive into a world of abstract madness and psychological torment. Read this dialogue/narration based epic-series to get a taste of what it is like to live on Savatheon; the ever-living planet. Now available on the App Store with new stories every Monday, Wednesday, and Friday.</p>
                    <span className='product-price'>FREE</span>
                </div>

            </div>
            <Footer />
        </div>
    )
}
