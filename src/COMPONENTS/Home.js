import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
// 
import './STYLESHEETS/Home.css'
// 
import { BsArrowRightCircle } from 'react-icons/bs'
import Navigation from './UTILITIES/Navigation'
import Footer from './UTILITIES/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }
    useEffect(() => {
        closeNav()
    }, [])

    return (
        <div className='main home'>
            <Helmet>
                <title>Happy Code Dev. | Home</title>
                <meta name="description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta name="keywords" content="web development, small business, low cost, maintenance benefits, Happy Code" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://wearehappycode.com`} />
                <meta property="og:title" content="Happy Code Template | Home" />
                <meta property="og:description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta property="og:url" content={`https://wearehappycode.com`} />
                <meta property="og:image" content={`https://wearehappycode.com/src/PHOTOS/stock.png`} />
            </Helmet>
            <Navigation />
            <div className='home-panel1'>
                <div className='we-are-happy-code'>
                    <h1 className='we-are'>We are<br /></h1>
                    <h2 className='happy-code'>Happy<br />Code</h2>
                </div>
                <p>We make websites and apps.</p>
            </div>
            <div className='home-panel2'>
                <h1 className='home-panel2-title'>
                    Which are you looking for?<br />

                </h1>
                <h1 className='rotate bg-purple home-panel2-caption'>Pick one*</h1>
                <div className='home-panel2-options'>
                    <div className='home-panel2-option1'>
                        {/* <HiDesktopComputer className='home-panel2-option-icon' /> */}
                        <div className='home-panel2-option-block'>
                            <h1>Webline</h1>
                            <p>Beautiful websites made for local businesses. Get cheapest price if you subscribe to maintenance services.</p>
                        </div>
                        <Link to="webline" className='home-panel2-option-icon'> <BsArrowRightCircle /></Link>
                    </div>
                    {/* <div className='home-panel2-option'>
                        <HiDesktopComputer className='home-panel2-option-icon' />
                        <div className='home-panel2-option-block'>
                            <h1>Appline</h1>
                            <p>Apps made for business solutions. Subscribe for maintenance services to keep your business running efficiently.</p>
                        </div>
                        <Link to="appline" className='home-panel2-option-icon'> <BsArrowRightCircle /></Link>
                    </div> */}
                    <div className='home-panel2-option'>
                        {/* <HiDesktopComputer className='home-panel2-option-icon' /> */}
                        <div className='home-panel2-option-block'>
                            <h1>Products</h1>
                            <p>Peek into the spectacular products that we have created which are made to make life easier for the people.</p>
                        </div>
                        <Link to="products" className='home-panel2-option-icon'> <BsArrowRightCircle /></Link>
                    </div>
                    {/* <div className='home-panel2-option'>
                        <div className='home-panel2-option-block'>
                            <h1>Idea Generator</h1>
                            <p>Do you have an app idea that you want to see come to life? We build websites and apps even for the most creative and outrageous ideas.</p>
                        </div>
                        <Link to="ideas" className='home-panel2-option-icon'> <BsArrowRightCircle /></Link>
                    </div> */}
                </div>
            </div>
            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
            <Footer />
        </div>
    )
}
