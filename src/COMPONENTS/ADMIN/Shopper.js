import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/Shopper.css'
// 
import { BsArrowRightCircle, BsChevronLeft, BsFillXCircleFill, BsThreeDotsVertical, BsEye } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai'
import { randomString } from '../../Global'
import { setOutlineState } from '../../REDUX/REDUCERS/OutlineSlice'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'


export default function Shopper() {
    const admin = useSelector((state) => state.admin.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [togglePageList, setTogglePageList] = useState(false)
    const [pages, setPages] = useState([])
    const [chosenPageID, setChosenPageID] = useState("")
    const [total, setTotal] = useState(0)

    const continueForm = () => {
        dispatch(setLoadingState(true))
        var newArr = []
        for (var i in pages) {
            const info = document.querySelector(`#taInfo${i}`).value

            const newComp = {
                id: pages[i].id,
                Name: pages[i].Name,
                Details: pages[i].Details,
                Info: info,
                Price: pages[i].Price
            }
            newArr.push(newComp)
        }
        dispatch(setOutlineState(newArr))
        dispatch(setLoadingState(false))
        navigate('/newpartner')
    }

    useEffect(() => {
        console.log(admin)
        if (admin.id == null) {
            navigate("/admin")
            return
        }
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/admindash"><BsChevronLeft /></Link>
                <h2 className='project-title'>Website Outline</h2>
            </div>
            <p className='shopper-info'>Before you begin, make sure you are filling out this form with the business owner/manager. This will keep all details as accurate as possible. Use the plus button on the bottom right corner to add new pages.</p>
            {
                pages.length > 0 ?
                    <div className='shopper'>
                        <div className='shopper-pages'>
                            {
                                pages.map((page, i) => {
                                    return (
                                        <div key={i} className={`shopper-page ${i == 0 ? "block1" : ""}`}>
                                            <div className='flex'>
                                                <h1>{page.Name}</h1>
                                                <BsThreeDotsVertical onClick={() => {
                                                    page.id != chosenPageID ?
                                                        setChosenPageID(page.id) : setChosenPageID("");
                                                }} className='shopper-page-icon' color="gray" />
                                            </div>
                                            <p>{page.Details}</p>
                                            <div>
                                                <h4>Details</h4>
                                                <textarea id={`taInfo${i}`} className='shopper-ta' placeholder='Enter all information describing the structure and content of this page. Everything here will determine the construction of the page.'></textarea>
                                                {/* <textarea id={`taRequests${i}`} className='shopper-ta' placeholder='Enter any extra requests for ideas aside from the details given above.'></textarea> */}
                                                {
                                                    page.id == chosenPageID ?
                                                        <div>
                                                            <a target="_blank" href={page.URL} className='shopper-view'>View Sample</a>
                                                            <button onClick={() => {
                                                                dispatch(setLoadingState(true))
                                                                setChosenPageID("")
                                                                var tempTot = total
                                                                tempTot -= page.Price
                                                                setTotal(tempTot)
                                                                var tempArr = pages
                                                                for (var p in tempArr) {
                                                                    if (tempArr[p].id == page.id) {
                                                                        tempArr.splice(p, 1)
                                                                    }
                                                                }
                                                                setPages(tempArr)
                                                                dispatch(setLoadingState(false))
                                                            }} className='shopper-remove'>Remove</button>
                                                        </div> : <p></p>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            pages.length > 0 ?
                                <div className='shopper-bottom'>
                                    <h3 className='shopper-total'>Total: ${total}</h3>
                                    <h1 className='shopper-sub'>Subscribe and only pay <span className='underline'>${total * 0.25}</span>! <br />then $<span className='underline'>{total * 0.25 * 0.15}</span> a month!</h1>
                                    <br />
                                    <button className='shopper-cont' onClick={continueForm}>Continue</button>
                                </div> : <div></div>
                        }
                    </div>
                    : <div></div>
            }
            {
                togglePageList ?
                    <div className='shopper-newpage-list'>
                        <div className='newpage-top flex'>
                            <h1>Pick a page</h1>
                            <BsFillXCircleFill className='shopper-close' onClick={() => { setTogglePageList(false) }} color="gray" />
                        </div>
                        <h2 className='tier'>$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block block1'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Home</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Home",
                                        Details: "Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>About</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/about"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Talk about the way the business came to be. This is for users who want to know exactly who they are doing business with.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "About",
                                        Details: "Talk about the way the business came to be. This is for users who want to know exactly who they are doing business with.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/about"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>History</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/history"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Give the user a glimpse into the history of the business. This helps gain credibility and trust.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "History",
                                        Details: "Give the user a glimpse into the history of the business. This helps gain credibility and trust.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/history"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Services</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/services"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show a list of services the business provides with interactive show and hide features.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services",
                                        Details: "Show a list of services the business provides with interactive show and hide features.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/services"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Products {"("}Simple{")"}</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/products"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show all products and provide simple information individually. For reading purposes only.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: `Products ${"("}Simple${")"}`,
                                        Details: "Show all products and provide simple information individually. For reading purposes only.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/products"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Careers (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/careers"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>In the case that the business is hiring, this will provide essential information about the hiring process and open positions.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Careers (Simple)",
                                        Details: "In the case that the business is hiring, this will provide essential information about the hiring process and open positions.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/careers"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Partners</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/partners"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show all vendors that are affiliated with the business. Their links will be provided to help with SEO.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Partners",
                                        Details: "Show all vendors that are affiliated with the business. Their links will be provided to help with SEO.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/partners"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Bio</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/bio"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Allow users to meet the essential workers of the business in a simple yet structured biography page.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Bio",
                                        Details: "Allow users to meet the essential workers of the business in a simple yet structured biography page.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/bio"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Pricing</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/pricing"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>If the business offers services, a set of pricing options can be displayed with information about what can be attained for each tier.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Pricing",
                                        Details: "If the business offers services, a set of pricing options can be displayed with information about what can be attained for each tier.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/pricing"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Gallery (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/gallery"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display a set of pictures or videos in a neat and clean gallery. Responsive to avoid unwanted whitespace.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Simple)",
                                        Details: "Display a set of pictures or videos in a neat and clean gallery. Responsive to avoid unwanted whitespace.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/gallery"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Features</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/features"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>If you offer products or services, show off your greatest features and how they will benefit the customer.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Features",
                                        Details: "If you offer products or services, show off your greatest features and how they will benefit the customer.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/features"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Portfolio</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/portfolio"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>For professionals, this page will show links, images, and information of previous work.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Portfolio",
                                        Details: "For professionals, this page will show links, images, and information of previous work.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/portfolio"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Awards</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/awards"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>A list of awards displayed in a way to convey the importance of professional or business achievements.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Awards",
                                        Details: "A list of awards displayed in a way to convey the importance of professional or business achievements.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/awards"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Coupons (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/coupons"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>In-store coupons can be displayed along with any information and conditions. For reading purposes only.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Coupons (Simple)",
                                        Details: "In-store coupons can be displayed along with any information and conditions. For reading purposes only.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/coupons"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Join Email List</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/mailinglist"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Get users to stay updated with the business by allowing them to enter their email and submit to join an email list.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Join Email List",
                                        Details: "Get users to stay updated with the business by allowing them to enter their email and submit to join an email list.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/mailinglist"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Rewards (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/rewards"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display information about current rewards and their conditions. For reading purposes only.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Simple)",
                                        Details: "Display information about current rewards and their conditions. For reading purposes only.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/rewards"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Team</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/locations"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Get to know the team members of your business and what they do; maybe even where they come from.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Team",
                                        Details: "Display all locations and their hours, along with an interactive map for each.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/team"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Locations</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/locations"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display all locations and their hours, along with an interactive map for each.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Locations",
                                        Details: "Display all locations and their hours, along with an interactive map for each.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/locations"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Privacy Policy</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/privacy"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show the company's Privacy Policy and/or Terms and Conditions in a simple way that is easy to understand.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Privacy Policy",
                                        Details: "Show the company's Privacy Policy and/or Terms and Conditions in a simple way that is easy to understand.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/privacy"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Quote (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/quote"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Inform the user on different quotes for several scenarios. They can also leave their information in a simple quote form for future contact.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Simple)",
                                        Details: "Inform the user on different quotes for several scenarios. They can also leave their information in a simple quote form for future contact.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/quote"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Estimates (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/estimates"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Similar to quotes, but provides a deep look into how estimates are determined and performed.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Estimates (Simple)",
                                        Details: "Similar to quotes, but provides a deep look into how estimates are determined and performed.",
                                        Price: 100,
                                        URL: "https://happy-code-templates.web.app/estimates"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Simple page can be constructed with any of the information components such as text, images, videos, or links.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Simple)",
                                        Details: "Simple page can be constructed with any of the information components such as text, images, videos, or links.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Landing</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/landing"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$150</h3>
                                    </div>
                                    <p>A page made up of three or more panels. Home, Contact, and Misc panels.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Landing",
                                        Details: "A page made up of three or more panels. Home, Contact, and Misc panels.",
                                        Price: 150,
                                        URL: "https://happy-code-templates.web.app/landing"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 150
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                        </div>
                        <h2 className='tier'>$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Contact</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/contact"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Give your visitors an easy way to contact you or get in touch with you. All entries will be sent to your account.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Contact",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/contact"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Events</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/events"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Display upcoming events with pictures and full explanations. Sorted by most recent date.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Events",
                                        Details: "Display upcoming events with pictures and full explanations. Sorted by most recent date.",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/events"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Support</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/support"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Display videos, articles, and information that may help the visitor answer any unanswered question.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Support",
                                        Details: "Display videos, articles, and information that may help the visitor answer any unanswered question.",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/support"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Reviews</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/reviews"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Show what people are saying about your business. All reviews can be pulled from Yelp or other review sites.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Reviews",
                                        Details: "",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/reviews"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>FAQ</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/faq"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Answer your customer's most frequently asked questions. Page will come with a search for better experience.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "FAQ",
                                        Details: "Answer your customer's most frequently asked questions. Page will come with a search for better experience.",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/faq"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Menu (Simple)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/menu"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Show a simple menu with all menu items, descriptions, and prices. Perfect for restaurants, cafes, and other eateries.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Simple)",
                                        Details: "Show a simple menu with all menu items, descriptions, and prices. Perfect for restaurants, cafes, and other eateries.",
                                        Price: 200,
                                        URL: "https://happy-code-templates.web.app/menu"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Standard)</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Page with more interaction and customization. Comes with an extra customized page that it will redirect to.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Standard)",
                                        Details: "Page with more interaction and customization. Comes with an extra customized page that it will redirect to.",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                        </div>
                        <h2 className='tier'>$$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Blog</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/blog"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Let your customers keep up with the latest information about the business, services, products, news, etc in blog form.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Blog",
                                        Details: "Let your customers keep up with the latest information about the business, services, products, news, etc in blog form.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/blog"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Custom Form</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/form"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>In some cases, you will need to gather information from your visitors whether its by application, survey, or even for calculations.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Custom Form",
                                        Details: "In some cases, you will need to gather information from your visitors whether its by application, survey, or even for calculations.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/form"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Schedule</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/schedule"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Allow your customers to schedule using a clean scheduler API which sends email confirmations and updates.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Schedule",
                                        Details: "Allow your customers to schedule using a clean scheduler API which sends email confirmations and updates.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/schedule"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Products (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/products-interative"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Display all products in a clean and organized way. Each product will have its own page displaying more pictures and more information.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Products (Interactive)",
                                        Details: "Display all products in a clean and organized way. Each product will have its own page displaying more pictures and more information.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/products-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Services (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/services-interactive"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Give deeper information about the services the business provides. Innclude an extra detailed page with dives into more pictures and details.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services (Interactive)",
                                        Details: "Give deeper information about the services the business provides. Innclude an extra detailed page with dives into more pictures and details.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/services-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Gallery (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/gallery-interactive"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Show a category of picture types and provide the set of pictures that belongs to each. Provides textual information on each picture when clicking or hovering.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Interactive)",
                                        Details: "Show a category of picture types and provide the set of pictures that belongs to each. Provides textual information on each picture when clicking or hovering.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/gallery-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Menu (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>A full menu with all menu items, details, and prices. When clicking on an item, a new page with more pictures and full description will appear.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Interactive)",
                                        Details: "A full menu with all menu items, details, and prices. When clicking on an item, a new page with more pictures and full description will appear.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/menu-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Quote (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/quote-interactive"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Give an accurate quote based on given information entered by the user. Results will be calculated using custom algorithm.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Interactive)",
                                        Details: "Give an accurate quote based on given information entered by the user. Results will be calculated using custom algorithm.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/quote-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Careers (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/quote-interactive"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Take a closer look at the available positions in the business and even apply using a custom form.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Careers (Interactive)",
                                        Details: "Take a closer look at the available positions in the business and even apply using a custom form.",
                                        Price: 300,
                                        URL: "https://happy-code-templates.web.app/careers-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Any two connecting pages that comes with photos, videos, information, interactivity, and an algorithm.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Interactive)",
                                        Details: "Any two connecting pages that comes with photos, videos, information, interactivity, and an algorithm.",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                        </div>
                        <h2 className='tier'>$$$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Rewards (Interactive)</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/rewards-interactive"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$400</h3>
                                    </div>
                                    <p>A rewards system that keeps track of purchases and rewards provided such as discounts. Works with Shop component.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Interactive)",
                                        Details: "A rewards system that keeps track of purchases and rewards provided such as discounts. Works with Shop component.",
                                        Price: 400,
                                        URL: "https://happy-code-templates.web.app/rewards-interactive"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Complex)</h2>
                                        <h3>$400</h3>
                                    </div>
                                    <p>Any two customized pages with full features and database integration.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Complex)",
                                        Details: "Any two customized pages with full features and database integration.",
                                        Price: 400
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Login/Members</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/login"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$400</h3>
                                    </div>
                                    <p>Allow members to log in and with full authentication and member storage capabilities. Works with Shop, and Dashboard components.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Login/Members",
                                        Details: "Allow members to log in and with full authentication and member storage capabilities. Works with Shop, and Dashboard components.",
                                        Price: 400,
                                        URL: "https://happy-code-templates.web.app/login"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Dashboard</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/dashboard"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$500</h3>
                                    </div>
                                    <p>Give members a way to view their data. Will come with many components that you can choose from. All data will be based on business type.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Dashboard",
                                        Details: "Give members a way to view their data. Will come with many components that you can choose from. All data will be based on business type.",
                                        Price: 500,
                                        URL: "https://happy-code-templates.web.app/dashboard"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Shop/Store</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/shop"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$600</h3>
                                    </div>
                                    <p>Full store with payment capabilities. All products will be available for purchase. One time payments only. Saved payment methods not available.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Shop/Store",
                                        Details: "Full store with payment capabilities. All products will be available for purchase. One time payments only. Saved payment methods not available.",
                                        Price: 600,
                                        URL: "https://happy-code-templates.web.app/shop"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 600
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Forum</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/forum"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$600</h3>
                                    </div>
                                    <p>Allow members to create a community around your business and discuss important matter, ask questions, etc.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Forum",
                                        Details: "Allow members to create a community around your business and discuss important matter, ask questions, etc.",
                                        Price: 600,
                                        URL: "https://happy-code-templates.web.app/forum"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 600
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Inventory</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/inventory"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$600</h3>
                                    </div>
                                    <p>Keep track of your inventory using our custom and beautifully laid out system. Works with Shop, Dashboard, and Invoices components.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Inventory",
                                        Details: "Keep track of your inventory using our custom and beautifully laid out system. Works with Shop, Dashboard, and Invoices components.",
                                        Price: 600,
                                        URL: "https://happy-code-templates.web.app/inventory"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 600
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <div className='together'>
                                            <h2>Invoices</h2>
                                            <a className='template-icon' target="_blank" href="https://happy-code-templates.web.app/invoices"><BsEye color="161D29" /></a>
                                        </div>
                                        <h3>$600</h3>
                                    </div>
                                    <p>Create and keep track of invoices without a hastle. Comes with PDF maker, sharing, and exporting capabilities.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Invoices",
                                        Details: "Create and keep track of invoices without a hastle. Comes with PDF maker, sharing, and exporting capabilities.",
                                        Price: 600,
                                        URL: "https://happy-code-templates.web.app/invoices"
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 600
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Innovative)</h2>
                                        <h3>$800</h3>
                                    </div>
                                    <p>A page that has features that are considered innovative. Meant to give users a unique experience.</p>
                                </div>
                                <div><BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Innovative)",
                                        Details: ">A page that has features that are considered innovative. Meant to give users a unique experience.",
                                        Price: 800
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 800
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' /></div>
                            </div>
                        </div>
                        <br />
                    </div> : <div></div>
            }
            <button className='shopper-new-btn' onClick={() => { setTogglePageList(true) }}><AiFillPlusCircle color="2249f7" /></button>
            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
