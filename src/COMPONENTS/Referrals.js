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
                <title>Referrals | Happy Code Dev.</title>
                <meta name="description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta name="keywords" content="web development, small business, low cost, maintenance benefits, Happy Code" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://wearehappycode.com`} />
                <meta property="og:title" content="Happy Code Template | Referrals" />
                <meta property="og:description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta property="og:url" content={`https://wearehappycode.com`} />
                <meta property="og:image" content={`https://wearehappycode.com/src/PHOTOS/stock.png`} />
            </Helmet>
            <Navigation />
            <h1 className='webline-title'>Referrals</h1>
            <div className='webline-panel2'>
                <h1>Become a referral today!</h1>
                <p className='rotate apply-now'>Join Us!</p>
                <h2>
                    Get a <b>50% commission</b> for every new business you send our way. Once the website construction has begun, you will get your commission and be on your way. The easiest way to make money!
                </h2>
            </div>

            <div className='webline-panel3 one-div'>
                <h3 className='webline-promo-title'>Here is how it works:</h3>
                <p className='rotate webline-promo-caption'>$$$</p>
                <br />
                <br />
                <h3 className='webline-promo-title yellow'>1. Business Referral</h3>
                <p className='webline-promo-text'>
                    Refer the business to Happy Code Webline Services to construct and maintain their website. Business cards and a spreadsheet will be provided to keep track of all referrals. This way we know which businesses came from which referral specialist.
                </p>
                <p className='webline-promo-text'>
                    Businesses can apply online: <a className='webline-link' href="https://wearehappycode.com/webline">Happy Code Webline Services</a>
                </p>
                <br />
                <div className='stack'>
                    <div className='padding'>
                        <h4>No Subscription</h4>
                        <br />
                        <h1>Ex. $2000</h1>
                        <p className='webline-promo-text'>
                            Once the website is made, no maintenance will follow. The full price of the website will be charged.
                        </p>
                    </div>
                    <div className='bg-purple padding'>
                        <h3 className='webline-promo-title'>With Subscription</h3>
                        <br />
                        <h1>Ex. $500 <span className='yellow'>75% off!</span></h1>
                        <p className='webline-promo-text'>
                            As a perk for subscribing to monthly maintenance services, an automatic 75% discount will be applied. After creating the website, an affordable maintenance fee will be charged each month.
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
                            We will complete daily tickets for changes, updates, additions, and removal of any text, photos, videos, layout, color, forms, posts, bugs, and much more. That ensures a healthy and fully functioning website.
                        </p>
                    </li>
                    <li>
                        <p className='webline-promo-text'>
                            SEO (Search Engine Optimization) updates: High Google ranking must be kept by consistent site upkeep. That is why there will be SEO maintenance every week to keep ranking higher in Google Index for greater customer reach.
                        </p>
                    </li>
                    <li>
                        <p className='webline-promo-text'>
                            It covers database and hosting charges. 
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

            <div className='webline-panel2'>
                <h2>
                    If you are interested in joining our team, <a className='yellow' href="/contact">reach out to us at any time!</a>
                </h2>
            </div>


            <Footer />
        </div>
    )
}
