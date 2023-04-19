import React, { useEffect, useState } from 'react'
// 
import '../STYLESHEETS/Webline.css'
import '../STYLESHEETS/ReferralEmail.css'
import Footer from './Footer'
import Navigation from './Navigation'
import { sendReferralEmail } from '../../firebase'
import ReactDOMServer from 'react-dom/server';
// 
// 

export default function Webline() {

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    const [name, setName] = useState("Happy Code Dev.")
    const [details, setDetails] = useState("Your website may need work in several areas, including user experience, search engine optimization, content, security, mobile optimization, accessibility, and analytics tracking. Improvements in these areas can help enhance the website's performance, user engagement, and search engine ranking. ")
    const [score, setScore] = useState("5.0")

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
        const email = document.querySelector('#tbEmail').value

        sendReferralEmail(email, text)
    }

    const emailTemplate = {
        HTML: <div>
            <div style={{ fontFamily: 'sans-serif', padding: '2em', backgroundColor: '#091018' }}>
                <h1 style={{ color: '#C9FD3A', fontSize: '2.8em', textAlign: 'center', letterSpacing: '-1px', transform: 'rotate(-2deg)', lineHeight: '90%' }}>HAPPY CODE<br />DEV.</h1>
            </div>

            <div style={{ display: 'block', width: '100%', maxWidth: '650px', margin: '1em auto', padding: '1em', color: '#1E232B', fontFamily: 'sans-serif' }}>
                <h1 style={{ color: '#1E232B', letterSpacing: '-1px', fontSize: '1.6em' }}>Hello {name},</h1>
                <br />
                <h2 style={{ color: '#1E232B', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#C9FD3A', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content' }}>We make websites and apps!</h2>
                <p style={{ padding: '1em 0' }}>
                    We noticed that your website needs a bit of help. No stress! We are here to help you.<br />
                    Getting a professional website made can be expensive and time consuming. Here is what we can do for you:<br />
                </p>
                <div style={{ padding: '2em', backgroundColor: '#1E232B', color: '#C9FD3A', fontWeight: 'bold', fontSize: '1.2em' }}>
                    <ul>
                        <li>Create a beautiful, fully functioning website with strong SEO ranking and proper UX design.</li>
                        <li>Provide maintenance to ensure your site is relevant and working properly on the daily basis.</li>
                        <li>Work with you to help evolve the website over time to be better and reach a larger audience.</li>
                    </ul>
                </div>
                <br />
                <img style={{ display: 'block', width: '100%' }} src="https://firebasestorage.googleapis.com/v0/b/happycode-5403.appspot.com/o/mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg?alt=media&token=dae699e9-ba7b-42de-9800-3d29f60179a7" />

                <br />
                <h1 style={{ color: "#1E232B", letterSpacing: '-1px', fontSize: '1.8em', padding: '0.2em 0', fontWeight: '800', textAlign: 'center' }}>Them: $2000</h1>
                <h1 style={{ color: "#1E232B", letterSpacing: '-1px', fontSize: '2.8em', padding: '0.2em 0', fontWeight: '800', textAlign: 'center' }}>Us: $400</h1>
                <br />
                <h2 style={{ color: '#1E232B', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#C9FD3A', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content' }}>Website Health Score</h2>
                <div style={{ padding: '1em', backgroundColor: '#1E232B' }}>
                    <h1 style={{ color: "#C9FD3A", letterSpacing: '-1px', fontSize: '2.4em', padding: '0.4em 0', fontWeight: '800' }}>Your website scored: {score}</h1>
                </div>
                <br />
                <p>{details}</p>
                <br />
                <h2 style={{ color: '#1E232B', fontSize: '1.6em', lineHeight: '95%', backgroundColor: '#C9FD3A', padding: '0.4em', borderRadius: '6px', transform: 'rotate(-2deg)', width: 'fit-content' }}>We are here to help.</h2>
                <p style={{ padding: '1em 0' }}>
                    Our main goal has always been to help a business reach more people and create an experience that each visitor can enjoy. They should want to stay longer and check everything out. This is only possible with the right team.
                </p>
                <h2 style={{}}>If you want more information or are eager to partner with us, visit this link on our website.</h2>
                <a href="https://wearehappycode.com/webline">www.wearehappycode.com/webline</a>
                <br />
                <br />
                <br />
                <div style={{ padding: '1em', backgroundColor: '#1E232B' }}>
                    <h1 style={{ color: '#C9FD3A' }}>THANKS!</h1>
                    <p style={{ fontSize: '1.2em', letterSpacing: '-1px', fontWeight: 'bold', color: '#C9FD3A' }}>Jesus Jimenez Santos,<br />Exec. Developer</p>
                    <br />
                    <p style={{ color: '#C9FD3A' }}>Phone: (619) 875 - 6441</p>
                    <p style={{ color: '#C9FD3A' }}>Email: happycode.inbox@gmail.com</p>
                    <a style={{ color: '#C9FD3A' }} href="https://wearehappycode.com" target='_blank'>www.wearehappycode.com</a>
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
