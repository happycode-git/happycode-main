import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
// 
import '../STYLESHEETS/TicketForm.css'
// 
import { BsChevronLeft, BsArrowRight } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { randomString } from '../../Global'
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice'
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'
// 
import { getTicketCount, setTicket, updateTicketCount, updateTicketUser } from '../../firebase'
import { setUserState } from '../../REDUX/REDUCERS/UserSlice'

export default function TicketForm() {
    const user = useSelector((state) => state.user.value)
    const project = useSelector((state) => state.project.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    var ticketID = randomString(12)

    const submitTicket = () => {
        dispatch(setLoadingState(true))
        const subject = document.querySelector('#tbSubject').value
        const page = document.querySelector('#tbPage').value
        var desc = document.querySelector('#taDesc').value
        desc = desc.replaceAll(`\n`, "jjj")

        if (subject != "" && page != "" && desc != "") {
            const ticket = {
                Subject: subject,
                Page: page,
                Description: desc,
                ProjectID: project.id
            }
            setTicket(user.id, ticketID, ticket, project.id)
                .then(() => {
                    getTicketCount(user.id, dispatch)
                    dispatch(setLoadingState(false))
                    dispatch(setConfirmationState(true))
                    setTimeout(() => {
                        dispatch(setConfirmationState(false))
                        navigate('/project')
                    }, 3000);
                })
                .catch(() => {
                    dispatch(setLoadingState(false))
                    dispatch(setFailureState(true))
                    setTimeout(() => {
                        dispatch(setFailureState(false))
                        subject = ""
                        page = ""
                        desc = ""
                    }, 3000);
                })
        }


    }

    useEffect(() => {
        console.log(user)
        if (user.id == null) {
            navigate("/webline")
            return
        }
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className='main ticketform'>
            <div className='together'>
                <Link className='back' to="/project"><BsChevronLeft /></Link>
                <h1 className='project-title'>Submit a ticket</h1>
            </div>
            <p className='ticketform-info'>Use this form to request a change, update, removal, or report an issue. Feel free to submit as many tickets as necessary. We prefer tickets to be specific so developers can complete them without confusion. You can view your active tickets on your dashboard.</p>
            <div className='ticketform-wrapper'>

                <div className='ticketform-form'>
                    <div className='ticketform-form-block'>
                        <h2>Ticket <span className='ticketid'>{`${ticketID}`}</span></h2>
                        <br />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Subject:</h3>
                        <p>With a few words, describe what you want done on your site.</p>
                        <input id="tbSubject" type="text" placeholder='Add new blog post, Fix typo in event name...' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Page:</h3>
                        <p>Enter the name of the page you are requesting this page for.</p>
                        <input id="tbPage" type="text" placeholder='Home, About, Blog, etc...' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Description:</h3>
                        <p>Provide an in-depth description of what change, addition, update, removal or issue you are reporting. This is for our developer to know exactly what to do with your request.</p>
                        <textarea id="taDesc" placeholder='I need the main title to be changed from "Coffee of the Week" to "Seasonal drinks for a cozy holiday"...' className='webline-app-textarea'></textarea>
                    </div>
                    <div className='ticketform-form-block'>
                        <div className='dropbox-block'>
                            <div className='flex-around'>
                                <h4 className='dropbox-title'>Upload Media Here</h4>
                                <BsArrowRight />
                                <a className='dropbox-icon' target="_blank" href={`${project.DropboxURL}`}><FcGoogle color="0E65F9" /></a>
                            </div>
                            <p>This link will open the Google Drive folder for all ticket inquiries. <b>Create a new folder using the ticket id to make it easy for us to find.</b></p>
                        </div>
                        <br />
                        <button className='ticketform-form-btn' onClick={submitTicket}>Submit Ticket</button>
                    </div>
                </div>
            </div>

            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
