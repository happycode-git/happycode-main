import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// 
import '../STYLESHEETS/Webline.css'
import '../STYLESHEETS/AdminLogin.css'
import Navigation from '../UTILITIES/Navigation';
import Footer from '../UTILITIES/Footer';
import { firebaseAdminSignIn } from '../../firebase';
import { setLoadingState } from '../../REDUX/REDUCERS/LoadingSlice';

export default function AdminLogin() {
    const admin = useSelector((state) => state.admin.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const siteAlertState = useSelector((state) => state.siteAlert.value)
    const toggleSiteAlertState = useSelector((state) => state.toggleSiteAlert.value)

    function signIn() {
        dispatch(setLoadingState(true))
        const email = document.querySelector('#tbEmail').value;
        const password = document.querySelector('#tbPass').value;
        firebaseAdminSignIn(dispatch, navigate, email, password)
    }
    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='main'>
            <Navigation />
            <div className='admin'>
                <div className='webline-panel1'>
                    <div className='webline-login'>
                        <h1>Admin Login</h1>
                        <div className='webline-login-inputs'>
                            <input id="tbEmail" type="email" placeholder='Email' className='webline-login-input' />
                            <input id="tbPass" type="password" placeholder='Password' className='webline-login-input' />
                            <button className='webline-login-btn' onClick={signIn}>Let's Go!</button>
                            {
                                toggleSiteAlertState ?
                                    <p className='webline-site-err'>{siteAlertState}</p> : <p></p>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
