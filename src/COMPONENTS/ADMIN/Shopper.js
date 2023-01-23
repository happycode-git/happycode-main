import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/Shopper.css'
// 
import { BsArrowRightCircle, BsChevronLeft, BsFillXCircleFill, BsThreeDotsVertical } from 'react-icons/bs'
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

            <div className='shopper'>
                <p className='shopper-info'>Before you begin, make sure you are filling out this form with the business owner/manager. This will keep all details as accurate as possible.</p>

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
                                                }} className='shopper-remove'>Remove</button> : <p></p>
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
                                        <h2>Home</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Home",
                                        Details: "Hook the user in with a essential information and statements. The user should have a great idea of what the business is and does in this page.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>About</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Talk about the way the business came to be. This is for users who want to know exactly who they are doing business with.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "About",
                                        Details: "Talk about the way the business came to be. This is for users who want to know exactly who they are doing business with.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>History</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Give the user a glimpse into the history of the business. This helps gain credibility and trust.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "History",
                                        Details: "Give the user a glimpse into the history of the business. This helps gain credibility and trust.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>

                                        <h2>Contact</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>A simple form to get users to give their input or ask questions.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Contact",
                                        Details: "A simple form to get users to give their input or ask questions.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Services</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show a list of services the business provides with interactive show and hide features.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services",
                                        Details: "Show a list of services the business provides with interactive show and hide features.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Products {"("}Simple{")"}</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show all products and provide simple information individually. For reading purposes only.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: `Products ${"("}Simple${")"}`,
                                        Details: "Show all products and provide simple information individually. For reading purposes only.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Careers (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>In the case that the business is hiring, this will provide essential information about the hiring process and open positions.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Careers (Simple)",
                                        Details: "In the case that the business is hiring, this will provide essential information about the hiring process and open positions.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Partners</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show all vendors that are affiliated with the business. Their links will be provided to help with SEO.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Partners",
                                        Details: "Show all vendors that are affiliated with the business. Their links will be provided to help with SEO.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Bio</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Allow users to meet the essential workers of the business in a simple yet structured biography page.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Bio",
                                        Details: "Allow users to meet the essential workers of the business in a simple yet structured biography page.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Pricing</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>If the business offers services, a set of pricing options can be displayed with information about what can be attained for each tier.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Pricing",
                                        Details: "If the business offers services, a set of pricing options can be displayed with information about what can be attained for each tier.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Gallery (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display a set of pictures or videos in a neat and clean gallery. Responsive to avoid unwanted whitespace.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Simple)",
                                        Details: "Display a set of pictures or videos in a neat and clean gallery. Responsive to avoid unwanted whitespace.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Features</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Features",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Portfolio</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>For professionals, this page will show links, images, and information of previous work.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Portfolio",
                                        Details: "For professionals, this page will show links, images, and information of previous work.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Awards</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>A list of awards displayed in a way to convey the importance of professional or business achievements.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Awards",
                                        Details: "A list of awards displayed in a way to convey the importance of professional or business achievements.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Coupons (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>In-store coupons can be displayed along with any information and conditions. For reading purposes only.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Coupons (Simple)",
                                        Details: "In-store coupons can be displayed along with any information and conditions. For reading purposes only.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Join Email List</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Get users to stay updated with the business by allowing them to enter their email and submit to join an email list.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Join Email List",
                                        Details: "Get users to stay updated with the business by allowing them to enter their email and submit to join an email list.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Rewards (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display information about current rewards and their conditions. For reading purposes only.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Simple)",
                                        Details: "Display information about current rewards and their conditions. For reading purposes only.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Locations</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Display all locations and their hours, along with an interactive map for each.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Locations",
                                        Details: "Display all locations and their hours, along with an interactive map for each.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Privacy Policy</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Show the company's Privacy Policy and/or Terms and Conditions in a simple way that is easy to understand.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Privacy Policy",
                                        Details: "Show the company's Privacy Policy and/or Terms and Conditions in a simple way that is easy to understand.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Quote (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Inform the user on different quotes for several scenarios. They can also leave their information in a simple quote form for future contact.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Simple)",
                                        Details: "Inform the user on different quotes for several scenarios. They can also leave their information in a simple quote form for future contact.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Estimates (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Similar to quotes, but provides a deep look into how estimates are determined and performed.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Estimates (Simple)",
                                        Details: "Similar to quotes, but provides a deep look into how estimates are determined and performed.",
                                        Price: 100
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 100
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Simple page can be constructed with any of the information components such as text, images, videos, or links.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
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
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Landing</h2>
                                        <h3>$150</h3>
                                    </div>
                                    <p>A page made up of three or more panels. Home, Contact, and Misc panels.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Landing",
                                        Details: "A page made up of three or more panels. Home, Contact, and Misc panels.",
                                        Price: 150
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 150
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                        </div>
                        <h2 className='tier'>$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Contact</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Contact",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Events</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Events",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Support</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Support",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Reviews</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Reviews",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>

                                        <h2>Features</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Features",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>FAQ</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "FAQ",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Menu (Simple)</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Simple)",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Standard)</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Standard)",
                                        Details: "",
                                        Price: 200
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 200
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                        </div>
                        <h2 className='tier'>$$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Blog</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Blog",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Products (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Products (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Services (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Gallery (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Menu (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Quote (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Interactive)</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Interactive)",
                                        Details: "",
                                        Price: 300
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 300
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                        </div>
                        <h2 className='tier'>$$$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Shop/Store</h2>
                                        <h3>$400</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Shop/Store",
                                        Details: "",
                                        Price: 400
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Rewards (Interactive)</h2>
                                        <h3>$400</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Interactive)",
                                        Details: "",
                                        Price: 400
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Complex)</h2>
                                        <h3>$400</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Complex)",
                                        Details: "",
                                        Price: 400
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 400
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Login/Members</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Login/Members",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Dashboard</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Dashboard",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Forum</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Forum",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Inventory</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Inventory",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Invoices</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Invoices",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
                            </div>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Misc (Innovative)</h2>
                                        <h3>$500</h3>
                                    </div>
                                    <p></p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Innovative)",
                                        Details: "",
                                        Price: 500
                                    })
                                    setPages(tempArr)
                                    var tempTot = total
                                    tempTot += 500
                                    setTotal(tempTot)
                                    setTogglePageList(false)
                                }} className='shopper-newpage-block-icon' />
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
