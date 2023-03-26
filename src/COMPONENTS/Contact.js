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
                <h1>happycode.inbox@gmail.com</h1>
            </div>
          


            <Footer />
        </div>
    )
}
