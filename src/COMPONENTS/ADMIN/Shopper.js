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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>

                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Home",
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
                                        <h2>About</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "About",
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
                                        <h2>History</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "History",
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
                                        <h2>Contact</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Contact",
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
                                        <h2>Services</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services",
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
                                        <h2>Products {"("}Simple{")"}</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: `Products ${"("}Simple${")"}`,
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
                                        <h2>Careers</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Careers",
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
                                        <h2>Partners</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Partners",
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
                                        <h2>Bio</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Bio",
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
                                        <h2>Pricing</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Pricing",
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
                                        <h2>Gallery (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Simple)",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Portfolio",
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
                                        <h2>Awards</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Awards",
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
                                        <h2>Coupons (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Coupons (Simple)",
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
                                        <h2>Join Email List</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Join Email List",
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
                                        <h2>Rewards (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Simple)",
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
                                        <h2>Locations</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Locations",
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
                                        <h2>Privacy Policy</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Privacy Policy",
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
                                        <h2>Quote (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Simple)",
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
                                        <h2>Estimates (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Estimates (Simple)",
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
                                        <h2>Misc (Simple)</h2>
                                        <h3>$100</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Simple)",
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
                                        <h2>Landing</h2>
                                        <h3>$150</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Landing",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                        <h2>Events</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Events",
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
                                        <h2>Support</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Support",
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
                                        <h2>Reviews</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Reviews",
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
                                        <h2>Features</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Features",
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
                                        <h2>FAQ</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "FAQ",
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
                                        <h2>Menu (Simple)</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Simple)",
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
                                        <h2>Misc (Standard)</h2>
                                        <h3>$200</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Standard)",
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
                        </div>
                        <h2 className='tier'>$$$</h2>
                        <div className='shopper-newpage-wrap'>
                            <div className='shopper-newpage-block'>
                                <div>
                                    <div className='flex'>
                                        <h2>Blog</h2>
                                        <h3>$300</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Blog",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Products (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Services (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Gallery (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Menu (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Quote (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Shop/Store",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Interactive)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Rewards (Complex)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Login/Members",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Dashboard",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Forum",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Inventory",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Invoices",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.</p>
                                </div>
                                <BsArrowRightCircle onClick={() => {
                                    var tempArr = pages
                                    tempArr.push({
                                        id: randomString(5),
                                        Name: "Misc (Innovative)",
                                        Details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a augue et tellus varius accumsan.",
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
