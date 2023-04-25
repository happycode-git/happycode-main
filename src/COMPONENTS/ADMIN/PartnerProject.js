import React, { useEffect, useState } from 'react'
// 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { completePartnerTicket, getTicketCount, getTickets, rejectPartnerTicket, updateFirebaseURL, updateDropboxURL, setBuildInfo, getBuildInfo, getProjectMessages, setProjectMessage, setMessageFlag } from '../../firebase';
// 
import '../STYLESHEETS/PartnerProject.css'
// 
import { BsChevronLeft, BsFillArrowRightCircleFill, BsArrowCounterclockwise } from 'react-icons/bs'
import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from 'react-icons/io5'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { RxDotFilled } from 'react-icons/rx'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice';
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice';
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice';
import { FaClipboardList } from 'react-icons/fa';
import { MdOpenInBrowser } from 'react-icons/md'
import { IoMdListBox } from 'react-icons/io'
import { HiOutlineXMark } from 'react-icons/hi2'
import { AiFillMessage } from 'react-icons/ai'
import { HiXMark } from 'react-icons/hi2'
import { randomString } from '../../Global';
import { Timestamp } from 'firebase/firestore';

export default function PartnerDetail() {
    const admin = useSelector((state) => state.admin.value)
    const partner = useSelector((state) => state.partner.value)
    const partners = useSelector((state) => state.partners.value)
    const project = useSelector((state) => state.project.value)
    const tickets = useSelector((state) => state.memberTickets.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [chosenTicketID, setChosenTicketID] = useState("")
    const [websiteURL, setWebsiteURL] = useState("")
    const [previewMode, setPreviewMode] = useState("")
    const [showBuilds, setShowBuilds] = useState(false)
    const [tempBuilds, setTempBuilds] = useState([])
    const [showMessages, setShowMessages] = useState(false)
    const [messages, setMessages] = useState([])

    const completeTicket = (ticketID, ticket) => {
        dispatch(setLoadingState(true))
        completePartnerTicket(partner.id, ticketID, ticket)
            .then(() => {
                getTicketCount(partner.id, dispatch)
                dispatch(setLoadingState(false))
                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    dispatch(setConfirmationState(false))
                    getTickets(partner.id, project.id, dispatch)
                }, 3000);
            })
            .catch(() => {
                dispatch(setLoadingState(false))
                dispatch(setFailureState(true))
                setTimeout(() => {
                    dispatch(setFailureState(false))
                }, 3000);
            })
    }
    const rejectTicket = (ticketID, ticket) => {
        dispatch(setLoadingState(true))
        rejectPartnerTicket(partner.id, ticketID, ticket)
            .then(() => {
                getTicketCount(partner.id, dispatch)
                dispatch(setLoadingState(false))
                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    dispatch(setConfirmationState(false))
                    getTickets(partner.id, project.id, dispatch)
                }, 3000);
            })
            .catch(() => {
                dispatch(setLoadingState(false))
                dispatch(setFailureState(true))
                setTimeout(() => {
                    dispatch(setFailureState(false))
                }, 3000);
            })

    }
    const update_DropboxURL = () => {
        const url = document.querySelector('#tbDropboxURL').value
        dispatch(setConfirmationState(true))
        updateDropboxURL(partner.id, project, url, dispatch)
        setTimeout(() => {
            dispatch(setConfirmationState(false))
        }, 2000);
    }
    const update_FirebaseURL = () => {
        const url = document.querySelector('#tbFirebaseURL').value
        updateFirebaseURL(partner.id, project, url, dispatch);
        document.querySelector('#tbURL').value = document.querySelector('#tbFirebaseURL').value
        setWebsiteURL(document.querySelector('#tbFirebaseURL').value)
        dispatch(setConfirmationState(true))
        setTimeout(() => {
            dispatch(setConfirmationState(false))
        }, 2000);
    }

    const getMessages = () => {
        getProjectMessages(partner.id, project.id, setMessages)
            .then(() => {
                dispatch(setLoadingState(false))
            })
            .catch(() => {
                dispatch(setLoadingState(false))
            })
    }
    const sendMessage = () => {
        const mess = document.querySelector('#tbText').value
        setProjectMessage(partner.id, project.id, mess, admin.id)

        document.querySelector('#tbText').value = ""
        setMessageFlag(partner.id, project.id)
    }

    useEffect(() => {
        console.log(admin)
        if (admin.id == null) {
            navigate("/admin")
            return
        }
        window.scrollTo(0, 0)
        getTickets(partner.id, project.id, dispatch)
        setWebsiteURL(project.URL)
        document.querySelector('#tbURL').value = project.URL
        document.querySelector('#tbFirebaseURL').value = project.URL
        document.querySelector('#tbDropboxURL').value = project.DropboxURL
    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/partnerdetail"><BsChevronLeft /></Link>
                <h1 className='project-title'>{project.Name}</h1>
            </div>

            <div className='project-previews'>
                <div className='flex'>
                    <h2>Website Previews</h2>
                    <FaClipboardList className='outline-icon' onClick={() => { navigate('/partneroutline') }} />
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
                            getBuildInfo(partner.id, project.id, setTempBuilds)
                            setShowBuilds(true);
                        }} className='builds-btn'><IoMdListBox /></button>
                    </div>
                    <div className='project-details'>
                        <div className='project-details-block'>
                            <h3>Project Title:</h3>
                            <p>{project.Name}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Current Site:</h3>
                            <a href={project.CurrentSiteURL} target="_blank" className="purple">{project.CurrentSiteURL}</a>
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
                        <div className='project-details-block'>
                            <h3>Firebase Host URL:</h3>
                            <div className='together'>
                                <input type="text" id="tbFirebaseURL" placeholder='Firebase Host URL' className='project-info-input' />
                                <BsArrowCounterclockwise onClick={update_FirebaseURL} className='update-icon' />
                            </div>
                        </div>
                        <div className='project-details-block'>
                            <h3>Dropbox URL:</h3>
                            <div className='together'>
                                <input type="text" id="tbDropboxURL" placeholder='Dropbox URL' className='project-info-input' />
                                <BsArrowCounterclockwise onClick={update_DropboxURL} className='update-icon' />
                            </div>
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
                                            <div>
                                                <p className='ticket-desc'>{tik.Description.replaceAll("jjj", `\n`)}</p>
                                                <div className='flex'>
                                                    <h2 className='ticket-id bg-purple light'>Ticket #{tik.id}</h2>
                                                    <div className='together'>
                                                        <AiFillCloseCircle onClick={() => {
                                                            rejectTicket(chosenTicketID, tik)
                                                        }} className='ticket-complete red' />
                                                        <AiFillCheckCircle onClick={() => {
                                                            getTicketCount(partner.id, dispatch)
                                                            completeTicket(chosenTicketID, tik);
                                                        }} className='ticket-complete green' />
                                                    </div>
                                                </div>
                                            </div>
                                            : <p></p>
                                    }
                                </div>
                            )
                        })
                    }
                    <button className='tickets-more-btn' onClick={() => { navigate('/partnertickets') }}>View All Tickets</button>
                </div>


            </div>

            <button className='create-ticket-btn' onClick={() => { navigate('/partnerticketform') }}>New Ticket</button>
            {
                !showMessages ? <button className='message-btn' onClick={() => { setShowMessages(true); getMessages(); }}><AiFillMessage /></button> : <div></div>
            }

            {showBuilds ?
                <div className='builds'>
                    <div className='flex'>
                        <h1>Project Builds</h1>
                        <HiOutlineXMark className="build-icon" onClick={() => { setShowBuilds(false) }} />
                    </div>
                    <br />
                    <div className='build-form'>
                        <div className='build-form-pair'>
                            <label>Build Description</label>
                            <textarea id="taBuildDesc" placeholder='Enter the build information so the partner knows what changes were made.'></textarea>
                        </div>
                        <button onClick={() => {
                            const desc = document.querySelector('#taBuildDesc').value
                            if (desc != "") {
                                const id = randomString(25)
                                setBuildInfo(partner.id, project.id, {
                                    id: id,
                                    Desc: desc,
                                    Admin: `${admin.FirstName} ${admin.LastName}`,
                                    Date: Timestamp.fromDate(new Date())
                                })
                                    .then(() => {
                                        desc = ""
                                    })
                                const builds = [{
                                    id: id,
                                    Desc: desc,
                                    Admin: `${admin.FirstName} ${admin.LastName}`,
                                    Date: Timestamp.fromDate(new Date())
                                }, ...tempBuilds]
                                setTempBuilds(builds)
                            }

                        }}>Submit Build Info</button>
                    </div>
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
            {
                showMessages ?
                    <div className='messages'>
                        <div className='flex'>
                            <h1>Messages</h1>
                            <HiXMark className='close' onClick={() => { setShowMessages(false) }} />
                        </div>
                        <div className='messages-wrap'>
                            {
                                messages.map((mess, i) => {
                                    return (
                                        <div key={i} className={`message ${mess.SenderID == partner.id ? "bg-yellow" : "bg-darker"}`}>
                                            <p className={`message-message ${mess.SenderID == partner.id ? "dark" : "white"}`}>{mess.Message}</p>
                                            <p className={`message-date ${mess.SenderID == partner.id ? "dark" : "white"}`}>{mess.Date}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='message-input'>
                            <input id="tbText" className='message-tb' placeholder='Type message here...' />
                            <button
                                onClick={sendMessage} className='message-send'><BsFillArrowRightCircleFill className='message-send-icon' /></button>
                        </div>
                    </div> : <div></div>
            }
        </div>
    )
}
