import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from '../components/PrivateRoute';
import Main from '../page/Main';
import Login from '../page/Login';
import User from '../page/User';
import Logout from '../page/Logout';
import Reg from "../page/Registrations";
import Friends from "../page/Friends";
import Chat from "../page/Chat";
import Game from "../page/Game";

export const useRoutes = () => {

    return (
        <Routes>
            <Route index element={<Main/>}/>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registrations" element={<Reg/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path='/chat' element={<Chat/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path='/user' element={<User/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/game" element={<Game/>}/>
            </Route>
        </Routes>
    )
}

export default useRoutes
