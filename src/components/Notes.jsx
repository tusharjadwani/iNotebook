import React, { useContext ,useEffect} from 'react';
import NotesItem from './NotesItem';
import NoteContext from '../context/notes/NoteContext';
import Update from './Update';
import { useNavigate } from 'react-router-dom';


const Notes = () => {

    const context = useContext(NoteContext)
    const navigate = useNavigate();
    const { notes } = context
    const { update, fetchnotes } = context;

    useEffect(() => {

        if (localStorage.getItem('auth-token')) {
            fetchnotes();
        }
        else{
            navigate('/login');
        }


    }, [update])

    useEffect(() => {

        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }

    }, [])

    return (
        <>
            <Update />
            <div className="my-3">
                <h1>Your Notes</h1>

                <div className="container row">
                    {notes.length===0 && <div className='container my-3'>No notes to display</div>}
                    {notes.map(element => {
                        return <div key={element._id} className="col-md-4"><NotesItem element={element} /></div>
                    })}
                </div>

            </div>
        </>

    )
}

export default Notes