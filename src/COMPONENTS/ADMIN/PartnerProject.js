import React, { useEffect, useState } from 'react'
// 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { completePartnerTicket, getPartners, getTickets, rejectPartnerTicket, updateTicketMinusCount, updateTicketPartner } from '../../firebase';
// 
import '../STYLESHEETS/PartnerProject.css'
// 
import { BsChevronLeft, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from 'react-icons/io5'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { RxDotFilled } from 'react-icons/rx'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice';
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice';
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice';
import { setPartnersState } from '../../REDUX/REDUCERS/PartnersSlice';
import { FaClipboardList } from 'react-icons/fa';

export default function PartnerDetail() {
    const admin = useSelector((state) => state.admin.value)
    const partner = useSelector((state) => state.partner.value)
    const project = useSelector((state) => state.project.value)
    const tickets = useSelector((state) => state.memberTickets.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [chosenTicketID, setChosenTicketID] = useState("")
    const [websiteURL, setWebsiteURL] = useState("")
    const [previewMode, setPreviewMode] = useState("")

    const completeTicket = (ticketID, ticket) => {
        dispatch(setLoadingState(true))
        completePartnerTicket(partner.id, ticketID, ticket)
            .then(() => {
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
                        <button className='preview-btn' onClick={() => { previewMode != "mobile" ? setPreviewMode("mobile") : setPreviewMode("") }}>View in Mobile</button>
                        {window.innerWidth >= 800 ? <button className='preview-btn' onClick={() => { previewMode != "desktop" ? setPreviewMode("desktop") : setPreviewMode("") }}>View in Desktop</button> : <p></p>}
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
                    <h1>Project Info</h1>
                    <p className='project-info-caption'>Review the details below to get more information on the current state of your project.</p>

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
                                            <div>
                                                <p className='ticket-desc'>{tik.Description}</p>
                                                <div className='flex'>
                                                    <h2 className='ticket-id bg-purple light'>Ticket #{tik.id}</h2>
                                                    <div className='together'>
                                                        <AiFillCloseCircle onClick={() => {
                                                            updateTicketMinusCount(partner.id, partner.TicketCount)
                                                            .then(() => {
                                                                updateTicketPartner(partner.id, dispatch)
                                                                .then(() => {
                                                                    getPartners(dispatch)
                                                                })
                                                            })
                                                            rejectTicket(chosenTicketID, tik);
                                                        }} className='ticket-complete red' />
                                                        <AiFillCheckCircle onClick={() => {
                                                            updateTicketMinusCount(partner.id, partner.TicketCount)
                                                            .then(() => {
                                                                updateTicketPartner(partner.id, dispatch)
                                                                .then(() => {
                                                                    getPartners(dispatch)
                                                                })
                                                            })
                                                            completeTicket(chosenTicketID, tik);
                                                            console.log(`USER: ${partner.TicketCount}`)
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
            <button className='create-ticket-btn' onClick={() => { navigate('/partnerticketform') }}>+ Ticket</button>
        </div>
    )
}
