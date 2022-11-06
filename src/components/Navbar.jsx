import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const Navbar = () => {

    const context = useContext(NoteContext)
    const { handleLogout } = context
    const location=useLocation();

    useEffect(() => {

    }, [location])
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNote</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${location.pathname==='/'?"active":""}`}>
                        <Link disabled={location.pathname==='/login'} className="nav-link" to="/">Home </Link>
                    </li>
                    <li className={`nav-item ${location.pathname==='/about'?"active":""}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('auth-token') ? <div>
                    <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                    <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
                </div> : <button onClick={handleLogout} className='btn btn-primary mx-2' to="/login">Log Out</button>}
            </div>
        </nav>
    )
}

export default Navbar