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
                    Get <b>50% commission</b> for every new partner you send our way. Once the website construction has begun, you will get your cut and be on your way. Easiest way to make money!
                </h2>
            </div>

            <div className='webline-panel3 one-div'>
                <h3 className='webline-promo-title'>Here is how it works:</h3>
                <p className='rotate webline-promo-caption'>$$$</p>
                <br />
                <br />
                <h3 className='webline-promo-title yellow'>1. Business Referral</h3>
                <p className='webline-promo-text'>
                    Refer the business to Happy Code Webline Services to construct and maintain their website. Business cards and contact information will be provided.
                </p>
                <p className='webline-promo-text'>
                    Businesses can apply online: <a className='webline-link' href="https://wearehappycode.com/webline">Happy Code Webline Services</a>
                </p>
                <br />
                <div className='flex-around'>
                    <div className='padding'>
                        <h4>No Subscription</h4>
                        <br />
                        <h1>Ex. $2000</h1>
                        <p className='webline-promo-text'>
                            Once the website is made, mo maintenance will follow. The full price of the website will be charged.
                        </p>
                    </div>
                    <div className='bg-purple padding'>
                        <h3 className='webline-promo-title'>With Subscription</h3>
                        <br />
                        <h1>Ex. $500 <span className='yellow'>75% off!</span></h1>
                        <p className='webline-promo-text'>
                            As a perk for subscribing to monthly maintenance services, an automatic 75% discount will be applied. After the website has been created, an affordable maintenance fee will be charged each month.
                        </p>
                        <h4>~ $50 / mo</h4>
                    </div>
                </div>
                <br />
                <p className='webline-promo-text'>
                    Business will get the following benefits from monthly maintenance:
                </p>
                <ul>
                    <li>
                        <p className='webline-promo-text'>
                            Complete tickets every day for changes, updates, additions, and removal of any text, photos, videos, layout, color, forms, posts, bugs, an so much more. This ensures a healthy and fully functioning website.
                        </p>
                    </li>
                    <li>
                        <p className='webline-promo-text'>
                            SEO (Search Engine Optimization) updates: High Google ranking must be kept by consistent upkeep of the site. That is why every week, there will be SEO maintenance to keep ranking higher in Google Index for higher customer reach.
                        </p>
                    </li>
                    <li>
                        <p className='webline-promo-text'>
                            Covers database and hosting charges.
                        </p>
                    </li>
                </ul>
                <br />
                <br />
                <br />
                <h3 className='webline-promo-title yellow'>2. Initial Fee Payment</h3>
                <p className='webline-promo-text'>
                    If the business owner/manager agrees to the partnership, a payment for construction will be charged for the process to begin. Out of this, the referral partner will receive <span className='light-red'>50%</span> as commission.
                </p>
                <br />
                <div className='bg-darker padding'>
                    <h3 className='webline-promo-title'>With Subscription:</h3>
                    <br />
                    <h4>If $350 Fee - $125 commission</h4>
                    <br />
                    <h4>If $800 Fee - $400 commission</h4>
                </div>
                <p className='webline-promo-text'>
                    All fee amounts will be determined by the cost of each page that is purchased.
                </p>
                <br/>
                <br/>
                <br />
                <h3 className='webline-promo-title yellow'>3. REPEAT</h3>
            </div>
            <br />

            <Footer />
        </div>
    )
}
