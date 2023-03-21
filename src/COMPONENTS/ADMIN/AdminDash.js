import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
// 
import '../STYLESHEETS/AdminDash.css'
// 
import { FaSignOutAlt } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai'
// 
import { firebaseAdminSignOut, getPartners } from '../../firebase'
import { setPartnerState } from '../../REDUX/REDUCERS/PartnerSlice'
import { MdChecklist } from 'react-icons/md';

export default function AdminDash() {
  const admin = useSelector((state) => state.admin.value)
  const partners = useSelector((state) => state.partners.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(admin)
    if (admin.id == null) {
      navigate("/admin")
      return
    }
    window.scrollTo(0, 0)
    getPartners(dispatch)
  }, [])

  return (
    <div className='main'>
      <div className='admindash'>
        <div className='flex admin-top'>
          <h1 className='admin-title'>Admin</h1>
          <div className='action-menu'>
            <Link to="/prospectlist"><MdChecklist className='action-icon yellow' /></Link>
            <FaSignOutAlt onClick={() => { firebaseAdminSignOut(navigate) }} className='action-icon red' />
          </div>
        </div>
        <p className='admin-caption rotate'>Time to work!</p>

        <div className='admin-partners'>
          <div className='flex'>
            <h1 className='admin-partners-title'>Partners</h1>
            <div className='together'>
              <Link to="/newpartner" className='admin-plus'>New Partner</Link>
            </div>
          </div>
          <div>
            <input type="text" className='tb-search' id="tbSearch" placeholder='Search for a partner' />
          </div>
          {
            partners.map((partner, i) => {
              return (
                <div className={`${"partner-block"}${i == 0 ? "1" : ""}`} key={i}>
                  <div className='flex'>
                    <div className='together'>
                      <h2 className="partner-name ticket-count bg-purple white" style={{ marginRight: "0.5em" }}>{partner.TicketCount}</h2>
                      <p className='partner-name'>{partner.BusinessName} - {partner.FirstName} {partner.LastName}</p>
                    </div>
                    <BsArrowRightCircle onClick={() => {
                      dispatch(setPartnerState(partner)); navigate('/partnerdetail');
                    }} className='partner-icon' />
                  </div>
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
