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
import pdf1 from '../PHOTOS/Referral-Program-Flow.png'

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
            <h1 className='webline-title'>Referrals</h1>
            <div className='webline-panel2'>
                <h1>Become a referral today!</h1>
                <p className='rotate apply-now'>Join Us!</p>
                <h2>
                    Get 50% commission for every new partner you send our way. Once the website construction has begun, you will get your cut and be on your way. Easiest way to make money!
                </h2>
            </div>
            
            <div className='bg-white'>
                <img src={pdf1} className="pdf" />
            </div>


            <Footer />
        </div>
    )
}
