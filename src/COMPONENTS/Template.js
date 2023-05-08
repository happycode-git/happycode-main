import React, { useEffect, useState } from 'react'
// 
import './STYLESHEETS/Webline.css'
import './STYLESHEETS/Template.css'
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
import { Helmet } from 'react-helmet'

export default function Webline() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    const pages = [
        {
            id: 0,
            name: "Home 1",
            url: 'https://happy-code-templates.web.app/',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 1,
            name: "Home 2",
            url: 'https://happy-code-templates.web.app/home2',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 2,
            name: "Home 3",
            url: 'https://happy-code-templates.web.app/home3',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 32,
            name: "Home 4",
            url: 'https://happy-code-templates.web.app/home4',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 33,
            name: "Home 5",
            url: 'https://happy-code-templates.web.app/home5',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 34,
            name: "Home 6",
            url: 'https://happy-code-templates.web.app/home6',
            desc: 'Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.'
        },
        {
            id: 3,
            name: "About",
            url: 'https://happy-code-templates.web.app/about',
            desc: 'Talk about the way the business came to be. This is for users who want to know exactly who they are doing business with.'
        },
        {
            id: 4,
            name: "History",
            url: 'https://happy-code-templates.web.app/history',
            desc: 'Give the user a glimpse into the history of the business. This helps gain credibility and trust.'
        },
        {
            id: 5,
            name: "Services",
            url: 'https://happy-code-templates.web.app/services',
            desc: 'Show a list of services the business provides with interactive show and hide features.'
        },
        {
            id: 6,
            name: "Products (Simple)",
            url: 'https://happy-code-templates.web.app/products',
            desc: 'Show all products and provide simple information individually. For reading purposes only.'
        },
        {
            id: 7,
            name: "Careers (Simple)",
            url: 'https://happy-code-templates.web.app/careers',
            desc: 'In the case that the business is hiring, this will provide essential information about the hiring process and open positions.'
        },
        {
            id: 8,
            name: "Partners",
            url: 'https://happy-code-templates.web.app/partners',
            desc: 'Show all vendors that are affiliated with the business. Their links will be provided to help with SEO.'
        },
        {
            id: 9,
            name: "Bio",
            url: 'https://happy-code-templates.web.app/bio',
            desc: 'Allow users to meet the essential workers of the business in a simple yet structured biography page.'
        },
        {
            id: 10,
            name: "Pricing",
            url: 'https://happy-code-templates.web.app/pricing',
            desc: 'If the business offers services, a set of pricing options can be displayed with information about what can be attained for each tier.'
        },
        {
            id: 11,
            name: "Gallery (Simple)",
            url: 'https://happy-code-templates.web.app/gallery',
            desc: 'Display a set of pictures or videos in a neat and clean gallery. Responsive to avoid unwanted whitespace.'
        },
        {
            id: 12,
            name: "Features",
            url: 'https://happy-code-templates.web.app/features',
            desc: 'If you offer products or services, show off your greatest features and how they will benefit the customer.'
        },
        {
            id: 13,
            name: "Portfolio",
            url: 'https://happy-code-templates.web.app/portfolio',
            desc: 'For professionals, this page will show links, images, and information of previous work.'
        },
        {
            id: 14,
            name: "Awards",
            url: 'https://happy-code-templates.web.app/awards',
            desc: 'A list of awards displayed in a way to convey the importance of professional or business achievements.'
        },
        {
            id: 15,
            name: "Coupons",
            url: 'https://happy-code-templates.web.app/coupons',
            desc: 'In-store coupons can be displayed along with any information and conditions. For reading purposes only.'
        },
        {
            id: 16,
            name: "Join Email List",
            url: 'https://happy-code-templates.web.app/mailinglist',
            desc: 'Get users to stay updated with the business by allowing them to enter their email and submit to join an email list.'
        },
        {
            id: 17,
            name: "Team",
            url: 'https://happy-code-templates.web.app/team',
            desc: 'Get to know the team members of your business and what they do; maybe even where they come from.'
        },
        {
            id: 18,
            name: "Locations",
            url: 'https://happy-code-templates.web.app/locations',
            desc: 'Display all locations and their hours, along with an interactive map for each.'
        },
        {
            id: 19,
            name: "Quote (Simple)",
            url: 'https://happy-code-templates.web.app/quote',
            desc: 'Inform the user on different quotes for several scenarios. They can also leave their information in a simple quote form for future contact.'
        },
        {
            id: 20,
            name: "Landing",
            url: 'https://happy-code-templates.web.app/landing',
            desc: 'A page made up of three or more panels. Home, Contact, and Misc panels.'
        },
        {
            id: 21,
            name: "Login/Members",
            url: 'https://happy-code-templates.web.app/login',
            desc: 'Allow members to log in and with full authentication and member storage capabilities. Works with Shop, and Dashboard components.'
        },
        {
            id: 22,
            name: "Contact",
            url: 'https://happy-code-templates.web.app/contact',
            desc: 'Give your visitors an easy way to contact you or get in touch with you. All entries will be sent to your account.'
        },
        {
            id: 23,
            name: "Events",
            url: 'https://happy-code-templates.web.app/events',
            desc: 'Display upcoming events with pictures and full explanations. Sorted by most recent date.'
        },
        {
            id: 24,
            name: "Reviews",
            url: 'https://happy-code-templates.web.app/reviews',
            desc: 'Show what people are saying about your business. All reviews can be pulled from Yelp or other review sites.'
        },
        {
            id: 25,
            name: "FAQ",
            url: 'https://happy-code-templates.web.app/faq',
            desc: "Answer your customer's most frequently asked questions. Page will come with a search for better experience."
        },
        {
            id: 26,
            name: "Tutorials",
            url: 'https://happy-code-templates.web.app/tutorials',
            desc: 'For courses or classes, the tutorials page allows a series of videos as well as YouTube links to be displayed ina clean and clear layout.'
        },
        {
            id: 27,
            name: "Menu",
            url: 'https://happy-code-templates.web.app/menu',
            desc: 'Show a simple menu with all menu items, descriptions, and prices. Perfect for restaurants, cafes, and other eateries.'
        },
        {
            id: 28,
            name: "Blog",
            url: 'https://happy-code-templates.web.app/blog',
            desc: 'Let your customers keep up with the latest information about the business, services, products, news, etc in blog form.'
        },
        {
            id: 29,
            name: "Custom Form",
            url: 'https://happy-code-templates.web.app/form',
            desc: 'In some cases, you will need to gather information from your visitors whether its by application, survey, or even for calculations.'
        },
        {
            id: 30,
            name: "Schedule",
            url: 'https://happy-code-templates.web.app/schedule',
            desc: 'Allow your customers to schedule using a clean scheduler UI which sends email confirmations and updates.'
        },
        {
            id: 31,
            name: "Online Store",
            url: 'https://happy-code-templates.web.app/shop',
            desc: 'Full store with payment capabilities. All products will be available for purchase. One time payments only. Saved payment methods not available.'
        }
    ]

    const [tempPages, setTempPages] = useState([])

    const searchPage = () => {
        const text = document.querySelector("#tbSearch").value.toLowerCase()
        setTempPages(pages)
        if (text != "") {
            var newArray = tempPages.filter(function (el) {
                return el.name.toLowerCase().includes(text);
            });
            setTempPages(newArray)
        }

    }

    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
        setTempPages(pages)
    }, [])
    return (
        <div className='main'>
             <Helmet>
                <title>Template | Happy Code Dev.</title>
                <meta name="description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta name="keywords" content="web development, small business, low cost, maintenance benefits, Happy Code" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://wearehappycode.com`} />
                <meta property="og:title" content="Happy Code Template | Template" />
                <meta property="og:description" content="Happy Code is a top-rated web development company that specializes in creating professional websites for small businesses. Our services are affordable, and we offer great maintenance benefits to ensure your website stays up-to-date and secure. Contact us today to learn more about our services and how we can help your business grow online." />
                <meta property="og:url" content={`https://wearehappycode.com`} />
                <meta property="og:image" content={`https://wearehappycode.com/src/PHOTOS/stock.png`} />
            </Helmet>
            <Navigation />
            <h1 className='webline-title'>Template</h1>
            <div className='webline-panel2'>
                <h1>Let's do some shopping!</h1>
                <p className='rotate apply-now'>More to come...</p>
                <h2>
                    Our template website was created with the business and customer in mind. The layout is perfectly fit for any device and easy to navigate. Building a website is like building a Lego set. Here are your blocks. Let's get together and build a work of art.
                </h2>
            </div>

            <div className='search-page'>
                <input type="text" id="tbSearch" className='search-page-tb' placeholder='Search for page...' onChange={searchPage} />
            </div>
            <br />
            <div className='pages'>
                {
                    tempPages.map((page, i) => {
                        return (
                            <div key={i} className='page'>
                                <h1>{page.name}</h1>
                                <iframe className='frame' src={page.url}></iframe>
                                <p>{page.desc}</p>
                                <a href={page.url} target='_blank' className='sample-link'>View in Browser</a>
                            </div>
                        )
                    })
                }
            </div>

            <div className='other-pages'>
                <h1>Other Available Pages</h1>
                <div className='other-list'>
                    <h4>Privacy Policy</h4>
                    <h4>Estimates (Simple)</h4>
                    <h4>Misc (Simple)</h4>
                    <h4>Dashboard</h4>
                    <h4>Support</h4>
                    <h4>Misc (Standard)</h4>
                    <h4>Timecard</h4>
                    <h4>Products (Interactive)</h4>
                    <h4>Services (Interactive)</h4>
                    <h4>Gallery (Interactive)</h4>
                    <h4>Menu (Interactive)</h4>
                    <h4>Quote (Interactive)</h4>
                    <h4>Careers (Interactive)</h4>
                    <h4>Misc (Interactive)</h4>
                    <h4>Rewards (Interactive)</h4>
                    <h4>Misc (Complex)</h4>
                    <h4>Sign Up/Members</h4>
                    <h4>Forum</h4>
                    <h4>Inventory</h4>
                    <h4>Invoices</h4>
                    <h4>Misc (Innovative)</h4>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    )
}
