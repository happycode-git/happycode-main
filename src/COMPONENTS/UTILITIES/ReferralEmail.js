import React, { useEffect, useState } from 'react'
// 
import '../STYLESHEETS/Webline.css'
import '../STYLESHEETS/ReferralEmail.css'
import Footer from './Footer'
import Navigation from './Navigation'
import { sendReferralEmail } from '../../firebase'
import ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux'
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'
// 
// 

export default function Webline() {
    const dispatch = useDispatch()
    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    const [name, setName] = useState("Happy Code Dev.")
    const [details, setDetails] = useState("Your website needs work in several areas, including user experience, search engine optimization, content, layout, mobile optimization, and accessibility. A well-made website can provide a multitude of benefits to a business, including improving its online visibility, enhancing its credibility and reputation, fostering stronger user engagement, and driving increased traffic and revenue to the business. ")
    const [score, setScore] = useState("6")

    const changeName = () => {
        const name = document.querySelector('#tbName').value
        if (name != "") {
            setName(name)
        } else {
            setName("Happy Code Dev.")
        }
        text = ReactDOMServer.renderToStaticMarkup(emailTemplate.HTML)
    }
    const changeScore = () => {
        const score = document.querySelector('#tbScore').value
        if (score != "") {
            setScore(score)
        } else {
            setScore("5.0")
        }
        text = ReactDOMServer.renderToStaticMarkup(emailTemplate.HTML)
    }
    const changeDetails = () => {
        const details = document.querySelector('#tbDetails').value
        if (details != "") {
            setDetails(details)
        } else {
            setDetails("Your website may need work in several areas, including user experience, search engine optimization, content, security, mobile optimization, accessibility, and analytics tracking. Improvements in these areas can help enhance the website's performance, user engagement, and search engine ranking.")
        }
        text = ReactDOMServer.renderToStaticMarkup(emailTemplate.HTML)
    }

    const sendEmail = () => {
        dispatch(setLoadingState(true))
        var email = document.querySelector('#tbEmail').value

        sendReferralEmail(email, text, dispatch)
            .then(() => {
                dispatch(setLoadingState(false))
                document.querySelector('#tbEmail').value = ""
                document.querySelector('#tbName').value = ""
                document.querySelector('#tbScore').value = ""
                document.querySelector('#tbDetails').value = ""
            })
            .catch(() => {
                dispatch(setLoadingState(false))
            })


    }

    const emailTemplate = {
        HTML: <div style={{ backgroundColor: 'white !important' }}>
            <div style={{ fontFamily: 'sans-serif', padding: '2em', backgroundColor: '#091018' }}>
                <h1 style={{ color: '#C9FD3A', fontSize: '2.8em', textAlign: 'center', letterSpacing: '-1px', transform: 'rotate(-2deg)', lineHeight: '90%' }}>HAPPY CODE<br />DEV.</h1>
                <h3 style={{ textAlign: 'center', display: 'block', color: '#ffffff', fontSize: '1.2em' }}>We make websites and apps!</h3>
                <p><a style={{ color: "#C9FD3A" }}>(619) 875 - 6441</a><br />
                    <a style={{ color: "#C9FD3A" }}>happycode.inbox@gmail.com</a><br />
                    <a href="https://wearehappycode.com" style={{ color: "#C9FD3A" }}>wearehappycode.com</a>
                </p>
            </div>

            <div style={{ display: 'block', width: '100%', maxWidth: '650px', margin: '1em auto', padding: '1em', color: '#1E232B', fontFamily: 'sans-serif' }}>
                <h1 style={{ color: '#1E232B', letterSpacing: '-1px', fontSize: '1.6em' }}>Hello {name},</h1>
                <br />
                {/* <h2 style={{ color: '#1E232B', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#C9FD3A', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content' }}>We make websites and apps!</h2> */}
                <p style={{ padding: '1em 0' }}>
                    We have observed that your website could benefit from some improvements, but there's no need to worry. Our team is ready to build you a stunning website.<br /><br />
                    Creating a professional website can be a daunting and expensive task. However, if you're interested in expanding your business in an inexpensive way without sacrificing quality, we can help take your website to the next level.<br /><br />

                    <b>Here is what we can do for you:</b>
                </p>
                <div style={{ padding: '2em', backgroundColor: '#1E232B', color: '#C9FD3A', fontWeight: 'bold', fontSize: '1.2em' }}>
                    <ul>
                        <li>Craft a stunning and fully-functional website with robust search engine optimization (SEO) ranking and impeccable user experience (UX) design.</li><br />
                        <li>Offer ongoing maintenance to ensure your site remains up-to-date, relevant, and functions smoothly on a daily basis.</li>
                        <br />
                        <li>Collaborate with you to refine and evolve your website over time, ensuring it continues to captivate your audience and reach an even wider audience.</li>
                    </ul>
                </div>
                <br />

                <div style={{ backgroundColor: '#1E232B', padding: '1em' }}>
                    <h1 style={{ color: "#ffffff", letterSpacing: '-1px', fontSize: '1.8em', padding: '0.2em 0', fontWeight: '800', textAlign: 'center', lineHeight: '1em' }}>Website Development Firms: ~ $2000</h1>
                    <h1 style={{ color: "#C9FD3A", letterSpacing: '-1px', fontSize: '2.8em', padding: '0.2em 0', fontWeight: '800', textAlign: 'center', lineHeight: '1em' }}>Happy Code Dev: ~ $400</h1>
                </div>
                <br />
                <img style={{ display: 'block', width: '100%' }} src="https://firebasestorage.googleapis.com/v0/b/happycode-5403.appspot.com/o/mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg?alt=media&token=dae699e9-ba7b-42de-9800-3d29f60179a7" />
                <br />

                <br />
                <h2 style={{ color: '#C9FD3A', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#1E232B', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content', letterSpacing: '-1px' }}>Website Assessment Score</h2>
                <div style={{ color: '#ffffff', padding: '1em', backgroundColor: '#1E232B' }}>
                    <h1 style={{ letterSpacing: '-1px', fontSize: '2.4em', padding: '0.4em 0', fontWeight: '800', lineHeight: '0.9em' }}>Based on our analysis, your website scored <span style={{ color: "#C9FD3A" }}>{score}</span> out of 10</h1>
                    <br />
                    <p style={{ fontSize: '1.4em', color: '#ffffff' }}>{details}</p>
                </div>

                <br />
                <h2 style={{ color: '#C9FD3A', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#1E232B', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content' }}>You can count on us!</h2>
                <p style={{ padding: '1em 0' }}>
                    From the very beginning, our top priority has been to assist businesses in connecting with a broader audience and delivering an enjoyable experience to each visitor. Our aim is to create a website that is so engaging that visitors will want to linger and explore every aspect of it. We firmly believe that only a competent and dedicated team can achieve this goal.
                </p>
                <h2 style={{}}>If you want more information or are eager to partner with us, visit this link on our website.</h2>
                <br />
                <a style={{ color: '#C9FD3A', padding: '0.6em', backgroundColor: '#1E232B', fontSize: '1.3em' }} href="https://wearehappycode.com/webline">www.wearehappycode.com/webline</a>
                <br />
                <br />
                <br />
                <div style={{ padding: '1em', backgroundColor: '#1E232B' }}>
                    <h1 style={{ color: '#C9FD3A' }}>THANKS!</h1>
                    <p style={{ fontSize: '1.2em', letterSpacing: '-1px', fontWeight: 'bold', color: '#C9FD3A' }}>Jesus Jimenez Santos,<br />Exec. Developer</p>
                    <br />
                    <p>
                        <a style={{ color: '#C9FD3A' }} target='_blank'>Phone: (619) 875 - 6441</a><br />
                        <a style={{ color: '#C9FD3A' }} target='_blank'>Email: happycode.inbox@gmail.com</a><br />
                        <a style={{ color: '#C9FD3A' }} href="https://wearehappycode.com" target='_blank'>www.wearehappycode.com</a>
                    </p>

                </div>
            </div>
        </div>
    }
    var text = ReactDOMServer.renderToStaticMarkup(emailTemplate.HTML)

    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='main'>
            <Navigation />
            <h1 className='webline-title'>Referral Email</h1>
            <br />
            <div className='webline-panel2'>
                <h2>
                    Use this page to send a promo email to any business. Make sure to fill all required fields.
                </h2>
            </div>
            <br />
            <div className='email-inputs'>
                <div className='email-inputs-pair'>
                    <input id="tbName" placeholder='Business Name' onChange={changeName} />
                    <input id="tbEmail" placeholder='Business Email' />
                    <input id="tbScore" placeholder='Site Health Score' onChange={changeScore} />
                </div>
                <textarea onChange={changeDetails} className='ta-email' id="tbDetails" placeholder='Enter any details concerning the health of their site. Use a list to show points.'></textarea>
            </div>


            <br />

            <div className='webline-panel2'>
                <h1>Email Template Preview</h1>
            </div>
            <br />

            <div className='email-template' dangerouslySetInnerHTML={{ __html: text }}>

            </div>

            <button className='email-btn' onClick={sendEmail}>Send Email</button>

            <Footer />
        </div>
    )
}
