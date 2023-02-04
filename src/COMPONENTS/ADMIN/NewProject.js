import React, { useEffect } from 'react'
// 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
// 
import '../STYLESHEETS/NewProject.css'
import '../STYLESHEETS/TicketForm.css'
// 
import { BsChevronLeft, BsFillCalculatorFill } from 'react-icons/bs'
import { SiFirebase } from 'react-icons/si';
import { ImDropbox } from 'react-icons/im';
import { randomString } from '../../Global';
// 
import { createPartnerProject } from '../../firebase';
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice';
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice';
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice';

export default function Newproject() {
    const admin = useSelector((state) => state.admin.value)
    const partner = useSelector((state) => state.partner.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createProj = () => {
        const project = {
            id: randomString(30),
            SiteExists: document.querySelector('#cbSiteExists').checked,
            CurrentSiteURL: document.querySelector('#tbCurrentSiteURL').value,
            Name: document.querySelector('#tbProjectName').value,
            Description: document.querySelector('#taProjectDesc').value,
            InitialPayment: document.querySelector('#tbBudget').value,
            Subscription: parseInt(document.querySelector('#tbMonthly').value),
            URL: document.querySelector('#tbURL').value,
            DropboxURL: document.querySelector('#tbDropboxURL').value
        }

        createPartnerProject(partner.id, project)
            .then(() => {
                dispatch(setLoadingState(false))

                document.querySelector('#cbSiteExists').checked = false
                document.querySelector('#tbCurrentSiteURL').value = ""
                document.querySelector('#tbProjectName').value = ""
                document.querySelector('#taProjectDesc').value = ""
                document.querySelector('#tbBudget').value = ""
                document.querySelector('#tbMonthly').value = ""
                document.querySelector('#tbURL').value = ""
                document.querySelector('#tbDropboxURL').value = ""

                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    dispatch(setConfirmationState(false))
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
    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/partnerdetail"><BsChevronLeft /></Link>
                <h2 className='project-title'>New Project</h2>
            </div>
            <div className='ticketform-wrapper'>
                <h1>You are now creating an Project for {partner.BusinessName}</h1>
                <div className='ticketform-form'>
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
                            <p>Use the HappyCode Webline Shopping Form to determine this amount.</p>
                                <input id="tbBudget" type="text" placeholder='Initial Fee Amount $' className='webline-app-input' />
                        </div>
                        <div className='ticketform-form-block'>
                            <h3>Monthly Subscription:</h3>
                            <p>Use the HappyCode Webline Calculator to determine this amount.</p>
                            <input id="tbMonthly" type="text" placeholder='Monthly Fee Amount $' className='webline-app-input' />
                        </div>

                        <div className='ticketform-form-block'>
                            <h3>Firebase URL:</h3>
                            <p>Create a project in the firebase console. Once created, set up Hosting and enter the URL below.</p>
                            <div className='flex-around link-pair'>
                                <SiFirebase color="FEA20C" className='firebase-icon' /> <a target="_blank" className='form-link' href="https://console.firebase.google.com">Firebase Console Link</a>
                            </div>
                            <input id="tbURL" type="text" placeholder='https://weblineproject.web.app' className='webline-app-input' />
                        </div>
                        <div className='ticketform-form-block'>
                            <h3>Dropbox URL:</h3>
                            <p>Create a new project Dropbox folder and share with the contact email provided. Enter the URL of this folder below.</p>
                            <div className='flex-around link-pair'>
                                <ImDropbox color="015EF6" className='firebase-icon' /> <a target="_blank" className='form-link' href="https://www.dropbox.com/home">Dropbox Folder Link</a>
                            </div>
                            <input id="tbDropboxURL" type="text" placeholder='https://www.dropbox.com/home/WeblineProjectTicketMedia' className='webline-app-input' />
                        </div>

                        <div className='ticketform-form-block'>
                            <br />
                            <button className='ticketform-form-btn' onClick={createProj}>Create Project</button>
                        </div>
                    </div>
            </div>
            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
