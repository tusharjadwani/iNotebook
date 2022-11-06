import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Signup = () => {

    const context = useContext(NoteContext)
    const { handleSignup,handleSignupChange } = context

    return (
        <div className='container my-3'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleSignupChange} type="text" className="form-control" id="name" name='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleSignupChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleSignupChange} type="password" className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup