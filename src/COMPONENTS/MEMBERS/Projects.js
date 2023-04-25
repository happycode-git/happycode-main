import React, { useEffect } from 'react'
// 
import '../STYLESHEETS/Projects.css'
// 
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'
import { setProjectState } from '../../REDUX/REDUCERS/ProjectSlice'
// 
import { getProjects } from '../../firebase'
// 
import { BsArrowRightCircle, BsFillGearFill } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
// 
import { firebaseSignOut } from '../../firebase'

export default function Projects() {
  const user = useSelector((state) => state.user.value)
  const projects = useSelector((state) => state.projects.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(user)
    if (user.id == null) {
      navigate("/webline")
      return
    }
    window.scrollTo(0, 0)
    getProjects(user.id, dispatch)
    dispatch(setLoadingState(false))

  }, [])

  return (
    <div className='main'>
      <div className='flex'>
        <h1 className='projects-main-title'>Projects</h1>
        <div className='action-menu'>
          <BsFillGearFill className='action-icon yellow' />
          <FaSignOutAlt onClick={() => { firebaseSignOut(navigate) }} className='action-icon red' />
        </div>
      </div>
      <p className='rotate caption'>Websites Galore</p>
      <div className='projects'>
        {
          projects.map((proj, i) => {
            return (
              <div className={`projects-row ${i == 0 ? "first" : ""}`} key={i}>
                <div>
                  <h1 className='projects-title'>{proj.Name}</h1>
                  <p className='projects-status'>Status: <span className={`${proj.Status == "Active" ? "green" : proj.Status == "Suspended" ? "orange" : proj.Status == "In Progress" ? "blue" : "red"}`}>{proj.Status}</span></p>
                </div>
                {
                  proj.HasMessage ?
                    <div className='has-message'>
                      <p>You have a message</p>
                      <AiFillMessage className='has-message-icon' />
                    </div> : <div></div>
                }
                <Link to='/project' onClick={() => { dispatch(setProjectState(proj)) }}><BsArrowRightCircle className='projects-icon' /></Link>
              </div>
            )
          })
        }
      </div>
      <p className='projects-copy'>&copy; Happy Code 2022. All Rights Reserved.</p>
    </div>
  )
}
