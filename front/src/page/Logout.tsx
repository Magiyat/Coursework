import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import '../trash/logout.css'

const Logout: React.FC = () => {
    const { clearToken } = useContext(AuthContext);

    const handleLogout = () => {
        clearToken();
        window.location.href = "/login";
    };

    return (
        <div className={'logout'}>
            <button className={'logout_button'} onClick={handleLogout}>Выйти</button>
        </div>

    )
};

export default Logout;