import React, {useEffect} from 'react';
import '../trash/button_main.css'
import {Link, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
function Main() {
    const navigate = useNavigate()
    const { token } = useAuth()
    useEffect(() => {
        if (token) {
            navigate('/user')
        }
    }, [token])
    return (
        <div className={'main'}>

            <div  className={'main_but'}>
                <button className={'log'} onClick={() => {
                    navigate('/login', { replace: true });}}>
                    Login
                </button>

            </div>
            <div className={'main_but'}>
                <Link to="/registrations">
                    <button className={'log'}>
                        Registration
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default Main
