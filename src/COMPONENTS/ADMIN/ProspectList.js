import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
// 
import '../STYLESHEETS/ProspectList.css'
// 
import { BsChevronLeft } from 'react-icons/bs'
import { BiWorld } from 'react-icons/bi'
import { getProspects, setProspectDoc, editProspectDoc, getAllProspects, removeProspectDoc } from '../../firebase';
import { AiFillCheckCircle, AiFillPlusCircle } from 'react-icons/ai';
import { IoChevronDownCircleSharp, IoChevronUpCircleSharp } from 'react-icons/io5';
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice';
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice';
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice';
import { randomString, superAdminID } from '../../Global';
import { MdBuildCircle } from 'react-icons/md';
// 

export default function AdminDash() {
    const admin = useSelector((state) => state.admin.value)
    const prospects = useSelector((state) => state.prospects.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [toggleForm, setToggleForm] = useState(false)
    const [toggleEditForm, setToggleEditForm] = useState(false)
    const [prospect, setProspect] = useState({})
    const [prosID, setProsID] = useState("")
    const [tempProspects, setTempProspects] = useState([])

    const openEdit = (pros) => {
        setToggleEditForm(true)
        setToggleForm(false)
        setProsID(pros.id)
        setTimeout(() => {
            document.querySelector('#tbEditBusinessName').value = pros.BusinessName
            document.querySelector('#tbEditFullName').value = pros.ContactFullName
            document.querySelector('#tbEditPhone').value = pros.ContactPhone
            document.querySelector('#tbEditEmail').value = pros.Email
            document.querySelector('#tbEditAddress').value = pros.BusinessAddress
            document.querySelector('#tbEditCity').value = pros.City
            document.querySelector('#tbEditState').value = pros.Staet
            document.querySelector('#tbEditZip').value = pros.Zip
            document.querySelector('#cbEditHasSite').checked = pros.HasWebsite
            document.querySelector('#tbEditURL').value = pros.WebsiteURL
            document.querySelector('#tbEditSampleURL').value = pros.SampleURL
            document.querySelector('#tbEditType').value = pros.BusinessType
            document.querySelector('#taEditDetails').value = pros.Details
        }, 500);
    }
    const addToList = () => {
        dispatch(setLoadingState(true))
        const p = {
            id: randomString(30),
            BusinessName: document.querySelector('#tbBusinessName').value,
            ContactFullName: document.querySelector('#tbFullName').value,
            ContactPhone: document.querySelector('#tbPhone').value,
            Email: document.querySelector('#tbEmail').value,
            BusinessAddress: document.querySelector('#tbAddress').value,
            City: document.querySelector('#tbCity').value,
            State: document.querySelector('#tbState').value,
            Zip: document.querySelector('#tbZip').value,
            HasWebsite: document.querySelector('#cbHasSite').checked,
            WebsiteURL: document.querySelector('#tbURL').value,
            SampleURL: "",
            BusinessType: document.querySelector('#tbType').value,
            Details: document.querySelector('#taDetails').value
        }
        setProspectDoc(p, admin.id)
            .then(() => {
                dispatch(setLoadingState(false))
                document.querySelector('#tbBusinessName').value = ""
                document.querySelector('#tbFullName').value = ""
                document.querySelector('#tbPhone').value = ""
                document.querySelector('#tbEmail').value = ""
                document.querySelector('#tbAddress').value = ""
                document.querySelector('#tbCity').value = ""
                document.querySelector('#tbState').value = ""
                document.querySelector('#tbZip').value = ""
                document.querySelector('#cbHasSite').checked = false
                document.querySelector('#tbURL').value = ""
                document.querySelector('#tbType').value = ""
                document.querySelector('#taDetails').value = ""
                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    setToggleForm(false)
                    dispatch(setConfirmationState(false))
                    if (superAdminID.includes(admin.id)) {
                        getAllProspects(dispatch)
                    } else {
                        getProspects(dispatch, admin.id)
                    }
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
                dispatch(setLoadingState(false))
                dispatch(setFailureState(true))
                setTimeout(() => {
                    dispatch(setFailureState(false))
                }, 2000);
            })

    }
    const editProspect = () => {
        dispatch(setLoadingState(true))
        console.log(prospect.id)
        const p = {
            id: prosID,
            BusinessName: document.querySelector('#tbEditBusinessName').value,
            ContactFullName: document.querySelector('#tbEditFullName').value,
            ContactPhone: document.querySelector('#tbEditPhone').value,
            Email: document.querySelector('#tbEditEmail').value,
            BusinessAddress: document.querySelector('#tbEditAddress').value,
            City: document.querySelector('#tbEditCity').value,
            State: document.querySelector('#tbEditState').value,
            Zip: document.querySelector('#tbEditZip').value,
            HasWebsite: document.querySelector('#cbEditHasSite').checked,
            WebsiteURL: document.querySelector('#tbEditURL').value,
            SampleURL: document.querySelector('#tbEditSampleURL').value,
            BusinessType: document.querySelector('#tbEditType').value,
            Details: document.querySelector('#taEditDetails').value
        }

        editProspectDoc(p)
            .then(() => {
                dispatch(setLoadingState(false))
                document.querySelector('#tbEditBusinessName').value = ""
                document.querySelector('#tbEditFullName').value = ""
                document.querySelector('#tbEditPhone').value = ""
                document.querySelector('#tbEditEmail').value = ""
                document.querySelector('#tbEditAddress').value = ""
                document.querySelector('#tbEditCity').value = ""
                document.querySelector('#tbEditState').value = ""
                document.querySelector('#tbEditZip').value = ""
                document.querySelector('#cbEditHasSite').checked = false
                document.querySelector('#tbEditURL').value = ""
                document.querySelector('#tbEditSampleURL').value = ""
                document.querySelector('#tbEditType').value = ""
                document.querySelector('#taEditDetails').value = ""
                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    setToggleEditForm(false)
                    dispatch(setConfirmationState(false))
                    if (superAdminID.includes(admin.id)) {
                        getAllProspects(dispatch)
                    } else {
                        getProspects(dispatch, admin.id)
                    }
                }, 2000);
            })
            .catch(() => {
                dispatch(setLoadingState(false))
                dispatch(setFailureState(true))
                setTimeout(() => {
                    dispatch(setFailureState(false))
                }, 2000);
            })

    }
    const removeProspect = () => {
        dispatch(setLoadingState(true))
        removeProspectDoc(prospect)
            .then(() => {
                dispatch(setLoadingState(false))
                dispatch(setConfirmationState(true))
                if (superAdminID.includes(admin.id)) {
                    getAllProspects(dispatch)
                } else {
                    getProspects(dispatch, admin.id)
                }
                setTimeout(() => {
                    setToggleEditForm(false)
                    dispatch(setConfirmationState(false))

                }, 2000);

            })
            .catch(() => {
                dispatch(setLoadingState(false))
                dispatch(setFailureState(true))
                setTimeout(() => {
                    dispatch(setFailureState(false))
                }, 2000);
            })
    }

    useEffect(() => {
        console.log(admin)
        if (admin.id == null) {
            navigate("/admin")
            return
        }
        window.scrollTo(0, 0)
        if (superAdminID.includes(admin.id)) {
            getAllProspects(dispatch)
        } else {
            getProspects(dispatch, admin.id)
        }

    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/admindash"><BsChevronLeft /></Link>
                <h2 className='project-title'>Partner Table</h2>
            </div>

            <div className='prospects'>
                <div className='flex'>
                    <h1>Potential Partners</h1>
                    <button onClick={() => {
                        setToggleForm(!toggleForm)
                        setToggleEditForm(false)
                        document.querySelector('#tbBusinessName').value = ""
                        document.querySelector('#tbFullName').value = ""
                        document.querySelector('#tbPhone').value = ""
                        document.querySelector('#tbEmail').value = ""
                        document.querySelector('#tbAddress').value = ""
                        document.querySelector('#tbCity').value = ""
                        document.querySelector('#tbState').value = ""
                        document.querySelector('#tbZip').value = ""
                        document.querySelector('#cbHasSite').checked = false
                        document.querySelector('#tbURL').value = ""
                        document.querySelector('#tbType').value = ""
                        document.querySelector('#taDetails').value = ""
                    }} className='prospects-btn'>
                        {toggleForm ?
                            <IoChevronUpCircleSharp className='prospects-btn-icon' /> :
                            <AiFillPlusCircle className='prospects-btn-icon' />}
                    </button>
                </div>
                <br />
                {
                    toggleForm ?
                        <div className='prospect-form'>
                            <p className='prospect-form-info'>Please make sure to include as much information as possible.</p>
                            <div className='prospect-grid'>
                                <div className='prospect-form-block'>
                                    <label>Business Name:</label>
                                    <input id="tbBusinessName" type="text" placeholder='Happy Code Programming' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Full Name:</label>
                                    <input id="tbFullName" type="text" placeholder='John Doe' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Phone:</label>
                                    <input id="tbPhone" type="text" placeholder='123 456 7890' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Email:</label>
                                    <input id="tbEmail" type="email" placeholder='jdoe@happycode.com' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Business Address:</label>
                                    <input id="tbAddress" type="text" placeholder='1234 Everything Bagel St.' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>City:</label>
                                    <input id="tbCity" type="text" placeholder='Bagel City' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>State:</label>
                                    <input id="tbState" type="text" placeholder='CA' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Zip Code:</label>
                                    <input id="tbZip" type="text" placeholder='12345' />
                                </div>
                                <div className='prospect-form-block'>
                                    <div className='together'>
                                        <label>Has Website?:</label>
                                        <input type="checkbox" id="cbHasSite" />
                                    </div>
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Website URL:</label>
                                    <input id="tbURL" type="text" placeholder='https://wearehappycode.com' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Business Type:</label>
                                    <input id="tbType" type="text" placeholder='Barber Shop, Plumbing, Tattoo Shop, etc.' />
                                </div>

                            </div>
                            <div className='prospect-form-block'>
                                <label>Details:</label>
                                <textarea id="taDetails" className='prospect-ta' placeholder='Leave any details concerning this business that admin should know about.'></textarea>
                            </div>
                            <div className='prospect-btn'><button onClick={addToList} className='ticketform-form-btn'>Add to list</button></div>
                        </div> : <div></div>
                }
                {
                    toggleEditForm ?
                        <div className='prospect-form'>
                            <div className='flex'>
                                <p className='prospect-form-info'>Please make sure to include as much information as possible.</p>
                                <IoChevronDownCircleSharp onClick={() => { setToggleEditForm(false) }} className='prospects-btn-icon' color="gray" />
                            </div>
                            <div className='prospect-grid'>
                                <div className='prospect-form-block'>
                                    <label>Business Name:</label>
                                    <input id="tbEditBusinessName" type="text" placeholder='Happy Code Programming' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Full Name:</label>
                                    <input id="tbEditFullName" type="text" placeholder='John Doe' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Phone:</label>
                                    <input id="tbEditPhone" type="text" placeholder='123 456 7890' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Contact Email:</label>
                                    <input id="tbEditEmail" type="email" placeholder='jdoe@happycode.com' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Business Address:</label>
                                    <input id="tbEditAddress" type="text" placeholder='1234 Everything Bagel St.' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>City:</label>
                                    <input id="tbEditCity" type="text" placeholder='Bagel City' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>State:</label>
                                    <input id="tbEditState" type="text" placeholder='CA' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Zip Code:</label>
                                    <input id="tbEditZip" type="text" placeholder='12345' />
                                </div>
                                <div className='prospect-form-block'>
                                    <div className='together'>
                                        <label>Has Website?:</label>
                                        <input type="checkbox" id="cbEditHasSite" />
                                    </div>
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Website URL:</label>
                                    <input id="tbEditURL" type="text" placeholder='https://wearehappycode.com' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Sample URL:</label>
                                    <input id="tbEditSampleURL" type="text" placeholder='https://wearehappycode.web.app' />
                                </div>
                                <div className='prospect-form-block'>
                                    <label>Business Type:</label>
                                    <input id="tbEditType" type="text" placeholder='Barber Shop, Plumbing, Tattoo Shop, etc.' />
                                </div>

                            </div>
                            <div className='prospect-form-block'>
                                <label>Details:</label>
                                <textarea id="taEditDetails" className='prospect-ta' placeholder='Leave any details concerning this business that admin should know about.'></textarea>
                            </div>
                            <div className='prospect-btn'><button className='ticketform-form-btn' onClick={() => {
                                editProspect()
                            }}>Update Info</button></div>
                        </div> : <div></div>
                }
                <br />
                <div className='prospects-list'>
                    {
                        prospects.map((pros, i) => {
                            return (
                                <div onClick={() => {
                                    prospect.id != pros.id ? setProspect(pros) : setProspect({})
                                }} key={i} className={`prospect-block ${prospect.id == pros.id ? "border1" : "border2"}`}>
                                    <div className='flex'>
                                        <h2>{pros.BusinessName}</h2>
                                        {pros.HasWebsite ? <BiWorld className='web-icon' color='53a8ed' /> : <p></p>}
                                    </div>
                                    <div className='flex'>
                                        <h3 className='prospect-type'>{pros.BusinessType}</h3>
                                        <h3 className='prospect-city'>{pros.City}</h3>
                                    </div>
                                    {
                                        prospect.id == pros.id ?
                                            <div>
                                                <p><b>Name:</b> {pros.ContactFullName}</p>
                                                <p><b>Phone:</b>  {pros.ContactPhone}</p>
                                                <p><b>Email:</b>  {pros.Email}</p>
                                                <p><b>Address:</b> <br /> {pros.BusinessAddress}</p>
                                                <p><b>State:</b>  {pros.State}</p>
                                                <p><b>Zip:</b>  {pros.Zip}</p>
                                                <p><b>Website URL:</b> <br /> <a target="_blank" href={pros.WebsiteURL}>{pros.WebsiteURL}</a></p>
                                                <p><b>Sample URL:</b> <br /> <a target="_blank" href={pros.SampleURL}>{pros.SampleURL}</a></p>
                                                <p><b>Details:</b><br />  {pros.Details}</p>
                                                <div className='prospect-btns'>
                                                    <button className="prospect-button purple" onClick={() => {
                                                        openEdit(pros)
                                                        console.log(pros)
                                                    }}><MdBuildCircle /></button>
                                                    <button onClick={removeProspect} className="prospect-button green"><AiFillCheckCircle /></button>
                                                </div>
                                            </div> : <div></div>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
