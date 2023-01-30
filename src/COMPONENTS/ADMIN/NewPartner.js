import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/NewPartner.css'
import '../STYLESHEETS/TicketForm.css'
// 
import { BsChevronLeft } from 'react-icons/bs'
import { SiFirebase } from 'react-icons/si'
import { ImDropbox } from 'react-icons/im'
import { randomString } from '../../Global'
import { createPartnerAccount } from '../../firebase'
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice'
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'
import { HiXMark } from 'react-icons/hi2'


export default function NewPartner() {
    const admin = useSelector((state) => state.admin.value)
    const outline = useSelector((state) => state.outline.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createAccount = () => {
        dispatch(setLoadingState(true))
        const form = {
            FirstName: document.querySelector('#tbFirstName').value,
            LastName: document.querySelector('#tbLastName').value,
            Email: document.querySelector('#tbEmail').value,
            Phone: document.querySelector('#tbPhone').value,
            BusinessName: document.querySelector('#tbBusinessName').value,
            BusinessEmail: document.querySelector('#tbBusinessEmail').value,
            Address: document.querySelector('#tbBusinessAddress').value,
        }
        const project = {
            id: randomString(30),
            SiteExists: document.querySelector('#cbSiteExists').checked,
            CurrentSiteURL: document.querySelector('#tbCurrentSiteURL').value,
            Name: document.querySelector('#tbProjectName').value,
            Description: document.querySelector('#taProjectDesc').value,
            InitialPayment: document.querySelector('#tbBudget').value,
            Subscription: parseInt(document.querySelector('#tbMonthly').value),
            URL: "",
            DropboxURL: document.querySelector('#tbDropboxURL').value
        }
        createPartnerAccount(form, project, outline)
            .then(() => {
                dispatch(setLoadingState(false))
                document.querySelector('#tbFirstName').value = ""
                document.querySelector('#tbLastName').value = ""
                document.querySelector('#tbEmail').value = ""
                document.querySelector('#tbPhone').value = ""
                document.querySelector('#tbBusinessName').value = ""
                document.querySelector('#tbBusinessEmail').value = ""
                document.querySelector('#tbBusinessAddress').value = ""
                document.querySelector('#cbSiteExists').checked = false
                document.querySelector('#tbCurrentSiteURL').value = ""
                document.querySelector('#tbProjectName').value = ""
                document.querySelector('#taProjectDesc').value = ""
                document.querySelector('#tbBudget').value = ""
                document.querySelector('#tbMonthly').value = ""
                document.querySelector('#tbDropboxURL').value = ""

                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    dispatch(setConfirmationState(false))
                }, 3000);
                navigate('/admindash')
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
        var tot = 0
        for (var i in outline) {
            tot += outline[i].Price
        }
        document.querySelector('#tbBudget').value = tot * 0.25
        document.querySelector('#tbMonthly').value = tot * 0.25 * 0.15
    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/admindash"><HiXMark color="red" /></Link>
                <h2 className='project-title'>New Partner Form</h2>
            </div>
            <p className='ticketform-info'>Use this form to create an account for a new partner. This is only filled out once the application has been approved, and a consultation has occurred. All information in this form must be filled out accurately.</p>
            <div className='ticketform-wrapper'>

                <div className='ticketform-form'>
                    <div className='ticketform-form-block'>
                        <h2>Welcome to the team!</h2>
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>First Name:</h3>
                        <input id="tbFirstName" type="text" placeholder='John' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Last Name:</h3>
                        <input id="tbLastName" type="text" placeholder='Doe' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Email:</h3>
                        <input id="tbEmail" type="email" placeholder='jdoe@happycode.com' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Phone:</h3>
                        <input id="tbPhone" type="text" placeholder='123_456_7890' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Business Name:</h3>
                        <input id="tbBusinessName" type="text" placeholder='Happy Code LLC' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Business Email:</h3>
                        <input id="tbBusinessEmail" type="email" placeholder='webline@happycode.com' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Business Address:</h3>
                        <input id="tbBusinessAddress" type="text" placeholder='1234 Commercial St, San Diego CA, 92010' className='webline-app-input' />
                    </div>
                    <h2>New Project Details</h2>
                    <div className='ticketform-form-block'>
                        <div className='together'>
                            <h3>Has a site?</h3>
                            <input type="checkbox" id="cbSiteExists" />
                        </div>
                        <p>If this partner has a site, enter the URL below. This domain will be used to host the new site.</p>
                        <input id="tbCurrentSiteURL" type="text" placeholder='https://freedomplumbers.com' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Project Name:</h3>
                        <p>This can be the same as their business name.</p>
                        <input id="tbProjectName" type="text" placeholder='Freedom Plumbers' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Project Description:</h3>
                        <p>In a few sentences, describe the kind of project this is. Include goals, mission, vision, etc.</p>
                        <textarea id="taProjectDesc" placeholder='Freedom Plumbers are out to reach as many people as possible to ensure complete functionality of their plumbing.' className='webline-app-textarea'></textarea>
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Initial Payment:</h3>
                        <p>Use the HappyCode Webline Calculator to determine this amount.</p>
                        <input id="tbBudget" type="text" placeholder='Initial Fee Amount $' className='webline-app-input' />
                    </div>
                    <div className='ticketform-form-block'>
                        <h3>Monthly Subscription:</h3>
                        <p>Use the HappyCode Webline Calculator to determine this amount.</p>
                        <input id="tbMonthly" type="text" placeholder='Monthly Fee Amount $' className='webline-app-input' />
                    </div>

                    {/* <div className='ticketform-form-block'>
                        <h3>Firebase URL:</h3>
                        <p>Create a project in the firebase console. Once created, set up Hosting and enter the URL below.</p>
                        <div className='flex-around link-pair'>
                            <SiFirebase color="FEA20C" className='firebase-icon' /> <a target="_blank" className='form-link' href="https://console.firebase.google.com">Firebase Console Link</a>
                        </div>
                        <input id="tbURL" type="text" placeholder='https://weblineproject.web.app' className='webline-app-input' />
                    </div> */}
                    <div className='ticketform-form-block'>
                        <h3>Dropbox URL:</h3>
                        <p>Create a new project Dropbox folder and share with the contact email provided. Enter the URL of this folder below.</p>
                        <div className='flex-around link-pair'>
                            <ImDropbox color="015EF6" className='firebase-icon' /> <a target="_blank" className='form-link' href="https://www.dropbox.com/home">Dropbox Folder Link</a>
                        </div>
                        <input id="tbDropboxURL" type="text" placeholder='https://www.dropbox.com/home/WeblineProject' className='webline-app-input' />
                    </div>

                    <div className='ticketform-form-block'>
                        <br />
                        <button className='ticketform-form-btn' onClick={createAccount}>Create Account</button>
                    </div>
                </div>
            </div>

            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
