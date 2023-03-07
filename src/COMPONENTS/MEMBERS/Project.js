import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { IoMdListBox } from 'react-icons/io'
import { HiOutlineXMark } from 'react-icons/hi2'
// 
import '../STYLESHEETS/Project.css'
// 
import { BsChevronLeft, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { getBuildInfo, getTickets } from '../../firebase'
import { FaClipboardList } from 'react-icons/fa'

export default function Project() {
    const user = useSelector((state) => state.user.value)
    const project = useSelector((state) => state.project.value)
    const tickets = useSelector((state) => state.memberTickets.value)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [chosenTicketID, setChosenTicketID] = useState("")
    const [websiteURL, setWebsiteURL] = useState("")
    const [previewMode, setPreviewMode] = useState("")
    const [showBuilds, setShowBuilds] = useState(false)
    const [tempBuilds, setTempBuilds] = useState([])

    useEffect(() => {
        console.log(user)
        if (user.id == null) {
            navigate("/webline")
            return
        }
        window.scrollTo(0, 0)
        getTickets(user.id, project.id, dispatch)
        setWebsiteURL(project.URL)
        document.querySelector('#tbURL').value = project.URL
    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/projects"><BsChevronLeft /></Link>
                <h1 className='project-title'>{project.Name}</h1>
            </div>

            <div className='project-previews'>
                <div className='flex'>
                    <h2>Website Previews</h2>
                    <FaClipboardList className='outline-icon' onClick={() => { navigate('/projectoutline') }} />
                </div>
                <p className='rotate caption light'>Sneak Peek</p>
                <div className='project-URL'>
                    <input id="tbURL" type="text" placeholder='Website URL' className='webline-app-input' />
                    <button className='project-URL-btn' onClick={() => { setWebsiteURL(document.querySelector('#tbURL').value) }}><BsFillArrowRightCircleFill /></button>
                </div>
                <div className='project-previews-split'>
                    <div className='preview-btn-split'>
                        <button className='preview-btn' onClick={() => { previewMode != "mobile" ? setPreviewMode("mobile") : setPreviewMode("") }}>Mobile</button>
                        {window.innerWidth >= 800 ? <button className='preview-btn' onClick={() => { previewMode != "desktop" ? setPreviewMode("desktop") : setPreviewMode("") }}>Desktop</button> : null}
                        <a target="_blank" href={project.URL} className='preview-btn'>Browser</a>
                    </div>
                    {
                        previewMode == "mobile" ?
                            <div className='project-previews-block'>
                                <h3>Mobile</h3>
                                <iframe className='project-previews-mobile' src={websiteURL}></iframe>
                            </div>
                            : <div></div>
                    }
                    {
                        previewMode == "desktop" ?
                            <div>
                                {
                                    window.innerWidth >= 1000 ?
                                        <div>
                                            <h3>Desktop</h3>
                                            <iframe className='project-previews-desktop' src={websiteURL}></iframe>
                                        </div> : <div></div>
                                }
                            </div> : <div></div>
                    }
                </div>
            </div>
            <div className='project-split'>
                <div className='project'>
                    <div className='flex'>
                        <div>
                            <h1>Project Info</h1>
                            <p className='project-info-caption'>Review the details below to get more information on the current state of your project.</p>
                        </div>
                        <button onClick={() => {
                            getBuildInfo(user.id, project.id, setTempBuilds)
                            setShowBuilds(true);
                        }} className='builds-btn'><IoMdListBox /></button>
                    </div>
                    <div className='project-details'>
                        <div className='project-details-block'>
                            <h3>Project Title:</h3>
                            <p>{project.Name}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Status:</h3>
                            <p>{project.Status}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Description:</h3>
                            <p>{project.Description}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Initial Payment:</h3>
                            <p>${project.InitialPayment}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Subscription:</h3>
                            <p>${project.Subscription} /mo</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Contract Start Date:</h3>
                            <p>{project.ContractSigned}</p>
                        </div>
                    </div>
                </div>
                <div className='tickets'>
                    <h1>Active Tickets</h1>
                    {
                        tickets.map((tik, i) => {
                            return (
                                <div className={`${"ticket"}${i == 0 ? "1" : ""}`} key={i}>
                                    <div className='flex'>
                                        <div>
                                            <h2 className='ticket-sub'>{tik.Subject}</h2>
                                            <p className='ticket-status'>Status: <span className="purple">{tik.Status}</span></p>
                                        </div>
                                        <div className='together'>
                                            <p className="ticket-status"><b>{tik.Page}</b></p>
                                            <RxDotFilled className='ticket-dot purple' />
                                            {
                                                chosenTicketID == tik.id ?
                                                    <IoChevronUpCircleOutline onClick={() => setChosenTicketID("")} className='ticket-arrow' /> : <IoChevronDownCircleOutline onClick={() => setChosenTicketID(tik.id)} className='ticket-arrow' />
                                            }
                                        </div>
                                    </div>
                                    {
                                        chosenTicketID == tik.id ?
                                            <p className='ticket-desc'>{tik.Description}</p> : <p></p>
                                    }
                                </div>
                            )
                        })
                    }
                    <button className='tickets-more-btn' onClick={() => { navigate('/tickets') }}>View All Tickets</button>
                </div>
            </div>
            {showBuilds ?
                <div className='builds'>
                    <div className='flex'>
                        <h1>Project Builds</h1>
                        <HiOutlineXMark className="build-icon" onClick={() => { setShowBuilds(false) }} />
                    </div>
                    <br />
                    <div className='builds-wrap'>
                        {
                            tempBuilds.map((build, i) => {
                                return (
                                    <div key={i} className=''>
                                        <div className='flex'>
                                            <p className='build-date'>{`${new Date(build.Date.seconds * 1000).toDateString()}`}</p>
                                            <p className='build-admin'>{build.Admin}</p>
                                        </div>
                                        <p className='build-desc'>{build.Desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> : <div></div>
            }

            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
            <button className='create-ticket-btn' onClick={() => { navigate('/ticketform') }}>+ Ticket</button>
        </div>
    )
}
