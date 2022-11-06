import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Login = () => {

    const context = useContext(NoteContext)
    const { handleLogin ,handleLoginChange} = context

    return (
        <div className='container my-3'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleLoginChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleLoginChange} type="password" className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login