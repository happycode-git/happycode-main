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
import video1 from '../VIDEOS/Screen Recording 2023-03-25 at 4.08.50 PM.mov'

export default function Webline() {
    const siteAlertState = useSelector((state) => state.siteAlert.value)
    const toggleSiteAlertState = useSelector((state) => state.toggleSiteAlert.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    const [weblineAppState, setWeblineAppState] = useState(false);

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
            <Navigation />
            <h1 className='webline-title'>Webline</h1>
            <div className='webline-panel1'>
                <div className='webline-login'>
                    <h1>Member Login</h1>
                    <div className='webline-login-inputs'>
                        <input id="tbEmail" type="email" placeholder='Email' className='webline-login-input' />
                        <input id="tbPass" type="password" placeholder='Password' className='webline-login-input' />
                        <button className='webline-login-btn' onClick={signIn}>Let's Go!</button>
                        {
                            toggleSiteAlertState ?
                                <p className='webline-site-err'>{siteAlertState}</p> : <p></p>
                        }
                    </div>

                </div>
            </div>
            <br />
            <div className='webline-panel2'>
                <h1>Partnerships <br />Everywhere!</h1>
                <p className='rotate apply-now'>Apply now*</p>
                <h2>
                    We partner with businesses who want a strong presence. To be top ranked in searches or advertising, a website must be in tip-top shape.
                </h2>
            </div>
            <div className='webline-panel2-1'>
                <video src={video1} controls="true" autoPlay="true" loop="true"></video>
                <a href="https://happy-code-template-sample.web.app" target="_blank" className='sample-link'>View Sample</a>
            </div>
            <div className='split'>
                <div className='webline-panel3'>
                    <h3 className='webline-promo-title'>Here is what we can do for you.</h3>
                    <p className='rotate webline-promo-caption'>Us vs. Them</p>
                    <p className='webline-promo-text'>
                        Normally you would pay around <b>$3000 - $5000</b> for a functioning website. Aside from providing mediocre work, others will charge for every little add-on and find any excuse to charge exponentially for maintenance. In addition, updates and changes will be extra; if they even offer maintenance.
                    </p>
                    <div className='webline-promo-prices'>
                        <div>
                            <h4>Us:</h4>
                            <div className='flex'><h1>$400-$800</h1><span className='light-red'>75% off!</span></div>
                        </div>
                        <div>
                            <h4>Them:</h4>
                            <h1>$3000+</h1>
                        </div>
                    </div>
                    <p className='webline-promo-text'>
                        When we say that we remove 75% off the original price, we mean that after all requested pages have been added to the shopping list, we immediately chop off 75% from the total; under the condition that you become a membership partner and subscribe to our afforable monthly maintenance.
                    </p>
                    <p className='webline-promo-text'>
                        Our job is to think outside the box. What can we do to make your site be what your business needs? It all comes down to creativity and beauty. Both will do the trick.
                    </p>
                    <br />
                    <br />
                    <h3 className='webline-promo-title'>Taking your website to the doctor</h3>
                    <p className='rotate webline-promo-caption'>Memberships</p>
                    <p className='webline-promo-text-important bg-darker pad'>
                        Here at <b>Happy Code Webline Services</b>, we provide monthly subscriptions for maintenance. You pay for us to change a photo, the menu, add a new page, update text, add a blog post, change color palette, etc. Remember, this maintenance is what keeps your site relevant and ranked high in search.
                    </p>
                    <p className='webline-promo-text'>
                        In addition, we provide frequent SEO maintenance to keep your site relevant. You do not need to ask for this service. We will take care of it for you.
                    </p>
                    <br />
                    <div className='webline-promo-prices'>
                        <div>
                            <h4>Average Subscriptions:</h4>
                            <div className='flex'><h1>$40-$60</h1><p style={{ color: "#FEFEFF" }}>/mo</p></div>
                        </div>
                    </div>
                    <p className='webline-promo-text'>
                        Subscriptions are determined by the amount of work that is needed to keep it maintained. We don't expect you to do any work besides tell us what you want changed. Otherwise, we will make sure that your site is healthy and running at full capacity.
                    </p>
                </div>
                <div id="panel4" className='webline-panel4'>
                    <h1>Become a partner today</h1>
                    <p className='rotate apply-now'>How to:</p>
                    <div className='webline-steps'>
                        <h2>1. Apply using this form:</h2>
                        <button className='webline-partnership-toggle' onClick={() => { setWeblineAppState(true); document.getElementById('webline-form').scrollIntoView(); }}>Webline Application Form</button>
                        <div className='webline-partnership-form'>

                        </div>
                        <h2>2. Schedule Consultation</h2>
                        <p>Every partner is given a consultation to map out the contents of the entire website. here, it will be decided what pages will be made, components, external services such as photographers, domain set up, etc.</p>
                        <h2>3. $$$</h2>
                        <p>Here is when we determine the overall price of the website. Fear not, we give you an automatic <b>75% OFF</b> if you want to subscribe to monthly maintenance services. Keep in mind that take your budget into consideration. Once the initial fee is paid, the construction process can begin.</p>
                        <h2>3. Under Development</h2>
                        <p>The building process will be the most crucial step. We can make the website without a problem, but we need to make sure it meets the standards of both the partner and SEO ranking. Thus, we work hard to make sure you are happy with the progress by giving you weekly updates, and do our best to ensure the site is set up for success with proper SEO.</p>
                        <h2>4. Testing 1, 2, 3..</h2>
                        <p>Before the site is made live, a developer will provide one last consultation to ensure the site is ready for launch. Once approved, the site will be made public for the world to enjoy! At this moment, the subscription will begin.</p>
                        <h2>4. Maintenance</h2>
                        <p>Like mentioned before, maintenance is the best thing you can do for your website. Not only will it keep it fresh with updated content, but it will help maintaing high ranking in search and advertisements.</p>
                    </div>
                </div>
            </div>
            <div id="webline-form">
                {
                    weblineAppState ?
                        <div className='webline-app'>

                            <div className='webline-app-top'>
                                <div className='flex'>
                                    <h1>Webline Application</h1>
                                    <HiXMark className='webline-app-xmark' onClick={() => { setWeblineAppState(false); document.getElementById('panel4').scrollIntoView(); }} />
                                </div>
                                <h2 className='rotate'>A new beginning</h2>
                                <p>This application is meant to give us an idea of who you and your business are. We believe in choosing candidates who have a true passion for what they do. In return, we try our best to keep that passion profitable through means of digital marketing.</p>
                            </div>
                            <div className='webline-app-form'>
                                <h2 className='webline-app-label'>Contact Full Name</h2>
                                <input className='webline-app-input' type="text" placeholder='John Doe' />
                                <h2 className='webline-app-label'>Contact Email</h2>
                                <input className='webline-app-input' type="email" placeholder='jdoe@happycode.com' />
                                <h2 className='webline-app-label'>Contact Phone</h2>
                                <input className='webline-app-input' type="text" placeholder='(123)123-1234' />
                                <h2 className='webline-app-label'>Business Name</h2>
                                <input className='webline-app-input' type="text" placeholder='Johnnys San Diego Coffee Shop' />
                                <h2 className='webline-app-label'>Business Email</h2>
                                <input className='webline-app-input' type="email" placeholder='john@coffeeshop.com' />
                                <br />
                                <br />
                                <h2 className='webline-app-label'>Do you have an existing website?</h2>
                                <select className='webline-app-select'>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                                <h2 className='webline-app-label'>Tell us a bit about your business.</h2>
                                <textarea className='webline-app-textarea' placeholder='1000 chars max.'></textarea>
                                <h2 className='webline-app-label'>What is your main goal with having a website.</h2>
                                <textarea className='webline-app-textarea' placeholder='1000 chars max.'></textarea>
                                <h2 className='webline-app-label'>How did you hear about us?</h2>
                                <input className='webline-app-input' type="text" placeholder='Google, Friend, etc.' />
                                <h2 className='webline-app-label'>What is your budget to build this website?</h2>
                                <input className='webline-app-input' type="text" placeholder='$800' />
                                <p>Keep in mind, this is not the monthly subscription budget. This budget covers the cost to make the website. Rest assured, you will pay 25% of our total cost if you subscribe to monthly maintenance services.</p>
                                <h3>Please review all entries before submitting.</h3>
                                <br />
                                <button className='webline-app-btn'>Submit</button>
                            </div>
                        </div> : <div></div>
                }
            </div>


            <Footer />
        </div>
    )
}
