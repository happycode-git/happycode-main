import React, { useEffect } from 'react'
// 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
// 
import '../STYLESHEETS/PartnerDetail.css'
import '../STYLESHEETS/Projects.css'
// 
import { BsChevronLeft, BsArrowRightCircle } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai'
import { getPartnerProjects } from '../../firebase';
import { setProjectState } from '../../REDUX/REDUCERS/ProjectSlice';

export default function PartnerDetail() {
    const admin = useSelector((state) => state.admin.value)
    const partner = useSelector((state) => state.partner.value)
    const projects = useSelector((state) => state.projects.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(admin)
        if (admin.id == null) {
            navigate("/admin")
            return
        }
        window.scrollTo(0, 0)
        getPartnerProjects(partner.id, dispatch)
    }, [])

    return (
        <div className='main'>
            <div className='flex'>
                <div className='together'>
                    <Link className='back' to="/admindash"><BsChevronLeft /></Link>
                    <h2 className='project-title'>{partner.BusinessName}</h2>
                </div>
                <button className='add-project-btn' onClick={() => {navigate('/newproject')}}><AiFillPlusCircle className='add-project-icon' /></button>
            </div>
            <div className='partner-info'>
                <div className='project'>
                    <h1>Partner Info</h1>
                    <p className='project-info-caption'>Review each project and complete incoming tickets.</p>
                    <div className='project-details'>
                        <div className='project-details-block'>
                            <h3>Contact:</h3>
                            <p>{partner.FirstName} {partner.LastName}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Business:</h3>
                            <p>{partner.BusinessName}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Email:</h3>
                            <p>{partner.Email}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Email:</h3>
                            <p>{partner.Email}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Phone:</h3>
                            <p>{partner.Phone}</p>
                        </div>
                        <div className='project-details-block'>
                            <h3>Address:</h3>
                            <p>{partner.Address}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='partner-projects projects'>
                {
                    projects.map((proj, i) => {
                        return (
                            <div className={`projects-row ${i == 0 ? "first" : ""}`} key={i}>
                                <div>
                                    <h1 className='projects-title'>{proj.Name}</h1>
                                    <p className='projects-status'>Status: <span className={`${proj.Status == "Active" ? "green" : proj.Status == "Suspended" ? "orange" : proj.Status == "In Progress" ? "blue" : "red"}`}>{proj.Status}</span></p>
                                </div>
                                <Link to='/partnerproject' onClick={() => { dispatch(setProjectState(proj)) }}><BsArrowRightCircle className='projects-icon' /></Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
