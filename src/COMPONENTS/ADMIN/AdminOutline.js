import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// 
import '../STYLESHEETS/Shopper.css'
// 
import { BsArrowRightCircle, BsChevronLeft, BsThreeDotsVertical } from 'react-icons/bs'
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice'
import { getOutline, updateOutline } from '../../firebase'
import { setConfirmationState } from '../../REDUX/REDUCERS/ConfirmationSlice'
import { setFailureState } from '../../REDUX/REDUCERS/FailureSlice'
import { setOutlineState } from '../../REDUX/REDUCERS/OutlineSlice'


export default function AdminOutline() {
    const admin = useSelector((state) => state.admin.value)
    const partner = useSelector((state) => state.partner.value)
    const project = useSelector((state) => state.project.value)
    const pages = useSelector((state) => state.outline.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [chosenPageID, setChosenPageID] = useState("")

    const updateOutlineHere = () => {
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
        updateOutline(partner.id, project.id, newArr)
            .then(() => {
                dispatch(setOutlineState(newArr))
                dispatch(setLoadingState(false))
                dispatch(setConfirmationState(true))
                setTimeout(() => {
                    dispatch(setConfirmationState(false))
                    navigate('/partnerproject')
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
        getOutline(partner.id, project.id, dispatch)
        window.scrollTo(0, 0)

    }, [])

    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/partnerproject"><BsChevronLeft /></Link>
                <h2 className='project-title'>Project Outline</h2>
            </div>

            <div className='shopper'>
                <h1 className='shopper-head'>In construction...</h1>
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
                                        <textarea id={`taInfo${i}`} className='shopper-ta' placeholder='Enter all information describing the structure and content of this page. Everything here will determine the construction of the page.'>
                                            {page.Info.replaceAll("jjj", "\n")}
                                        </textarea>
                                        {/* <textarea id={`taRequests${i}`} className='shopper-ta' placeholder='Enter any extra requests for ideas aside from the details given above.'></textarea> */}
                                        {
                                            page.id == chosenPageID ?
                                                <a href={project.DropboxURL} target="_blank" className='shopper-dropbox'>Dropbox</a> : <p></p>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <br />
                <button onClick={updateOutlineHere} className='shopper-update'>Update</button>
                <br />
                <br />
            </div>
            <div className='home-panel3'>
                <h1>Every thing Bagel</h1>
            </div>
        </div>
    )
}
