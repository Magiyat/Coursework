import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <div className={'nav'}>
            <div className={'namexz'}>eclipse</div>
            <nav>
                {isAuthenticated ? <Link to="/user">User </Link> : <Link to="/">Home </Link>}
                {isAuthenticated && <Link to="/chat">Chat</Link>}
                {isAuthenticated && <Link to="/game">Game</Link>}
                {isAuthenticated && <Link to="/friends">Friends</Link>}
                {!isAuthenticated && <Link to="/registrations">Registrations</Link>}
                {isAuthenticated ? <Link to="/logout">Logout </Link> : <Link to="/login">Login </Link>}
            </nav>
        </div>
    )
}

export default Navbar
