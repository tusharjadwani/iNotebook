import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from './NoteContext';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDZiNjc4MzMyN2JiZTNhODdmOWI5NyIsImlhdCI6MTY2NTU3ODYxNn0.Wb5a1F7rCPVgUgxSLQpafR0i0fu1Jk_4xjir78iSKUk



const NoteState = (props) => {

    const [update, setUpdate] = useState(1);
    const ref = useRef()
    const refClose = useRef()
    const navigate = useNavigate()

    //AddNote
    const [note, setNote] = useState({})

    const handleNoteChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddNote = async (e) => {
        e.preventDefault();
        e.target.reset();
        setUpdate(update + 1);

        const token = localStorage.getItem('auth-token');
        const res = await fetch('http://localhost:5000/api/notes/addnote', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(note)
        })
        const json = await res.json();
        // const success

    }

    //Login
    const [login, setLogin] = useState({})
    const handleLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
        })
        const json = await res.json();
        const success = await json.success;
        if (success) {
            localStorage.setItem('auth-token', json.token)
            navigate('/')
        }
        else {
            console.log(json.error);
        }
    }

    //FetchNotes
    const [notes, setNotes] = useState([])

    const fetchnotes = async () => {

        const token = localStorage.getItem('auth-token');
        const res = await fetch('http://localhost:5000/api/notes/fetchnotes', {
            method: 'get',
            headers: {
                'auth-token': token
            }
        })
        const json = await res.json();
        const success = await json.success
        if (success) {
            setNotes(json.notes);
        }


    }

    //UpdateNote
    const updateNote = (note) => {
        setNote(note);
        ref.current.click();
    }
    const handleEdit = async (note) => {
        refClose.current.click();
        const token = localStorage.getItem('auth-token');
        const res = await fetch(`http://localhost:5000/api/notes/updatenote/${note._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(note)
        })
        const json = await res.json();
        const success = json.success;
        if (success) {
            setUpdate(update + 1);
        }
    }

    //DeleteNote
    const handleDelete = async (id) => {
        const token = localStorage.getItem('auth-token');

        const res = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'delete',
            headers: {
                'auth-token': token
            }
        })
        const json = await res.json();
        const success = json.success;
        if (success) {
            setUpdate(update + 1);
        }

    }

    //SignUp
    const [signup, setSignup] = useState({})
    const handleSignupChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signup)
        })
        const json = await res.json();
        const success = await json.success;
        if (success) {
            localStorage.setItem('auth-token', json.token)
            navigate('/')
        }
        else {
            console.log(json.error);
        }
        
    }

    //Logout
    const handleLogout=()=>{
    
        localStorage.removeItem('auth-token');
        navigate('/login');
        window.location.reload();

    }

    return (
        <NoteContext.Provider value={{ update, note, ref, refClose, notes,handleLogout, updateNote, handleSignupChange, handleNoteChange, handleLoginChange, handleAddNote, handleLogin, handleEdit, handleDelete, fetchnotes, handleSignup }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState