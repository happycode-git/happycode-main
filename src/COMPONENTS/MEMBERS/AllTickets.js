import React, { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { IoChevronDownCircleOutline, IoChevronUpCircleOutline } from 'react-icons/io5'
import { RxDotFilled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllTickets } from '../../firebase'
// 
import '../STYLESHEETS/AllTickets.css'

export default function AllTickets() {
    const user = useSelector((state) => state.user.value)
    const tickets = useSelector((state) => state.alltickets.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [chosenTicketID, setChosenTicketID] = useState("")

    useEffect(() => {
        console.log(user)
        if (user.id == null) {
            navigate("/webline")
            return
        }
        window.scrollTo(0, 0)
        getAllTickets(user.id, dispatch)
    }, [])


    return (
        <div className='main'>
            <div className='together'>
                <Link className='back' to="/project"><BsChevronLeft /></Link>
                <h1 className='project-title'>All Tickets</h1>
            </div>

            <div className='tickets'>
                {
                    tickets.map((tik, i) => {
                        return (
                            <div className={`${"ticket"}${i == 0 ? "1" : ""}`} key={i}>
                                <div className='flex'>
                                    <div>
                                        <h2 className='ticket-sub'>{tik.Subject}</h2>
                                        <p className='ticket-status'>Status: <span className="yellow">{tik.Status}</span></p>
                                    </div>
                                    <div className='together'>
                                        <p className='ticket-status'><b>{tik.Page}</b></p>
                                        <RxDotFilled className='ticket-dot yellow' />
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
                                        </div>
                                        : <p></p>
                                }
                            </div>
                        )
                    })
                }
               
            </div>
        </div>
    )
}
